SET @hero_image_column_exists = (
  SELECT COUNT(*)
  FROM information_schema.columns
  WHERE table_schema = DATABASE()
    AND table_name = 'school_settings'
    AND column_name = 'hero_image_url'
);

SET @hero_image_sql = IF(
  @hero_image_column_exists = 0,
  'ALTER TABLE school_settings ADD COLUMN hero_image_url VARCHAR(255) NULL AFTER logo_url',
  'SELECT 1'
);

PREPARE hero_image_statement FROM @hero_image_sql;
EXECUTE hero_image_statement;
DEALLOCATE PREPARE hero_image_statement;