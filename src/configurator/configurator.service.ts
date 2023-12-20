import { Injectable } from '@nestjs/common';
import { ConfiguratorEntity } from './configurator.entity';
import { ConfiguratorRepository } from './configurator.repository';
import { CalculateRecommendedConfigurationSchema } from './schemas/calculate-recommended-configuration.schema';

const MIN = 5;
const MAX = 1943;

const randes = [
  { min: 5, max: 485 },
  { min: 485, max: 970 },
  { min: 970, max: 1455 },
  { min: 1455, max: 1943 },
];

@Injectable()
export class ConfiguratorService {
  constructor(
    private readonly configuratorRepository: ConfiguratorRepository,
  ) {}

  public async calculateRecommendedConfiguration(
    data: CalculateRecommendedConfigurationSchema,
  ): Promise<ConfiguratorEntity> {
    const budget = data.budget;

    const configurations = await this.configuratorRepository.findConfigurations(
      { budget: budget, performance: randes[data.performance - 1] },
    );

    const budgetConfigurations = await configurations.filter(
      (configuration) =>
        configuration.cpu.price + configuration.gpu.price <= budget,
    );

    const topConfiguration = budgetConfigurations.reduce(
      (maxIndexConfiguration, configuration) =>
        configuration.index > maxIndexConfiguration.index
          ? configuration
          : maxIndexConfiguration,
      budgetConfigurations[0],
    );

    return topConfiguration;
  }

  public async findOneById(id: number): Promise<ConfiguratorEntity> {
    return this.configuratorRepository.findOneById(id);
  }

  private async calculatePercentage(num: number, percentage: number) {
    return (num * percentage) / 100;
  }
}
