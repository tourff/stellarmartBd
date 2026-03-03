import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Always redirect to login page
  redirect('/admin/login');
}
