import { PCTypeEnum } from 'src/configurator/enums/pc-type.enum';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CpuCompanyEnum } from './enums/cpu-company.enum';
import { MotherboardEntity } from 'src/motherboard/motherboard.entity';

@Entity('Cpu')
export class CpuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: CpuCompanyEnum })
  сompany: CpuCompanyEnum;

  @Column({ type: 'varchar' })
  branding: string;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'int' })
  series: number;

  @Column({ type: 'int8' })
  cores: number;

  @Column({ type: 'boolean' })
  graphics: boolean;

  @Column({ type: 'varchar' })
  socket: string;

  @Column({ type: 'int' })
  tdp: number;

  @Column({ type: 'int' })
  pcie: number;

  @Column({ type: 'float' })
  price: number;

  @ManyToMany(() => MotherboardEntity, (motherboard) => motherboard.id)
  motherboard: MotherboardEntity[];
}
