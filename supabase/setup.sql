-- 1. Create the table
CREATE TABLE IF NOT EXISTS public.checklist_items (
  item_id    INTEGER PRIMARY KEY,
  checked    BOOLEAN      NOT NULL DEFAULT FALSE,
  updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- 2. Seed all 47 item IDs (safe to run multiple times)
INSERT INTO public.checklist_items (item_id)
SELECT generate_series(1, 47)
ON CONFLICT (item_id) DO NOTHING;

-- 3. Row Level Security — allow anyone to read & update (no login needed)
ALTER TABLE public.checklist_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read"   ON public.checklist_items;
DROP POLICY IF EXISTS "public_update" ON public.checklist_items;
CREATE POLICY "public_read"   ON public.checklist_items FOR SELECT USING (true);
CREATE POLICY "public_update" ON public.checklist_items FOR UPDATE USING (true) WITH CHECK (true);

-- 4. Enable Realtime for this table (skip if already added)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
    WHERE pubname = 'supabase_realtime'
      AND tablename = 'checklist_items'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.checklist_items;
  END IF;
END $$;
