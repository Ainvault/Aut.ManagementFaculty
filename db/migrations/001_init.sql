-- Phase A — Initial schema
-- Corresponds to docs/04-development-plan.md §3 (A.1–A.7) + site content tables.
-- All statements are idempotent (IF NOT EXISTS) so reruns are safe;
-- db/migrate.mjs additionally tracks applied versions in schema_migrations.

CREATE TABLE IF NOT EXISTS courses (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  category TEXT NOT NULL
    CHECK (category IN ('leadership','technology','innovation','energy','design','digital')),
  duration_hours INT NOT NULL CHECK (duration_hours > 0),
  format TEXT NOT NULL
    CHECK (format IN ('online','blended','in-person')),
  registration_url TEXT NOT NULL,
  image_url TEXT NOT NULL,
  seo_description TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  published BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS programs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  blurb TEXT NOT NULL,
  group_key TEXT NOT NULL
    CHECK (group_key IN ('standard','executive')),
  href TEXT NOT NULL,
  tagline TEXT NULL,
  audience TEXT NOT NULL,
  duration_label TEXT NOT NULL,
  format_label TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]',
  body TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NULL,
  location TEXT NOT NULL,
  href TEXT NOT NULL,
  summary TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  href TEXT NOT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  body TEXT NOT NULL,
  published_at DATE NOT NULL,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Domain rule: at most one *published* featured article (docs/02-domain-rules.md §Business + plan §A.4).
CREATE UNIQUE INDEX IF NOT EXISTS articles_one_featured
  ON articles ((featured))
  WHERE featured = true AND published = true;

-- Site content (plan §A.5) — matches src/lib/types/* entities.
CREATE TABLE IF NOT EXISTS intersection_topics (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  href TEXT NOT NULL,
  image_url TEXT NOT NULL,
  body TEXT NOT NULL,
  highlights JSONB NOT NULL DEFAULT '[]',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS faculty_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  focus TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS alumni_stories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  name TEXT NOT NULL,
  program TEXT NOT NULL,
  image_url TEXT NOT NULL,
  href TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS campaign_banners (
  id TEXT PRIMARY KEY,
  version TEXT NOT NULL,
  text TEXT NOT NULL,
  href TEXT NOT NULL,
  cta TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS legal_pages (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body JSONB NOT NULL DEFAULT '[]',
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS site_stats (
  id TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY,
  quote TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  course_title TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Registration leads (plan §A.6, used in phase G).
CREATE TABLE IF NOT EXISTS registration_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id TEXT NULL REFERENCES courses(id) ON DELETE SET NULL,
  course_slug TEXT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NULL,
  message TEXT NULL,
  source TEXT NOT NULL DEFAULT 'register_page',
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new','contacted','enrolled','rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin (plan §A.7, used in phase E).
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash TEXT UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Keep updated_at meaningful on every write (used by admin CRUD in later phases).
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'courses','programs','events','articles',
    'intersection_topics','faculty_members','alumni_stories',
    'campaign_banners','legal_pages','site_stats','testimonials'
  ]
  LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%I_set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION set_updated_at()',
      t, t
    );
  END LOOP;
END;
$$;