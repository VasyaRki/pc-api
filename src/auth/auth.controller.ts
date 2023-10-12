import { Body, Controller, Get, Post, Headers } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserEntity } from '../user/user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { IAuthResponce } from './interfaces/auth-responce.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google')
  public async googleAuthCallback(
    @Headers('authorization') authorization,
  ): Promise<IAuthResponce> {
    return this.authService.googleAuth(authorization);
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
