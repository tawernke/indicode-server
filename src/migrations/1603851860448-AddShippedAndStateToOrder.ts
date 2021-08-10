import {MigrationInterface, QueryRunner} from "typeorm";

export class AddShippedAndStateToOrder1603851860448 implements MigrationInterface {
  name = 'AddShippedAndStateToOrder1603851860448'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" ADD "stateOrProvince" character varying`);
    await queryRunner.query(`ALTER TABLE "order" ADD "shipped" boolean NOT NULL DEFAULT false`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "shipped"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "stateOrProvince"`);
  }

}
