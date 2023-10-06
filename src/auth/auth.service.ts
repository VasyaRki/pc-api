import { ConfigService } from '@nestjs/config';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';

import { AuthError } from './errors/auth.error';
import { UserService } from '../user/user.service';
import { JWT_CONSTANTS } from '../jwt/jwt.constants';
import { GoogleAuthDto } from './dto/google-auth.dto';
import { ProviderEnum } from '../user/enums/provider.enum';
import { JwtService } from '../jwt/interfaces/jwt-service.interface';
import { UserEntity } from 'src/user/user.entity';
import { IAuthResponce } from './interfaces/auth-responce.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(JWT_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
  ) {}

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.userService.getOne({ email: username });

    if (!user) {
      throw AuthError.DoesNotExists();
    }

    const passwordsMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordsMatch) {
      throw AuthError.PasswordsNotMatching();
    }

    return user;
  }

  public async login(userLoginInput): Promise<IAuthResponce> {
    const { email, password } = userLoginInput;
    const user = await this.validateUser(email, password);

    const jwtPair = this.jwtService.generatePair({ id: user.id });

    this.userService.save({
      id: user.id,
      refreshToken: jwtPair.refreshToken,
    });

    return {
      ...jwtPair,
      user,
    };
  }

  public async signup(userRegisterInput): Promise<UserEntity> {
    const candidate = await this.userService.getOne({
      email: userRegisterInput.email,
    });

    if (candidate) {
      throw AuthError.AlreadyExists();
    }

    const hashedPassword = await bcrypt.hash(userRegisterInput.password, 10);

    const user = await this.userService.create({
      ...userRegisterInput,
      password: hashedPassword,
    });

    return user;
  }

  public async googleAuth(
    googleAuthInput: GoogleAuthDto,
  ): Promise<IAuthResponce> {
    const email = googleAuthInput?.email;
    const token = googleAuthInput?.accessToken;

    const isValidToken = await this.verifyGoogleToken(token);
    if (!isValidToken) {
      throw new UnauthorizedException();
    }

    let user = await this.userService.getOne({ email });

    if (!user) {
      const name = googleAuthInput?.firstName;

      user = await this.userService.create({
        email,
        name,
        provider: ProviderEnum.GOOGLE,
      });
    }

    const jwtPair = this.jwtService.generatePair({ id: user.id });

    this.userService.save({
      id: user.id,
      refreshToken: jwtPair.refreshToken,
    });

    return {
      user,
      ...jwtPair,
    };
  }

  private async verifyGoogleToken(token: string): Promise<boolean> {
    try {
      const googleResponse = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
        {
          method: 'GET',
        },
      );

      const googleResponseJSON = await googleResponse.json();

      const { aud } = googleResponseJSON;

      if (
        googleResponse &&
        aud === this.configService.get<string>('GOOGLE_CLIENT_ID')
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
