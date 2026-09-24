-- Phase H — additional indexes for read paths used by the data layer.
-- Note: courses.slug, programs.slug, intersection_topics.slug are already
-- UNIQUE (001), and featured articles are covered by the partial unique
-- index articles_one_featured (001), so they are not repeated here.

-- Admin registrations list (ORDER BY created_at DESC).
CREATE INDEX IF NOT EXISTS idx_registration_leads_created_at
  ON registration_leads (created_at DESC);

-- Articles list (WHERE published ORDER BY published_at DESC).
CREATE INDEX IF NOT EXISTS idx_articles_published_at
  ON articles (published, published_at DESC);

-- Events list (WHERE published ORDER BY start_date ASC).
CREATE INDEX IF NOT EXISTS idx_events_start
  ON events (published, start_date);

-- Programs / courses lists (WHERE published ORDER BY title ASC).
CREATE INDEX IF NOT EXISTS idx_programs_title
  ON programs (published, title);

CREATE INDEX IF NOT EXISTS idx_courses_title
  ON courses (published, title);