import { UserEntity } from 'src/user/user.entity';

export interface IAuthResponce {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly user: UserEntity;
}
