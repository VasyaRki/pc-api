import { Module } from '@nestjs/common';
import { GpuService } from './gpu.service';
import { GpuController } from './gpu.controller';

@Module({
  providers: [GpuService],
  controllers: [GpuController],
})
export class GpuModule {}
