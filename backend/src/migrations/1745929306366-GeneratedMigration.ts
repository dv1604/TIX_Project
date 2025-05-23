import { MigrationInterface, QueryRunner } from "typeorm";

export class GeneratedMigration1745929306366 implements MigrationInterface {
    name = 'GeneratedMigration1745929306366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" RENAME COLUMN "transactionId" TO "transaction_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "booking" RENAME COLUMN "transaction_id" TO "transactionId"`);
    }

}
