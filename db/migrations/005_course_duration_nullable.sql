-- Duration unknown until confirmed; hide in UI when NULL.
ALTER TABLE courses
  DROP CONSTRAINT IF EXISTS courses_duration_hours_check;

ALTER TABLE courses
  ALTER COLUMN duration_hours DROP NOT NULL;

ALTER TABLE courses
  ADD CONSTRAINT courses_duration_hours_check
  CHECK (duration_hours IS NULL OR duration_hours > 0);
