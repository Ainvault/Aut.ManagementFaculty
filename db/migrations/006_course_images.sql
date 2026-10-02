-- Add poster and brochure image URLs to courses table.
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS poster_image_url TEXT NULL,
  ADD COLUMN IF NOT EXISTS brochure_image_url TEXT NULL;
