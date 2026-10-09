CREATE TABLE "links_reordered" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	"user_id" text NOT NULL,
	"short_code" text NOT NULL UNIQUE,
	"url" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

INSERT INTO "links_reordered" ("id", "user_id", "short_code", "url", "created_at", "updated_at")
OVERRIDING SYSTEM VALUE
SELECT "id", "user_id", "short_code", "url", "created_at", "updated_at"
FROM "links";

ALTER TABLE "links" RENAME TO "links_before_column_reorder";
ALTER TABLE "links_reordered" RENAME TO "links";
DROP TABLE "links_before_column_reorder";

ALTER TABLE "links" RENAME CONSTRAINT "links_reordered_pkey" TO "links_pkey";
ALTER TABLE "links" RENAME CONSTRAINT "links_reordered_short_code_key" TO "links_short_code_key";
ALTER SEQUENCE "links_reordered_id_seq" RENAME TO "links_id_seq";

SELECT setval(
	pg_get_serial_sequence('public.links', 'id'),
	COALESCE((SELECT MAX("id") FROM "links"), 0) + 1,
	false
);
