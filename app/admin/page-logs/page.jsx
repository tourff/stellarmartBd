'use client';

import { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Download,
  Calendar,
  Clock,
  Eye,
  User,
  Globe,
  ArrowUpDown,
  RefreshCw,
  Monitor,
  Tablet,
  Smartphone
} from 'lucide-react';

export default function PageLogsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDevice, setFilterDevice] = useState('all');
  const [timeRange, setTimeRange] = useState('today');

  const pageLogs = [
    { id: 1, page: '/', title: 'Home', views: 1250, uniqueVisitors: 890, avgTime: '2:45', device: 'mobile', date: '2024-01-15', userType: 'guest' },
    { id: 2, page: '/shop', title: 'Shop', views: 980, uniqueVisitors: 720, avgTime: '3:12', device: 'desktop', date: '2024-01-15', userType: 'guest' },
    { id: 3, page: '/product/wireless-headphones', title: 'Wireless Headphones', views: 456, uniqueVisitors: 380, avgTime: '4:30', device: 'mobile', date: '2024-01-15', userType: 'guest' },
    { id: 4, page: '/cart', title: 'Cart', views: 340, uniqueVisitors: 290, avgTime: '1:45', device: 'desktop', date: '2024-01-15', userType: 'guest' },
    { id: 5, page: '/category/electronics', title: 'Electronics', views: 520, uniqueVisitors: 410, avgTime: '2:55', device: 'tablet', date: '2024-01-15', userType: 'guest' },
    { id: 6, page: '/about', title: 'About Us', views: 180, uniqueVisitors: 165, avgTime: '1:20', device: 'mobile', date: '2024-01-15', userType: 'guest' },
    { id: 7, page: '/contact', title: 'Contact', views: 145, uniqueVisitors: 130, avgTime: '2:10', device: 'desktop', date: '2024-01-15', userType: 'guest' },
    { id: 8, page: '/search', title: 'Search', views: 290, uniqueVisitors: 250, avgTime: '1:55', device: 'mobile', date: '2024-01-15', userType: 'guest' },
  ];

  const filteredLogs = pageLogs.filter(log => 
    (log.page.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterDevice === 'all' || log.device === filterDevice)
  );

  const totalViews = pageLogs.reduce((sum, log) => sum + log.views, 0);
  const totalUnique = pageLogs.reduce((sum, log) => sum + log.uniqueVisitors, 0);

  const getDeviceIcon = (device) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  const getDeviceColor = (device) => {
    switch (device) {
      case 'mobile': return 'bg-blue-100 text-blue-600';
      case 'tablet': return 'bg-purple-100 text-purple-600';
      case 'desktop': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Page Logs</h1>
          <p className="text-gray-500">Track page views and navigation patterns</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Eye className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500">Total Views</p>
          <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <User className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Unique Visitors</p>
          <p className="text-2xl font-bold">{totalUnique.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm text-gray-500">Avg Time on Site</p>
          <p className="text-2xl font-bold">2:35</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-orange-500" />
          </div>
          <p className="text-sm text-gray-500">Pages Viewed</p>
          <p className="text-2xl font-bold">{pageLogs.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={filterDevice}
            onChange={(e) => setFilterDevice(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Devices</option>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
            <option value="tablet">Tablet</option>
          </select>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
          </select>
        </div>
      </div>

      {/* Page Logs Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Unique</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Avg Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Device</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="text-blue-600 font-medium">{log.page}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{log.title}</td>
                  <td className="px-6 py-4 font-medium">{log.views.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-600">{log.uniqueVisitors.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      {log.avgTime}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDeviceColor(log.device)}`}>
                      <span className="flex items-center gap-1">
                        {getDeviceIcon(log.device)}
                        {log.device}
                      </span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
