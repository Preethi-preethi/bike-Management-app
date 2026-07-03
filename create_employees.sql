DROP TABLE IF EXISTS employees CASCADE;

CREATE TABLE employees (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    joining_date DATE DEFAULT CURRENT_DATE,
    status BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE managers ADD COLUMN IF NOT EXISTS joining_date DATE DEFAULT CURRENT_DATE;

ALTER TABLE service_bookings ADD COLUMN IF NOT EXISTS assigned_mechanic_id UUID REFERENCES employees(id) ON DELETE SET NULL;
