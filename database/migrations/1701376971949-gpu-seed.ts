import { gpu } from 'src/configurator/helper';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class GpuSeed1701376971949 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const item of gpu) {
      await queryRunner.query(
        `INSERT INTO "Gpu" ("company", "perfomance", "dlss", "rtx", "gaming", "pcieVersion", "pcieBus", "tdp", "price", "model")
           VALUES ('${item.firm}', '${item.perfomance}', '${item.dlss}', 
           '${item.rtx}', '${item.gaming}', 
           '${1}', '${1}', '${item.tdp}', '${item.price}', '${item.model}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
