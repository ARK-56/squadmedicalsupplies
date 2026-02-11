
-- Create inquiries table for product order requests
CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  medicare_id TEXT NOT NULL,
  dob_month INTEGER NOT NULL,
  dob_day INTEGER NOT NULL,
  dob_year INTEGER NOT NULL,
  zip_code TEXT NOT NULL,
  message TEXT,
  product_id TEXT,
  product_name TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form)
CREATE POLICY "Anyone can submit an inquiry"
  ON public.inquiries FOR INSERT
  WITH CHECK (true);

-- Only admins can read inquiries
CREATE POLICY "Admins can view inquiries"
  ON public.inquiries FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can update inquiries
CREATE POLICY "Admins can update inquiries"
  ON public.inquiries FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete inquiries
CREATE POLICY "Admins can delete inquiries"
  ON public.inquiries FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
