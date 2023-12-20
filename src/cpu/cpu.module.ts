import { Module } from '@nestjs/common';
import { CpuService } from './cpu.service';
import { CpuController } from './cpu.controller';
import { CpuRepository } from './cpu.repository';
import { CpuEntity } from './cpu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CpuEntity])],
  exports: [CpuService],
  providers: [CpuService, CpuRepository],
  controllers: [CpuController],
})
export class CpuModule {}
