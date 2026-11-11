ALTER TABLE "public"."projects"
  ADD COLUMN "file_path" text[] DEFAULT '{}'::text[];

CREATE POLICY "Authenticated users can update projects" ON "public"."projects"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() IS NOT NULL))
  WITH CHECK ((auth.uid() IS NOT NULL));

CREATE POLICY "public can read projects" ON "public"."projects"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

INSERT INTO "storage"."buckets" ("id", "name", "public")
VALUES ('screenshots', 'screenshots', true)
ON CONFLICT ("id") DO UPDATE SET "public" = true;

CREATE POLICY "Authenticated can delete screenshots" ON "storage"."objects"
  FOR DELETE
  TO "authenticated"
  USING ((bucket_id = 'screenshots'::text));

CREATE POLICY "Authenticated can update screenshots" ON "storage"."objects"
  FOR UPDATE
  TO "authenticated"
  USING ((bucket_id = 'screenshots'::text))
  WITH CHECK ((bucket_id = 'screenshots'::text));

CREATE POLICY "Authenticated can upload screenshots" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((bucket_id = 'screenshots'::text));

CREATE POLICY "Authenticated can read screenshot objects" ON "storage"."objects"
  FOR SELECT
  TO "authenticated"
  USING ((bucket_id = 'screenshots'::text));