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

  public async create(
    data: ISaveUserConfiguration,
  ): Promise<UserConfigurationEntity> {
    return this.userConfigurationRepository.save(data);
  }

  public async delete(
    userId: number,
    configurationId: number,
  ): Promise<boolean> {
    await this.userConfigurationRepository.delete({
      userId,
      configurationId,
    });

    return true;
  }

  public async getConfigurationsByUserId(
    userId: number,
  ): Promise<UserConfigurationEntity[]> {
    return this.userConfigurationRepository.find({
      where: { userId },
      relations: ['configuration'],
    });
  }

  public async findOneById(id: number): Promise<UserConfigurationEntity> {
    const query = await this.userConfigurationRepository.createQueryBuilder(
      'userConfiguration',
    );

    query.leftJoinAndSelect('userConfiguration.configuration', 'configuration');
    query.leftJoinAndSelect('configuration.cpu', 'cpu');
    query.leftJoinAndSelect('configuration.gpu', 'gpu');

    query.where('userConfiguration.id = :id', { id });

    return query.getOne();
  }
}
