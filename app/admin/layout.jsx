import Sidebar from './Sidebar';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Panel - StellarMartBD',
  description: 'E-commerce Admin Panel',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
