import { InjectRepository } from '@nestjs/typeorm';
import { CpuEntity } from './cpu.entity';
import { Repository } from 'typeorm';
import { IFindOneCpu } from './interfaces/find-one-cpu.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CpuRepository {
  constructor(
    @InjectRepository(CpuEntity)
    private readonly cpuRepository: Repository<CpuEntity>,
  ) {}

  public async findOne(cpuOptions: IFindOneCpu): Promise<CpuEntity> {
    const query = await this.cpuRepository.createQueryBuilder('cpu');

    query.where('cpu.price <= :price', { price: cpuOptions.price });

    query.andWhere('cpu.model = :model', { model: cpuOptions.model });

    return query.getOne();
  }
}
