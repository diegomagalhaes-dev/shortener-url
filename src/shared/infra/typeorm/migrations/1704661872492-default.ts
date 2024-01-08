import { MigrationInterface, QueryRunner } from 'typeorm'

export class Default1704661872492 implements MigrationInterface {
  name = 'Default1704661872492'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "url" ("id" character varying NOT NULL, "original_url" character varying NOT NULL, "shortened_url" character varying NOT NULL, "access_count" integer NOT NULL DEFAULT '0', "user_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7421088122ee64b55556dfc3a91" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "url" ADD CONSTRAINT "FK_5a6f06cf39e1d19c00f7524c4e8" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "url" DROP CONSTRAINT "FK_5a6f06cf39e1d19c00f7524c4e8"`,
    )
    await queryRunner.query(`DROP TABLE "url"`)
  }
}
