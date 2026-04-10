'use client';

import { useState } from 'react';
import { 
  Zap, 
  RefreshCw, 
  Trash2, 
  Server,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function CachePage() {
  const [loading, setLoading] = useState(false);
  const [cacheStats, setCacheStats] = useState({
    apiCache: { enabled: true, entries: 1250, size: '45 MB' },
    sessionCache: { enabled: true, entries: 89, size: '12 MB' },
    viewCache: { enabled: true, entries: 456, size: '28 MB' },
  });

  const clearCache = async (type) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`${type} cache cleared successfully!`);
    }, 1000);
  };

  const clearAllCache = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('All cache cleared successfully!');
    }, 1500);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Cache Management</h1>
          <p className="text-gray-500">Manage application cache</p>
        </div>
        <button 
          onClick={clearAllCache}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          Clear All Cache
        </button>
      </div>

      {/* Cache Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">API Cache</p>
          <p className="text-2xl font-bold">{cacheStats.apiCache.entries} entries</p>
          <p className="text-sm text-gray-500">{cacheStats.apiCache.size}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Zap className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">Session Cache</p>
          <p className="text-2xl font-bold">{cacheStats.sessionCache.entries} entries</p>
          <p className="text-sm text-gray-500">{cacheStats.sessionCache.size}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm text-gray-500">Active</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">View Cache</p>
          <p className="text-2xl font-bold">{cacheStats.viewCache.entries} entries</p>
          <p className="text-sm text-gray-500">{cacheStats.viewCache.size}</p>
        </div>
      </div>

      {/* Cache Settings */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Cache Configuration</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Enable API Cache</p>
              <p className="text-sm text-gray-500">Cache API responses for faster loading</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Enable Session Cache</p>
              <p className="text-sm text-gray-500">Cache user session data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Enable View Cache</p>
              <p className="text-sm text-gray-500">Cache rendered page views</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => clearCache('API')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
          >
            <RefreshCw className="w-8 h-8 text-blue-600" />
            <span className="font-medium">Clear API Cache</span>
            <span className="text-sm text-gray-500">Clear {cacheStats.apiCache.entries} entries</span>
          </button>

          <button 
            onClick={() => clearCache('Session')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
          >
            <Zap className="w-8 h-8 text-purple-600" />
            <span className="font-medium">Clear Session Cache</span>
            <span className="text-sm text-gray-500">Clear {cacheStats.sessionCache.entries} entries</span>
          </button>

          <button 
            onClick={() => clearCache('View')}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center gap-2"
          >
            <Clock className="w-8 h-8 text-green-600" />
            <span className="font-medium">Clear View Cache</span>
            <span className="text-sm text-gray-500">Clear {cacheStats.viewCache.entries} entries</span>
          </button>
        </div>
      </div>
    </div>
  );
}
