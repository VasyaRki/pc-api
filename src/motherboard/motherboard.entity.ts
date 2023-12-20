import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CpuEntity } from 'src/cpu/cpu.entity';
import { RamEnum } from './enums/ram.enum';

@Entity('Motherboard')
export class MotherboardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  chipset: string;

  @Column({ type: 'varchar' })
  socket: string;

  @Column({ type: 'enum', enum: RamEnum })
  ram: RamEnum;

  @Column({ type: 'int8' })
  pcie: number;

  @Column({ type: 'boolean' })
  overclocking: boolean;

  @Column({ type: 'float' })
  price: number;

  // @ManyToMany(() => CpuEntity, (cpu) => cpu.id)
  // cpus: CpuEntity[];
}
