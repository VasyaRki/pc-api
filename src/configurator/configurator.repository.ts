import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfiguratorEntity } from './configurator.entity';
import { IFindConversartions } from './interfaces/find-configurations.interface';

@Injectable()
export class ConfiguratorRepository {
  constructor(
    @InjectRepository(ConfiguratorEntity)
    private readonly developerRepository: Repository<ConfiguratorEntity>,
  ) {}

  public async findConfigurations(
    data: IFindConversartions,
  ): Promise<ConfiguratorEntity[]> {
    const query = await this.developerRepository.createQueryBuilder(
      'configurator',
    );

    query.leftJoinAndSelect('configurator.cpu', 'cpu');
    query.leftJoinAndSelect('configurator.gpu', 'gpu');

    query.where('configurator.index >= :min', { min: data.performance.min });
    query.andWhere('configurator.index <= :max', { max: data.performance.max });

    return query.getMany();
  }

  public async findOneById(id: number): Promise<ConfiguratorEntity> {
    return this.developerRepository.findOneBy({ id });
  }
}
