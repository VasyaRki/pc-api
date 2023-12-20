import { MigrationInterface, QueryRunner } from 'typeorm';
import { cpu } from '../../src/configurator/helper';
import { CpuCompanyEnum } from 'src/cpu/enums/cpu-company.enum';

export class CpuSeed1701376032325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const item of cpu) {
      await queryRunner.query(
        `INSERT INTO "Cpu" ("сompany", "branding", "model", "series", "cores", "graphics", "socket", "tdp", "pcie", "price")
         VALUES ('${CpuCompanyEnum.AMD}', '${item.branding}', '${item.model}', '${item.series}','${item.cores}',
         '${item.graphics}','${item.socket}','${item.tdp}','${item.pcie}','${item.price}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
