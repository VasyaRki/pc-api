import { CpuEntity } from 'src/cpu/cpu.entity';
import { GpuEntity } from 'src/gpu/gpu.entity';
import { MotherboardEntity } from 'src/motherboard/motherboard.entity';

export class PcConfigSchema {
  cpu: CpuEntity;
  gpu: GpuEntity;
  motherboard: MotherboardEntity;
}
