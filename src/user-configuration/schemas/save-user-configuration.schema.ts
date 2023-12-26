import { IsNotEmpty } from 'class-validator';

export class SaveUserConfigurationSchema {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly configurationId: number;

  @IsNotEmpty()
  readonly rom: string;

  @IsNotEmpty()
  readonly ram: string;

  @IsNotEmpty()
  readonly power: string;
}
