import Link from 'next/link';

export default function AdminNavbar({ title = 'Admin Dashboard' }) {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4 ml-64">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <div className="flex items-center gap-4">
          <Link href="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
            🌐 View Website
          </Link>
          <Link href="/admin/logout" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
