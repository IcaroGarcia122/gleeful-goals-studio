-- Fix SECURITY DEFINER function visibility
revoke execute on function public.has_role(uuid, app_role) from public;
grant execute on function public.has_role(uuid, app_role) to authenticated;
grant execute on function public.has_role(uuid, app_role) to service_role;

-- Fix table with RLS but no policy (user_roles already had one in my thought but maybe I missed it in the query block)
-- Ensure user_roles has a policy for admins
create policy "Admins can view all roles" on public.user_roles for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Users can view their own roles" on public.user_roles for select to authenticated using (auth.uid() = user_id);
