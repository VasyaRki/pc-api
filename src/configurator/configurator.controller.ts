import { Controller, Get, Param, Query } from '@nestjs/common';
import { ConfiguratorEntity } from './configurator.entity';
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

  @Get(':id')
  public async getConfiguration(
    @Param('id') id: number,
  ): Promise<ConfiguratorEntity> {
    return this.configuratorService.findOneById(id, ['cpu', 'gpu']);
  }
}
