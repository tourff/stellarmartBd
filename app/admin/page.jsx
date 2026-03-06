import { redirect } from 'next/navigation';

export default function AdminPage() {
  // This page now acts as a redirect handled by middleware
  // Middleware will check auth and redirect to /admin-login if needed
  // For now, redirect to login page directly
  redirect('/admin-login');
}
