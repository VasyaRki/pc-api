import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserEntity } from '../user/user.entity';
import { CpuEntity } from 'src/cpu/cpu.entity';
import { GpuEntity } from 'src/gpu/gpu.entity';
import { MotherboardEntity } from 'src/motherboard/motherboard.entity';
import { ConfiguratorEntity } from 'src/configurator/configurator.entity';
import { UserConfigurationEntity } from 'src/user-configuration/user-configuration.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('DATABASE_HOST'),
        port: configService.getOrThrow('DATABASE_PORT'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        entities: [
          UserEntity,
          CpuEntity,
          GpuEntity,
          MotherboardEntity,
          ConfiguratorEntity,
          UserConfigurationEntity,
        ],
        synchronize: true,
      }),
    }),
  ],
})
export class DbModule {}
