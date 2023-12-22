import { Controller, Get, Query } from '@nestjs/common';
import { ConfiguratorService } from './configurator.service';
import { CalculateRecommendedConfigurationSchema } from './schemas/calculate-recommended-configuration.schema';
import { CalculateRecommendedConfigurationResponceSchema } from './schemas/calculate-recommended-configuration-responce.schema';

@Controller('configurator')
export class ConfiguratorController {
  constructor(private readonly configuratorService: ConfiguratorService) {}

  @Get()
  public async calculateRecommendedConfiguration(
    @Query() input: CalculateRecommendedConfigurationSchema,
  ): Promise<CalculateRecommendedConfigurationResponceSchema> {
    return this.configuratorService.calculateRecommendedConfiguration(input);
  }
}
