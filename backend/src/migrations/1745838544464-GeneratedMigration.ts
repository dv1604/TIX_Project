import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1745838544464 implements MigrationInterface {
    name = 'GeneratedMigration1745838544464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days" RENAME COLUMN "dayOffset" TO "day_offset"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days" RENAME COLUMN "day_offset" TO "dayOffset"`);
    }

}
