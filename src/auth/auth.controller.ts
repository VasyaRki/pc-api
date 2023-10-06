import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { GoogleGuard } from './guards/google-auth.guard';
import { UserRegisterDto } from './dto/user-register.dto';
import { IAuthResponce } from './interfaces/auth-responce.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleGuard)
  @Get('google/redirect')
  public async googleAuthCallback(@Req() req): Promise<IAuthResponce> {
    const user = req?.user;
    const res = await this.authService.googleAuth(user);
    return res;
  }

  @Post('login')
  public async login(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<IAuthResponce> {
    return this.authService.login(userLoginDto);
  }

  @Post('register')
  public async register(
    @Body() userRegisterDto: UserRegisterDto,
  ): Promise<UserEntity> {
    return this.authService.signup(userRegisterDto);
  }
}
