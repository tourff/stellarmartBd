import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Redirect to dashboard - middleware will check auth
  redirect('/admin/dashboard');
}
