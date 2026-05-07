import { sql } from '@payloadcms/db-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"title_meta" varchar,
  	"description" varchar,
  	"keywords" varchar,
  	"url" varchar,
  	"image" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "releases" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "releases" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "releases" ADD COLUMN "is_visible" boolean DEFAULT true NOT NULL;
  ALTER TABLE "live_orchestral_chamber" ADD COLUMN "seo_title" varchar;
  ALTER TABLE "live_orchestral_chamber" ADD COLUMN "seo_description" varchar;
  ALTER TABLE "live_orchestral_chamber" ADD COLUMN "is_visible" boolean DEFAULT true NOT NULL;
  ALTER TABLE "press" ADD COLUMN "is_visible" boolean DEFAULT true NOT NULL;
  CREATE INDEX "site_seo_updated_at_idx" ON "site_seo" USING btree ("updated_at");
  CREATE INDEX "site_seo_created_at_idx" ON "site_seo" USING btree ("created_at");
  CREATE INDEX "releases_is_visible_idx" ON "releases" USING btree ("is_visible");
  CREATE INDEX "live_orchestral_chamber_is_visible_idx" ON "live_orchestral_chamber" USING btree ("is_visible");
  CREATE INDEX "press_is_visible_idx" ON "press" USING btree ("is_visible");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "site_seo_updated_at_idx";
  DROP INDEX "site_seo_created_at_idx";
  DROP INDEX "releases_is_visible_idx";
  DROP INDEX "live_orchestral_chamber_is_visible_idx";
  DROP INDEX "press_is_visible_idx";
  ALTER TABLE "releases" DROP COLUMN "seo_title";
  ALTER TABLE "releases" DROP COLUMN "seo_description";
  ALTER TABLE "releases" DROP COLUMN "is_visible";
  ALTER TABLE "live_orchestral_chamber" DROP COLUMN "seo_title";
  ALTER TABLE "live_orchestral_chamber" DROP COLUMN "seo_description";
  ALTER TABLE "live_orchestral_chamber" DROP COLUMN "is_visible";
  ALTER TABLE "press" DROP COLUMN "is_visible";
  DROP TABLE "site_seo" CASCADE;`)
}
