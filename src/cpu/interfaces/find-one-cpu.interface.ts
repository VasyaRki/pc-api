import { PCTypeEnum } from 'src/configurator/enums/pc-type.enum';
import { CpuCompanyEnum } from '../enums/cpu-company.enum';

export interface IFindOneCpu {
  readonly category: PCTypeEnum;
  readonly company: CpuCompanyEnum;
  readonly branding: string;
  readonly model: string;
  readonly series: number;
  readonly cores: number;
  readonly graphics: boolean;
  readonly socket: string;
  readonly tdp: number;
  readonly pcie: number;
  readonly price: number;
}
