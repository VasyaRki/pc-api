import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPipe } from '../pipes/jwt.pipe';

export const GetAuhtorizationHeaders = createParamDecorator(
  (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();

    const authorizationHeaders = req.headers.authorization;

    return authorizationHeaders;
  },
);

export const IJwtPayloadDecorator = () => GetAuhtorizationHeaders(JwtPipe);
