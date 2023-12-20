import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserConfigurationEntity } from './user-configuration.entity';
import { IJwtPayload } from '../jwt/interfaces/jwt-payload.interface';
import { UserConfigurationService } from './user-configuration.service';
import { IJwtPayloadDecorator } from '../jwt/decorators/jwt-payload.decorator';
import { SaveUserConfigurationSchema } from './schemas/save-user-configuration.schema';
import { DeleteUserConfigurationSchema } from './schemas/delete-user-configuration.schema';

@Controller('user-configuration')
export class UserConfigurationController {
  constructor(
    private readonly userConfigurationService: UserConfigurationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @IJwtPayloadDecorator() payload: IJwtPayload,
    @Body() body: SaveUserConfigurationSchema,
  ) {
    await this.userConfigurationService.create({ userId: payload.id, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async delete(
    @Body() body: DeleteUserConfigurationSchema,
    @IJwtPayloadDecorator() payload: IJwtPayload,
  ): Promise<void> {
    await this.userConfigurationService.delete(
      payload.id,
      body.configurationId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getConfigurations(
    @IJwtPayloadDecorator() payload: IJwtPayload,
  ): Promise<UserConfigurationEntity[]> {
    return this.userConfigurationService.getConfigurationsByUserId(payload.id);
  }
}
