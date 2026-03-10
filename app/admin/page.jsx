import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const cookieStore = cookies();
  const adminToken = cookieStore.get('adminToken')?.value;
  
  // If no admin token, redirect to login page
  if (!adminToken) {
    redirect('/admin/login');
  }
  
  // If has token, redirect to dashboard
  redirect('/admin/dashboard');
}
