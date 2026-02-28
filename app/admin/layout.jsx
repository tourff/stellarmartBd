export const metadata = {
  title: 'Admin Panel - StellarMartBD',
  description: 'E-commerce Admin Panel',
};

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      {children}
    </div>
  );
}
