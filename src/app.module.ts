import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DbModule } from './db/db.module';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { ConfiguratorController } from './configurator/configurator.controller';
import { ConfiguratorService } from './configurator/configurator.service';
import { ConfiguratorModule } from './configurator/configurator.module';
import { CpuModule } from './cpu/cpu.module';
import { GpuService } from './gpu/gpu.service';
import { GpuController } from './gpu/gpu.controller';
import { GpuModule } from './gpu/gpu.module';
import { MotherboardModule } from './motherboard/motherboard.module';
import { UserConfigurationModule } from './user-configuration/user-configurations.module';
import { UserConfigurationController } from './user-configuration/user-configuration.controller';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    JwtModule,
    AuthModule,
    UserModule,
    ConfiguratorModule,
    CpuModule,
    GpuModule,
    MotherboardModule,
    UserConfigurationModule,
  ],
})
export class AppModule {}
