'use client';

import { useState } from 'react';
import { 
  Database, 
  Table, 
  RefreshCw, 
  Download, 
  Upload,
  Trash2,
  CheckCircle,
  AlertTriangle,
  Search,
  Server,
  HardDrive,
  Clock
} from 'lucide-react';

export default function DatabasePage() {
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const tables = [
    { name: 'users', rows: 1250, size: '2.4 MB' },
    { name: 'products', rows: 580, size: '4.2 MB' },
    { name: 'categories', rows: 45, size: '156 KB' },
    { name: 'orders', rows: 3200, size: '8.1 MB' },
    { name: 'banners', rows: 25, size: '89 KB' },
    { name: 'contacts', rows: 156, size: '234 KB' },
  ];

  const handleOptimize = () => {
    alert('Database optimization started...');
  };

  const handleBackup = () => {
    alert('Creating database backup...');
  };

  const handleRestore = () => {
    alert('Restore functionality - select a backup file');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Database Management</h1>
          <p className="text-gray-500">Manage your MongoDB database</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleBackup}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Backup
          </button>
          <button 
            onClick={handleOptimize}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Optimize
          </button>
        </div>
      </div>

      {/* Database Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Database</p>
              <p className="font-semibold">MongoDB Atlas</p>
            </div>
            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Storage Used</p>
              <p className="font-semibold">15.2 MB / 512 MB</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Backup</p>
              <p className="font-semibold">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tables */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Database Tables</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tables..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Table Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Records</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tables.map((table, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Table className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{table.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{table.rows.toLocaleString()}</td>
                  <td className="px-6 py-4">{table.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
                        View
                      </button>
                      <button className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded">
                        Clear
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <RefreshCw className="w-5 h-5 text-blue-600" />
              Clear Cache
            </button>
            <button className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <Database className="w-5 h-5 text-purple-600" />
              Repair Database
            </button>
            <button className="w-full px-4 py-2 text-left border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-3">
              <Upload className="w-5 h-5 text-green-600" />
              Restore from Backup
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Database Health</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Index Usage</span>
              <span className="text-green-600 font-medium">Good</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Connection Pool</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Query Performance</span>
              <span className="text-green-600 font-medium">Optimal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Integrity</span>
              <span className="text-green-600 font-medium">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
