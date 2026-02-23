-- Run this SQL in your Supabase SQL Editor to create the guestbook table

CREATE TABLE IF NOT EXISTS guestbook (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read guestbook entries
CREATE POLICY "Allow public read" ON guestbook
  FOR SELECT USING (true);

-- Allow anyone to insert guestbook entries
CREATE POLICY "Allow public insert" ON guestbook
  FOR INSERT WITH CHECK (true);
