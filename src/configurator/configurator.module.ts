import { Module } from '@nestjs/common';
import { ConfiguratorService } from './configurator.service';
import { ConfiguratorRepository } from './configurator.repository';
import { ConfiguratorController } from './configurator.controller';
import { GpuModule } from 'src/gpu/gpu.module';
import { CpuModule } from 'src/cpu/cpu.module';
import { MotherboardModule } from 'src/motherboard/motherboard.module';
import { ConfiguratorEntity } from './configurator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfiguratorEntity]),
    GpuModule,
    CpuModule,
    MotherboardModule,
  ],
  providers: [ConfiguratorService, ConfiguratorRepository],
  controllers: [ConfiguratorController],
  exports: [ConfiguratorService],
})
export class ConfiguratorModule {}
