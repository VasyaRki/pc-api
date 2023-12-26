import { IsNotEmpty } from 'class-validator';

export class DeleteUserConfigurationSchema {
  @IsNotEmpty()
  readonly configurationId: number;
}
