-- Add tags column to courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS tags TEXT[] NOT NULL DEFAULT '{}';
