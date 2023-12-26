import { MigrationInterface, QueryRunner } from 'typeorm';
import { cpu, gpu, motherboards } from '../../src/configurator/helper';

export class Configurations1701618636809 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const configurations = [];
    for (let i = 0; i < cpu.length; i++) {
      for (let j = 0; j < gpu.length; j++) {
        const currentCpu = cpu[i];
        const currentGpu = gpu[j];

        if (
          currentGpu.pcie > currentCpu.pcie ||
          !currentCpu.solutions.includes(currentGpu.model)
        ) {
          continue;
        }

        let chipset, chipsetIndex;

        for (const motherboard of motherboards) {
          if (
            motherboard.socket === currentCpu.socket &&
            motherboard.solutions.branding.includes(currentCpu.branding) &&
            motherboard.solutions.series.includes(currentCpu.series) &&
            motherboard.pcie.includes(currentGpu.pcie)
          ) {
            chipset = motherboard.chipset;
            chipsetIndex = motherboard.price;

            break;
          }
        }

        const configurationTdp = currentCpu.tdp + currentGpu.tdp;

        const powerUnit = Math.ceil((configurationTdp * 2.25) / 100) * 100;

        const cpuIndex =
          currentCpu.cores * (currentCpu.series / 1000) * currentCpu.price;

        const gpuIndex =
          currentGpu.perfomance *
          (currentGpu.dlss + currentGpu.rtx) *
          currentGpu.price;

        const configurationTdpIndex = configurationTdp / 1000;

        const currentIndex =
          cpuIndex + gpuIndex + configurationTdpIndex + chipsetIndex;

        configurations.push({
          cpu: {
            branding: currentCpu.branding,
            model: currentCpu.model,
            series: currentCpu.series,
          },
          gpu: { model: currentGpu.model },
          chipset: chipset,
          powerUnit: powerUnit,
          index: currentIndex,
        });
      }
    }

    const cpus: any[] = await queryRunner.query(`SELECT * FROM "Cpu";`);
    const gpus: any[] = await queryRunner.query(`SELECT * FROM "Gpu";`);

    for (const configuration of configurations) {
      const cpu = cpus.find((cpu) => {
        return (
          cpu.branding == configuration.cpu.branding &&
          cpu.model == configuration.cpu.model &&
          cpu.series == configuration.cpu.series
        );
      });
      const gpu = gpus.find((gpu) => {
        return gpu.model == configuration.gpu.model;
      });

      if (!configuration.chipset || !configuration.index || !cpu || !gpu) {
        continue;
      }

      await queryRunner.query(
        `INSERT INTO "Configurator" ("cpuId", "gpuId", "chipset", "index") 
         VALUES (${cpu.id}, ${gpu.id}, '${configuration.chipset}', ${configuration.index}) 
         ON CONFLICT DO NOTHING;`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
