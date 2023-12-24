import { Injectable } from '@nestjs/common';
import { ConfiguratorEntity } from './configurator.entity';
import { ConfiguratorRepository } from './configurator.repository';
import { CalculateRecommendedConfigurationSchema } from './schemas/calculate-recommended-configuration.schema';
import { CalculateRecommendedConfigurationResponceSchema } from './schemas/calculate-recommended-configuration-responce.schema';

const ranges = [
  { min: 5, max: 485 },
  { min: 485, max: 970 },
  { min: 970, max: 1455 },
  { min: 1455, max: 1943 },
];

const ram = {
  1: 8,
  2: 16,
  3: 32,
  4: 64,
};

@Injectable()
export class ConfiguratorService {
  constructor(
    private readonly configuratorRepository: ConfiguratorRepository,
  ) {}

  public async calculateRecommendedConfiguration(
    data: CalculateRecommendedConfigurationSchema,
  ): Promise<CalculateRecommendedConfigurationResponceSchema> {
    const budget = data.budget;

    const configurations = await this.configuratorRepository.findConfigurations(
      { budget: budget, performance: ranges[data.performance - 1] },
    );

    configurations.sort();

    const budgetConfigurations = await configurations.filter(
      (configuration) =>
        configuration.cpu.price + configuration.gpu.price <= budget,
    );

    if (budgetConfigurations.length === 0) {
      budgetConfigurations.push(configurations[0]);
    }

    const topConfiguration = budgetConfigurations.reduce(
      (maxIndexConfiguration, configuration) =>
        configuration.index > maxIndexConfiguration.index
          ? configuration
          : maxIndexConfiguration,
      budgetConfigurations[0],
    );

    return {
      configuration: topConfiguration,
      rom: data.memory,
      ram: ram[data.performance],
      power:
        Math.ceil(
          ((topConfiguration.cpu.tdp + topConfiguration.gpu.tdp) * 2.25) / 100,
        ) * 100,
    };
  }

  public async findOneById(
    id: number,
    relations?: string[],
  ): Promise<ConfiguratorEntity> {
    return this.configuratorRepository.findOneById(id, relations);
  }

  private async calculatePercentage(num: number, percentage: number) {
    return (num * percentage) / 100;
  }
}
