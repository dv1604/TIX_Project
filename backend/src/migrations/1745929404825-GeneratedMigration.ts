import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1745929404825 implements MigrationInterface {
    name = 'GeneratedMigration1745929404825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seats" DROP CONSTRAINT "FK_a101ae8c557e59cbf103f51d9ab"`);
        await queryRunner.query(`ALTER TABLE "slot" DROP CONSTRAINT "FK_1a5ebeb8442b60d09aae9d39e2e"`);
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_7644441ef07018c7a321b3c5276"`);
        await queryRunner.query(`ALTER TABLE "seats" RENAME COLUMN "slotId" TO "slot_id"`);
        await queryRunner.query(`ALTER TABLE "slot" RENAME COLUMN "screenId" TO "screen_id"`);
        await queryRunner.query(`ALTER TABLE "screens" RENAME COLUMN "cityShowingId" TO "cityShowing_id"`);
        await queryRunner.query(`ALTER TABLE "seats" ADD CONSTRAINT "FK_ec9b2e792f4ec81d58a7bef9f65" FOREIGN KEY ("slot_id") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "slot" ADD CONSTRAINT "FK_e56c01af0fd1bd756290b03ac1f" FOREIGN KEY ("screen_id") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_41532e82a0d23661b2397c9e86e" FOREIGN KEY ("cityShowing_id") REFERENCES "city_showing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "screens" DROP CONSTRAINT "FK_41532e82a0d23661b2397c9e86e"`);
        await queryRunner.query(`ALTER TABLE "slot" DROP CONSTRAINT "FK_e56c01af0fd1bd756290b03ac1f"`);
        await queryRunner.query(`ALTER TABLE "seats" DROP CONSTRAINT "FK_ec9b2e792f4ec81d58a7bef9f65"`);
        await queryRunner.query(`ALTER TABLE "screens" RENAME COLUMN "cityShowing_id" TO "cityShowingId"`);
        await queryRunner.query(`ALTER TABLE "slot" RENAME COLUMN "screen_id" TO "screenId"`);
        await queryRunner.query(`ALTER TABLE "seats" RENAME COLUMN "slot_id" TO "slotId"`);
        await queryRunner.query(`ALTER TABLE "screens" ADD CONSTRAINT "FK_7644441ef07018c7a321b3c5276" FOREIGN KEY ("cityShowingId") REFERENCES "city_showing"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "slot" ADD CONSTRAINT "FK_1a5ebeb8442b60d09aae9d39e2e" FOREIGN KEY ("screenId") REFERENCES "screens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "seats" ADD CONSTRAINT "FK_a101ae8c557e59cbf103f51d9ab" FOREIGN KEY ("slotId") REFERENCES "slot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
