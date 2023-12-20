import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { UserConfigurationEntity } from './user-configuration.entity';
import { ISaveUserConfiguration } from './interfaces/save-user-configurations.interface';

@Injectable()
export class UserConfigurationRepository {
  constructor(
    @InjectRepository(UserConfigurationEntity)
    private readonly userConfigurationRepository: Repository<UserConfigurationEntity>,
  ) {}

  public async create(data: ISaveUserConfiguration): Promise<void> {
    await this.userConfigurationRepository.save(data);
  }

  public async delete(userId: number, configurationId: number): Promise<void> {
    await this.userConfigurationRepository.delete({
      userId,
      configurationId,
    });
  }

  public async getConfigurationsByUserId(
    userId: number,
  ): Promise<UserConfigurationEntity[]> {
    return this.userConfigurationRepository.find({
      where: { userId },
      relations: ['configuration'],
    });
  }
}
