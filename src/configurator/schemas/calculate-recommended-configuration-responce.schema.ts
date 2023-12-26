import { ConfiguratorEntity } from '../configurator.entity';

export class CalculateRecommendedConfigurationResponceSchema {
  configuration: ConfiguratorEntity;
  ram: number;
  rom: number;
  power: number;
}
