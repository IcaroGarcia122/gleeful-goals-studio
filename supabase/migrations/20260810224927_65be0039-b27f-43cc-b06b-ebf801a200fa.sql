-- Double check current permissions for public schema functions
revoke all on function public.has_role(uuid, app_role) from public;
revoke all on function public.has_role(uuid, app_role) from anon;
grant execute on function public.has_role(uuid, app_role) to authenticated;
grant execute on function public.has_role(uuid, app_role) to service_role;
