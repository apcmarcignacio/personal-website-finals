-- Run this SQL in your Supabase SQL Editor AFTER the initial create-guestbook-table.sql

-- Allow anyone to delete guestbook entries
CREATE POLICY "Allow public delete" ON guestbook
  FOR DELETE USING (true);
