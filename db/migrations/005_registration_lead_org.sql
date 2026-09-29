-- Position and organization on public contact / interest leads.
ALTER TABLE registration_leads
  ADD COLUMN IF NOT EXISTS position TEXT,
  ADD COLUMN IF NOT EXISTS organization TEXT;
