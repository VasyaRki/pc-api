import { Injectable } from '@nestjs/common';
import { UserConfigurationRepository } from './user-configuration.repository';
import { ISaveUserConfiguration } from './interfaces/save-user-configurations.interface';
import { UserConfigurationEntity } from './user-configuration.entity';
import { ConfiguratorService } from 'src/configurator/configurator.service';

@Injectable()
export class UserConfigurationService {
  constructor(
    private readonly userConfigurationRepository: UserConfigurationRepository,
    private readonly configuratorService: ConfiguratorService,
  ) {}

  public async delete(userId: number, configurationId: number): Promise<void> {
    await this.userConfigurationRepository.delete(userId, configurationId);
  }

  public async create(data: ISaveUserConfiguration): Promise<void> {
    // const configuration = await this.configuratorService.findOneById(
    //   data.configurationId,
    // );
    // console.log(configuration);

    await this.userConfigurationRepository.create({
      ...data,
      // configuration,
    });
  }

  public async getConfigurationsByUserId(
    userId: number,
  ): Promise<UserConfigurationEntity[]> {
    const res =
      await this.userConfigurationRepository.getConfigurationsByUserId(userId);

    console.log(res);

    return res;
  }
}
