-- Add joining_date to employees if it doesn't exist
ALTER TABLE employees ADD COLUMN IF NOT EXISTS joining_date DATE DEFAULT CURRENT_DATE;

-- Add joining_date to managers if it doesn't exist
ALTER TABLE managers ADD COLUMN IF NOT EXISTS joining_date DATE DEFAULT CURRENT_DATE;

-- Force Supabase's API (PostgREST) to reload its schema cache
NOTIFY pgrst, 'reload schema';
