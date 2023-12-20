import { PCTypeEnum } from 'src/configurator/enums/pc-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GPUCompanyEnum } from './enums/gpu-company.enum';

@Entity('Gpu')
export class GpuEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: GPUCompanyEnum })
  company: GPUCompanyEnum;

  @Column({ type: 'varchar' })
  model: string;

  @Column({ type: 'int' })
  perfomance: number;

  @Column({ type: 'int8', nullable: true })
  dlss?: number;

  @Column({ type: 'int' })
  rtx: number;

  @Column({ type: 'boolean' })
  gaming: boolean;

  @Column({ type: 'int' })
  pcieVersion: number;

  @Column({ type: 'int' })
  pcieBus: number;

  @Column({ type: 'int' })
  tdp: number;

  @Column({ type: 'float' })
  price: number;
}
