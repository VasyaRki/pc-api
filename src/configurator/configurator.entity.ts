import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CpuEntity } from '../cpu/cpu.entity';
import { GpuEntity } from '../gpu/gpu.entity';
import { MotherboardEntity } from '../motherboard/motherboard.entity';
import { UserConfigurationEntity } from 'src/user-configuration/user-configuration.entity';

@Entity('Configurator')
// @Index(['cpuId', 'gpuId'], { unique: true })
export class ConfiguratorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  cpuId: number;

  @Column({ type: 'int' })
  gpuId: number;

  @Column({ type: 'varchar' })
  chipset: string;

  // @Column({ type: 'int' })
  // motherboardId: number;

  @Column({ type: 'int' })
  index: number;

  @ManyToOne(() => CpuEntity, (cpu) => cpu.id)
  cpu: CpuEntity;

  @ManyToOne(() => GpuEntity, (gpu) => gpu.id)
  gpu: GpuEntity;

  // @ManyToOne(() => MotherboardEntity, (motherboard) => motherboard.id)
  // motherboard: MotherboardEntity;

  // @OneToMany(
  //   () => UserConfigurationEntity,
  //   (userConfiguration) => userConfiguration.configurations,
  // )
  // userConfigurations: UserConfigurationEntity[];
}
