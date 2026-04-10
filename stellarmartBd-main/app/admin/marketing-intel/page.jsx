'use client';

import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Target,
  Mail,
  Share2,
  Megaphone,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  MousePointer,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function MarketingIntelPage() {
  const [timeRange, setTimeRange] = useState('30');
  const [loading, setLoading] = useState(false);

  const kpiData = {
    revenue: { value: 125000, change: 12.5, trend: 'up' },
    orders: { value: 456, change: 8.2, trend: 'up' },
    conversionRate: { value: 3.2, change: -0.5, trend: 'down' },
    avgOrderValue: { value: 274, change: 4.1, trend: 'up' },
  };

  const campaigns = [
    { id: 1, name: 'Summer Sale 2024', status: 'active', budget: 5000, spent: 3200, conversions: 156, roi: 215 },
    { id: 2, name: 'New Product Launch', status: 'active', budget: 3000, spent: 2100, conversions: 89, roi: 180 },
    { id: 3, name: 'Email Newsletter', status: 'completed', budget: 500, spent: 450, conversions: 234, roi: 320 },
    { id: 4, name: 'Social Media Ads', status: 'paused', budget: 2000, spent: 1800, conversions: 67, roi: 95 },
  ];

  const channels = [
    { channel: 'Organic Search', visitors: 4500, conversions: 180, revenue: 45000, percentage: 35 },
    { channel: 'Social Media', visitors: 3200, conversions: 145, revenue: 36250, percentage: 25 },
    { channel: 'Email', visitors: 2100, conversions: 168, revenue: 42000, percentage: 16 },
    { channel: 'Direct', visitors: 1800, conversions: 72, revenue: 18000, percentage: 14 },
    { channel: 'Referral', visitors: 900, conversions: 36, revenue: 9000, percentage: 7 },
    { channel: 'Paid Ads', visitors: 600, conversions: 45, revenue: 11250, percentage: 5 },
  ];

  const topProducts = [
    { id: 1, name: 'Wireless Headphones', sales: 156, revenue: 23400, growth: 25 },
    { id: 2, name: 'Smart Watch Pro', sales: 98, revenue: 19600, growth: 18 },
    { id: 3, name: 'Bluetooth Speaker', sales: 87, revenue: 13050, growth: 12 },
    { id: 4, name: 'Laptop Stand', sales: 76, revenue: 7600, growth: -5 },
    { id: 5, name: 'USB-C Hub', sales: 65, revenue: 6500, growth: 8 },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Marketing Intelligence</h1>
          <p className="text-gray-500">Track your marketing performance and ROI</p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className={`flex items-center text-sm ${kpiData.revenue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {kpiData.revenue.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(kpiData.revenue.change)}%
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold">৳{kpiData.revenue.value.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <span className={`flex items-center text-sm ${kpiData.orders.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {kpiData.orders.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(kpiData.orders.change)}%
            </span>
          </div>
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{kpiData.orders.value.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <span className={`flex items-center text-sm ${kpiData.conversionRate.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {kpiData.conversionRate.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(kpiData.conversionRate.change)}%
            </span>
          </div>
          <p className="text-sm text-gray-500">Conversion Rate</p>
          <p className="text-2xl font-bold">{kpiData.conversionRate.value}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <span className={`flex items-center text-sm ${kpiData.avgOrderValue.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {kpiData.avgOrderValue.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {Math.abs(kpiData.avgOrderValue.change)}%
            </span>
          </div>
          <p className="text-sm text-gray-500">Avg Order Value</p>
          <p className="text-2xl font-bold">৳{kpiData.avgOrderValue.value}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Marketing Campaigns */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Active Campaigns</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Campaign</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{campaign.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">৳{campaign.spent.toLocaleString()} / ৳{campaign.budget.toLocaleString()}</div>
                      <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-600 font-medium">{campaign.roi}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Channel Performance */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Channel Performance</h2>
          <div className="space-y-4">
            {channels.map((channel, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{channel.channel}</span>
                  <span className="text-gray-600">৳{channel.revenue.toLocaleString()} ({channel.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${channel.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Top Performing Products</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Sales</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{product.name}</td>
                  <td className="px-6 py-4">{product.sales}</td>
                  <td className="px-6 py-4">৳{product.revenue.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center ${product.growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {product.growth >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      {Math.abs(product.growth)}%
                    </span>
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
