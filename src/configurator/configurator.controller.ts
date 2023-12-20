import { Controller, Get, Query } from '@nestjs/common';
import { ConfiguratorEntity } from './configurator.entity';
import { ConfiguratorService } from './configurator.service';
import { CalculateRecommendedConfigurationSchema } from './schemas/calculate-recommended-configuration.schema';

@Controller('configurator')
export class ConfiguratorController {
  constructor(private readonly configuratorService: ConfiguratorService) {}

  @Get()
  public async calculateRecommendedConfiguration(
    @Query() input: CalculateRecommendedConfigurationSchema,
  ): Promise<ConfiguratorEntity> {
    return this.configuratorService.calculateRecommendedConfiguration(input);
  }
}
