-- Optional course price (تومان). NULL = hide price in UI (current behavior).
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS price BIGINT NULL
  CHECK (price IS NULL OR price >= 0);
