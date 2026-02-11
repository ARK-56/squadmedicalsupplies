-- Block anonymous access to profiles
CREATE POLICY "block_anon_profiles" ON public.profiles
FOR SELECT TO anon
USING (false);

-- Add INSERT policy for profiles (user can create own)
CREATE POLICY "Users can insert own profile" ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Add admin update policy for orders (so admins can update status)
CREATE POLICY "Admins can update orders" ON public.orders
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));