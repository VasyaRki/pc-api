import { Injectable } from '@nestjs/common';
import { CpuEntity } from './cpu.entity';
import { CpuRepository } from './cpu.repository';
import { IFindOneCpu } from './interfaces/find-one-cpu.interface';

@Injectable()
export class CpuService {
  constructor(private readonly cpuRepository: CpuRepository) {}

  public async findOne(options: IFindOneCpu): Promise<CpuEntity> {
    return this.cpuRepository.findOne(options);
  }
}
