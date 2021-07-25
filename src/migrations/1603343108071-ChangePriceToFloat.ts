import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangePriceToFloat1603343108071 implements MigrationInterface {
  name = 'ChangePriceToFloat1603343108071'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE double precision`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "price" TYPE integer`
    );
  }

}
