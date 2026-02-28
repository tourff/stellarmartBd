'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  ShoppingCart,
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState([]);
  const [totals, setTotals] = useState({ pageViews: 0, uniqueVisitors: 0, sessions: 0, conversions: 0, revenue: 0 });
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/analytics?days=${days}`);
      const data = await res.json();
      setAnalytics(data.analytics || []);
      setTotals(data.totals || { pageViews: 0, uniqueVisitors: 0, sessions: 0, conversions: 0, revenue: 0 });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { title: 'Page Views', value: totals.pageViews.toLocaleString(), icon: Eye, color: 'blue' },
    { title: 'Unique Visitors', value: totals.uniqueVisitors.toLocaleString(), icon: Users, color: 'purple' },
    { title: 'Sessions', value: totals.sessions.toLocaleString(), icon: TrendingUp, color: 'green' },
    { title: 'Conversions', value: totals.conversions.toLocaleString(), icon: ShoppingCart, color: 'orange' },
    { title: 'Revenue', value: `৳${totals.revenue.toLocaleString()}`, icon: DollarSign, color: 'green' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-500">Track your website performance</p>
        </div>
        <div className="flex gap-2">
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button 
            onClick={fetchAnalytics}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Chart Area */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Traffic Overview</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          {analytics.length > 0 ? (
            <div className="w-full px-4">
              <div className="flex items-end justify-between h-48 gap-2">
                {analytics.slice(0, 14).map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${(day.pageViews / (totals.pageViews || 1)) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-1">
                      {new Date(day.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No analytics data available</p>
          )}
        </div>
      </div>

      {/* Recent Analytics Data */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Daily Analytics</h2>
        </div>
        {analytics.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No analytics data yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Page Views</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Unique Visitors</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Sessions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Conversions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Revenue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {new Date(day.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{day.pageViews || 0}</td>
                    <td className="px-6 py-4">{day.uniqueVisitors || 0}</td>
                    <td className="px-6 py-4">{day.sessions || 0}</td>
                    <td className="px-6 py-4">{day.conversions || 0}</td>
                    <td className="px-6 py-4">৳{day.revenue || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
