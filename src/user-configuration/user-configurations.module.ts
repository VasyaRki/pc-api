import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from 'src/jwt/jwt.module';
import { UserConfigurationService } from './user-configuration.service';
import { UserConfigurationController } from './user-configuration.controller';
import { UserConfigurationRepository } from './user-configuration.repository';
import { UserConfigurationEntity } from './user-configuration.entity';
import { ConfiguratorModule } from 'src/configurator/configurator.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserConfigurationEntity]),
    JwtModule,
    ConfiguratorModule,
  ],
  providers: [UserConfigurationService, UserConfigurationRepository],
  controllers: [UserConfigurationController],
})
export class UserConfigurationModule {}
