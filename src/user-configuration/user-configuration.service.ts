import { Injectable } from '@nestjs/common';
import { UserConfigurationEntity } from './user-configuration.entity';
import { ConfiguratorService } from '../configurator/configurator.service';
import { UserConfigurationRepository } from './user-configuration.repository';
import { ISaveUserConfiguration } from './interfaces/save-user-configurations.interface';

@Injectable()
export class UserConfigurationService {
  constructor(
    private readonly userConfigurationRepository: UserConfigurationRepository,
    private readonly configuratorService: ConfiguratorService,
  ) {}

  public async delete(
    userId: number,
    configurationId: number,
  ): Promise<boolean> {
    return this.userConfigurationRepository.delete(userId, configurationId);
  }

  public async create(
    data: ISaveUserConfiguration,
  ): Promise<UserConfigurationEntity> {
    const alreadyCreatedConfig =
      await this.userConfigurationRepository.findOneById(
        data.userId,
        data.configurationId,
      );

    if (alreadyCreatedConfig) {
      await this.userConfigurationRepository.update(
        alreadyCreatedConfig.id,
        data.name,
      );

      return {
        ...alreadyCreatedConfig,
        name: data.name,
      };
    }

    return this.userConfigurationRepository.create({
      ...data,
    });
  }

  public async getConfigurationsByUserId(
    userId: number,
  ): Promise<UserConfigurationEntity[]> {
    return this.userConfigurationRepository.getConfigurationsByUserId(userId);
  }

  public async findOneById(
    userId: number,
    configurationId: number,
  ): Promise<UserConfigurationEntity> {
    const config = await this.userConfigurationRepository.findOneById(
      userId,
      configurationId,
    );

    return config;
  }
}
