import { ConfiguratorEntity } from '../configurator/configurator.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('UserConfiguration')
export class UserConfigurationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'int' })
  configurationId: number;

  @Column({ type: 'varchar' })
  rom: string;

  @Column({ type: 'varchar' })
  ram: string;

  @Column({ type: 'varchar' })
  power: string;

  @ManyToOne(() => ConfiguratorEntity, (configuration) => configuration.id)
  configuration: ConfiguratorEntity;
}
