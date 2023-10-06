import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ProviderEnum } from './enums/provider.enum';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  avatar?: string;

  @Column({ type: 'varchar', nullable: true })
  passwordHash: string;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  provider?: ProviderEnum;

  @CreateDateColumn({ type: 'timestamp without time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp without time zone' })
  updatedAt: string;
}
