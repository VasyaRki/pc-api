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

  @Column({ type: 'int' })
  rom: number;

  @Column({ type: 'int' })
  ram: number;

  @Column({ type: 'int' })
  power: number;

  @ManyToOne(() => ConfiguratorEntity, (configuration) => configuration.id)
  configuration: ConfiguratorEntity;
}
