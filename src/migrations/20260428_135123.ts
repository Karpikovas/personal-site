import { sql } from '@payloadcms/db-postgres'
import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_releases_type" AS ENUM('single', 'ep', 'album');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar
  );
  
  CREATE TABLE "releases_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"youtube" varchar,
  	"youtube_music" varchar,
  	"spotify" varchar,
  	"apple" varchar,
  	"vk" varchar,
  	"yandex" varchar,
  	"zvuk" varchar,
  	"amazon" varchar,
  	"video" varchar
  );
  
  CREATE TABLE "releases" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"type" "enum_releases_type" NOT NULL,
  	"href" varchar NOT NULL,
  	"group" varchar NOT NULL,
  	"card_subtitle" varchar,
  	"release_year" numeric,
  	"description" varchar,
  	"cover_id" integer,
  	"youtube" varchar,
  	"video" varchar,
  	"spotify" varchar,
  	"apple" varchar,
  	"vk" varchar,
  	"yandex" varchar,
  	"zvuk" varchar,
  	"amazon" varchar,
  	"keywords" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "live_orchestral_chamber" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"card_subtitle" varchar,
  	"cover_id" integer,
  	"youtube" varchar,
  	"video" varchar,
  	"spotify" varchar,
  	"apple" varchar,
  	"vk" varchar,
  	"yandex" varchar,
  	"zvuk" varchar,
  	"amazon" varchar,
  	"keywords" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "press" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"href" varchar NOT NULL,
  	"source" varchar,
  	"created_date" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "press_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"releases_id" integer,
  	"live_orchestral_chamber_id" integer
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"releases_id" integer,
  	"live_orchestral_chamber_id" integer,
  	"press_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "releases_items" ADD CONSTRAINT "releases_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "releases" ADD CONSTRAINT "releases_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "live_orchestral_chamber" ADD CONSTRAINT "live_orchestral_chamber_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_rels" ADD CONSTRAINT "press_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_rels" ADD CONSTRAINT "press_rels_releases_fk" FOREIGN KEY ("releases_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_rels" ADD CONSTRAINT "press_rels_live_orchestral_chamber_fk" FOREIGN KEY ("live_orchestral_chamber_id") REFERENCES "public"."live_orchestral_chamber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_releases_fk" FOREIGN KEY ("releases_id") REFERENCES "public"."releases"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_live_orchestral_chamber_fk" FOREIGN KEY ("live_orchestral_chamber_id") REFERENCES "public"."live_orchestral_chamber"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_fk" FOREIGN KEY ("press_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "releases_items_order_idx" ON "releases_items" USING btree ("_order");
  CREATE INDEX "releases_items_parent_id_idx" ON "releases_items" USING btree ("_parent_id");
  CREATE INDEX "releases__order_idx" ON "releases" USING btree ("_order");
  CREATE UNIQUE INDEX "releases_href_idx" ON "releases" USING btree ("href");
  CREATE INDEX "releases_cover_idx" ON "releases" USING btree ("cover_id");
  CREATE INDEX "releases_updated_at_idx" ON "releases" USING btree ("updated_at");
  CREATE INDEX "releases_created_at_idx" ON "releases" USING btree ("created_at");
  CREATE INDEX "live_orchestral_chamber__order_idx" ON "live_orchestral_chamber" USING btree ("_order");
  CREATE UNIQUE INDEX "live_orchestral_chamber_href_idx" ON "live_orchestral_chamber" USING btree ("href");
  CREATE INDEX "live_orchestral_chamber_cover_idx" ON "live_orchestral_chamber" USING btree ("cover_id");
  CREATE INDEX "live_orchestral_chamber_updated_at_idx" ON "live_orchestral_chamber" USING btree ("updated_at");
  CREATE INDEX "live_orchestral_chamber_created_at_idx" ON "live_orchestral_chamber" USING btree ("created_at");
  CREATE INDEX "press__order_idx" ON "press" USING btree ("_order");
  CREATE INDEX "press_updated_at_idx" ON "press" USING btree ("updated_at");
  CREATE INDEX "press_created_at_idx" ON "press" USING btree ("created_at");
  CREATE INDEX "press_rels_order_idx" ON "press_rels" USING btree ("order");
  CREATE INDEX "press_rels_parent_idx" ON "press_rels" USING btree ("parent_id");
  CREATE INDEX "press_rels_path_idx" ON "press_rels" USING btree ("path");
  CREATE INDEX "press_rels_releases_id_idx" ON "press_rels" USING btree ("releases_id");
  CREATE INDEX "press_rels_live_orchestral_chamber_id_idx" ON "press_rels" USING btree ("live_orchestral_chamber_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_releases_id_idx" ON "payload_locked_documents_rels" USING btree ("releases_id");
  CREATE INDEX "payload_locked_documents_rels_live_orchestral_chamber_id_idx" ON "payload_locked_documents_rels" USING btree ("live_orchestral_chamber_id");
  CREATE INDEX "payload_locked_documents_rels_press_id_idx" ON "payload_locked_documents_rels" USING btree ("press_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "releases_items" CASCADE;
  DROP TABLE "releases" CASCADE;
  DROP TABLE "live_orchestral_chamber" CASCADE;
  DROP TABLE "press" CASCADE;
  DROP TABLE "press_rels" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_releases_type";`)
}
