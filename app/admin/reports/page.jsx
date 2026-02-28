'use client';

import { useState } from 'react';
import { 
  Download, 
  FileText, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('30');

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: TrendingUp, description: 'Track sales performance and revenue' },
    { id: 'products', name: 'Product Report', icon: BarChart3, description: 'Product performance and inventory' },
    { id: 'customers', name: 'Customer Report', icon: FileText, description: 'Customer acquisition and retention' },
    { id: 'categories', name: 'Category Report', icon: PieChart, description: 'Category-wise performance' },
  ];

  const generateReport = (type) => {
    alert(`Generating ${type} report... This feature will be available soon!`);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-gray-500">Generate and download various reports</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <report.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{report.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{report.description}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => generateReport(report.id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button 
                    onClick={() => generateReport(report.id)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Summary (Last {dateRange} days)</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total Revenue</p>
            <p className="text-2xl font-bold">৳0</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Average Order Value</p>
            <p className="text-2xl font-bold">৳0</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-bold">0%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
