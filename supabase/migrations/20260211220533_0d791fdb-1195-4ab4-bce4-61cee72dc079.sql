
-- Add prescription URL column to inquiries
ALTER TABLE public.inquiries ADD COLUMN prescription_url TEXT;

-- Create storage bucket for prescriptions
INSERT INTO storage.buckets (id, name, public) VALUES ('prescriptions', 'prescriptions', false);

-- Anyone can upload a prescription (public form)
CREATE POLICY "Anyone can upload prescriptions"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'prescriptions');

-- Admins can view prescriptions
CREATE POLICY "Admins can view prescriptions"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'prescriptions' AND public.has_role(auth.uid(), 'admin'::app_role));

-- Admins can delete prescriptions
CREATE POLICY "Admins can delete prescriptions"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'prescriptions' AND public.has_role(auth.uid(), 'admin'::app_role));
