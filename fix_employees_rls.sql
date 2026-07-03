-- Enable RLS for employees
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies that might be conflicting
DROP POLICY IF EXISTS "Enable read access for all" ON employees;
DROP POLICY IF EXISTS "Enable insert access for all" ON employees;
DROP POLICY IF EXISTS "Enable update access for all" ON employees;
DROP POLICY IF EXISTS "Enable delete access for all" ON employees;

-- Create policies to allow access (using true allows all authenticated/anon requests to work)
CREATE POLICY "Enable read access for all" ON employees FOR SELECT USING (true);
CREATE POLICY "Enable insert access for all" ON employees FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update access for all" ON employees FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Enable delete access for all" ON employees FOR DELETE USING (true);
