CREATE TABLE IF NOT EXISTS public.testimonials (
    id SERIAL PRIMARY KEY,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone (even non-logged in users) to submit a testimonial
CREATE POLICY "Allow anonymous inserts" ON public.testimonials 
FOR INSERT TO anon, authenticated 
WITH CHECK (true);

-- Allow anyone to read the testimonials
CREATE POLICY "Allow public reads" ON public.testimonials 
FOR SELECT TO anon, authenticated 
USING (true);
