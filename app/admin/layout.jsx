import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

export const metadata = {
  title: 'Admin Panel - StellarMartBD',
  description: 'E-commerce Admin Panel',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <AdminNavbar />
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
