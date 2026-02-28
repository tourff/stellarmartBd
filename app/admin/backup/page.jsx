'use client';

import { useState } from 'react';
import { 
  Download, 
  Upload, 
  Trash2, 
  Clock,
  CheckCircle,
  HardDrive,
  Calendar,
  RefreshCw,
  AlertTriangle,
  FileArchive
} from 'lucide-react';

export default function BackupPage() {
  const [loading, setLoading] = useState(false);
  const [backups, setBackups] = useState([
    { id: 1, name: 'full-backup-2024-01-15', date: '2024-01-15 10:30', size: '256 MB', type: 'full' },
    { id: 2, name: 'db-backup-2024-01-14', date: '2024-01-14 10:30', size: '128 MB', type: 'database' },
    { id: 3, name: 'full-backup-2024-01-13', date: '2024-01-13 10:30', size: '245 MB', type: 'full' },
    { id: 4, name: 'db-backup-2024-01-12', date: '2024-01-12 10:30', size: '120 MB', type: 'database' },
  ]);

  const createBackup = async (type) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`${type} backup created successfully!`);
    }, 2000);
  };

  const restoreBackup = (backup) => {
    if (confirm(`Are you sure you want to restore from ${backup.name}? This will overwrite current data.`)) {
      alert('Restore process started...');
    }
  };

  const deleteBackup = (id) => {
    if (confirm('Are you sure you want to delete this backup?')) {
      setBackups(backups.filter(b => b.id !== id));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Backup & Restore</h1>
          <p className="text-gray-500">Manage your database backups</p>
        </div>
        <button 
          onClick={() => createBackup('Full')}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <HardDrive className="w-4 h-4" />}
          Create Backup
        </button>
      </div>

      {/* Backup Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
            <HardDrive className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Full Backup</h3>
          <p className="text-sm text-gray-500 mb-4">Complete backup including database, files, and settings</p>
          <button 
            onClick={() => createBackup('Full')}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Full Backup
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
            <FileArchive className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Database Only</h3>
          <p className="text-sm text-gray-500 mb-4">Backup only the database collections</p>
          <button 
            onClick={() => createBackup('Database')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Create DB Backup
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
            <Upload className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Restore</h3>
          <p className="text-sm text-gray-500 mb-4">Restore from a previous backup file</p>
          <button 
            onClick={() => alert('Select a backup file to restore')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Restore Backup
          </button>
        </div>
      </div>

      {/* Auto Backup Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Automated Backup</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Enable Auto Backup</p>
              <p className="text-sm text-gray-500">Automatically backup your data on schedule</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Frequency</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Time</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>00:00</option>
                <option>02:00</option>
                <option>04:00</option>
                <option>06:00</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Retention</label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Keep last 7 backups</option>
                <option>Keep last 14 backups</option>
                <option>Keep last 30 backups</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Backup List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Available Backups</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Backup Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {backups.map((backup) => (
                <tr key={backup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileArchive className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{backup.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      backup.type === 'full' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {backup.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{backup.date}</td>
                  <td className="px-6 py-4 text-gray-600">{backup.size}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => alert('Download started...')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => restoreBackup(backup)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Restore"
                      >
                        <Upload className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteBackup(backup.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
