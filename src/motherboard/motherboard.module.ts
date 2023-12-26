import { Module } from '@nestjs/common';
import { MotherboardService } from './motherboard.service';
import { MotherboardController } from './motherboard.controller';

@Module({
  providers: [MotherboardService],
  controllers: [MotherboardController]
})
export class MotherboardModule {}
