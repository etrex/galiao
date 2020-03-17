import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1584422447481 implements MigrationInterface {
    name = 'migration1584422447481'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "session_id" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "subscriptions"`, undefined);
    }

}
