import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrderTable1603396561767 implements MigrationInterface {
    name = 'AddOrderTable1603396561767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "customerFirstName" character varying NOT NULL, "customerLastName" character varying NOT NULL, "customerEmail" character varying NOT NULL, "customerAddress" character varying NOT NULL, "customerAddress2" character varying NOT NULL, "customerCity" character varying NOT NULL, "customerCountry" character varying NOT NULL, "customerZip" character varying NOT NULL, "total" double precision NOT NULL, "totalQuantity" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "order"`);
    }

}
