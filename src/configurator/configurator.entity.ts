import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CpuEntity } from '../cpu/cpu.entity';
import { GpuEntity } from '../gpu/gpu.entity';

@Entity('Configurator')
export class ConfiguratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cpuId: number;

  @Column({ type: 'int' })
  gpuId: number;

  @Column({ type: 'varchar' })
  chipset: string;

  @Column({ type: 'int' })
  index: number;

  @ManyToOne(() => CpuEntity, (cpu) => cpu.id)
  cpu: CpuEntity;

  @ManyToOne(() => GpuEntity, (gpu) => gpu.id)
  gpu: GpuEntity;
}
