ALTER TABLE "links" ADD COLUMN "user_id" text;

UPDATE "links"
SET "user_id" = 'user_3KKn14muDxDVGfQcr7QLxvb6ybY'
WHERE "short_code" IN (
	'welcome',
	'docs2026',
	'product',
	'pricing',
	'support',
	'blog',
	'gettingstarted',
	'newsletter',
	'community',
	'contact'
);

ALTER TABLE "links" ALTER COLUMN "user_id" SET NOT NULL;