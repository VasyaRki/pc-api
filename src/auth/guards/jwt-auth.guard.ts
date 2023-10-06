import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JWT_CONSTANTS } from '../../jwt/jwt.constants';
import { JwtTypes } from '../../jwt/enums/jwt-types.enum';
import { JwtService } from '../../jwt/interfaces/jwt-service.interface';
import { IJwtPayload } from '../../jwt/interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(JWT_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private jwtService: JwtService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authorizationHeaders = req.headers.authorization;

      const accessToken =
        JwtAuthGuard.extractTokenFromAuthorizationHeaders(authorizationHeaders);

      const payload: IJwtPayload = this.jwtService.verify(
        accessToken,
        JwtTypes.Access,
      );

      return true;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  public static extractTokenFromAuthorizationHeaders(
    authorizationHeaders: string,
  ): string {
    if (!authorizationHeaders) {
      throw new BadRequestException('AuthorizationHeadersNotProvided');
    }

    const tokenType = authorizationHeaders.split(' ')[0];
    const token = authorizationHeaders.split(' ')[1];

    if (tokenType !== 'Bearer' || !token) {
      throw new BadRequestException('InvalidAuthHeaders');
    }

    return token;
  }
}
