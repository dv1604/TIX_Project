import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1745839844044 implements MigrationInterface {
    name = 'GeneratedMigration1745839844044'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seats" DROP CONSTRAINT "FK_618a18c5660a16458ad6ea87572"`);
        await queryRunner.query(`ALTER TABLE "seats" RENAME COLUMN "bookingId" TO "booking_id"`);
        await queryRunner.query(`ALTER TABLE "seats" ADD CONSTRAINT "FK_f71bd3917c47009c26b63c22671" FOREIGN KEY ("booking_id") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "seats" DROP CONSTRAINT "FK_f71bd3917c47009c26b63c22671"`);
        await queryRunner.query(`ALTER TABLE "seats" RENAME COLUMN "booking_id" TO "bookingId"`);
        await queryRunner.query(`ALTER TABLE "seats" ADD CONSTRAINT "FK_618a18c5660a16458ad6ea87572" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
