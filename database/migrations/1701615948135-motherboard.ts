import { MigrationInterface, QueryRunner } from 'typeorm';
import { motherboards } from '../../src/configurator/helper';

export class Motherboard1701615948135 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const item of motherboards) {
      await queryRunner.query(
        `INSERT INTO "Motherboard" ("chipset", "socket", "ram", "pcie", "overclocking", "price")
                 VALUES ('${item.chipset}', '${item.socket}', '${item.ram}', 
                 '${item.pcie}', '${item.overclocking}', 
                 '${item.price}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
