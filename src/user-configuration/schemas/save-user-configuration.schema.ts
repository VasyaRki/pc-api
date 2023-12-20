import { IsNotEmpty } from 'class-validator';

export class SaveUserConfigurationSchema {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly configurationId: number;
}
