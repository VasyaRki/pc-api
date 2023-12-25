import { IsNotEmpty } from 'class-validator';

export class SaveUserConfigurationSchema {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly configurationId: number;

  @IsNotEmpty()
  readonly rom: number;

  @IsNotEmpty()
  readonly ram: number;

  @IsNotEmpty()
  readonly power: number;
}
