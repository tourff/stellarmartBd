'use client';

import { useState, useEffect } from 'react';
import { 
  Server, 
  Database, 
  HardDrive, 
  Cpu, 
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Clock
} from 'lucide-react';

export default function SystemHealthPage() {
  const [loading, setLoading] = useState(true);
  const [systemStatus, setSystemStatus] = useState({
    api: { status: 'unknown', latency: 0 },
    database: { status: 'unknown', size: '0 MB' },
    storage: { used: 0, total: 100 },
    memory: { used: 0, total: 100 },
    uptime: '0 hours'
  });

  useEffect(() => {
    fetchSystemStatus();
  }, []);

  const fetchSystemStatus = async () => {
    setLoading(false);
    // Simulate API call - in production this would fetch real data
    setSystemStatus({
      api: { status: 'healthy', latency: 45 },
      database: { status: 'healthy', size: '256 MB' },
      storage: { used: 45, total: 100 },
      memory: { used: 62, total: 100 },
      uptime: '72 hours'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const healthChecks = [
    { name: 'API Server', status: systemStatus.api.status, details: `${systemStatus.api.latency}ms response time` },
    { name: 'Database Connection', status: systemStatus.database.status, details: `Size: ${systemStatus.database.size}` },
    { name: 'Authentication', status: 'healthy', details: 'JWT tokens working' },
    { name: 'Email Service', status: 'healthy', details: 'SMTP configured' },
    { name: 'File Storage', status: 'healthy', details: 'Local storage active' },
    { name: 'Cache Service', status: 'healthy', details: 'Redis connected' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">System Health</h1>
          <p className="text-gray-500">Monitor your application health</p>
        </div>
        <button 
          onClick={fetchSystemStatus}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            {getStatusIcon(systemStatus.api.status)}
          </div>
          <p className="text-sm text-gray-500">API Status</p>
          <p className="text-lg font-semibold capitalize">{systemStatus.api.status}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Database className="w-6 h-6 text-purple-600" />
            </div>
            {getStatusIcon(systemStatus.database.status)}
          </div>
          <p className="text-sm text-gray-500">Database</p>
          <p className="text-lg font-semibold capitalize">{systemStatus.database.status}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Uptime</p>
          <p className="text-lg font-semibold">{systemStatus.uptime}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-lg">
              <Cpu className="w-6 h-6 text-orange-600" />
            </div>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Server Load</p>
          <p className="text-lg font-semibold">Normal</p>
        </div>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Storage Usage</h3>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Used</span>
              <span className="text-gray-600">{systemStatus.storage.used}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${systemStatus.storage.used > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                style={{ width: `${systemStatus.storage.used}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">45 GB of 100 GB used</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Memory Usage</h3>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Used</span>
              <span className="text-gray-600">{systemStatus.memory.used}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${systemStatus.memory.used > 80 ? 'bg-red-500' : 'bg-green-500'}`}
                style={{ width: `${systemStatus.memory.used}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-500">62% of available memory used</p>
        </div>
      </div>

      {/* Health Checks */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Health Checks</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {healthChecks.map((check, index) => (
            <div key={index} className="p-4 flex items-center justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                {getStatusIcon(check.status)}
                <div>
                  <p className="font-medium">{check.name}</p>
                  <p className="text-sm text-gray-500">{check.details}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                check.status === 'healthy' ? 'bg-green-100 text-green-800' :
                check.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {check.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
