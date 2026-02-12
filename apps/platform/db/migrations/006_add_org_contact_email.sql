-- Migration: Add contact_email to organizations
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255);
