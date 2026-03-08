'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Search, 
  Loader2,
  X,
  Bell,
  BellOff,
  Check,
  CheckCheck,
  Info,
  AlertTriangle,
  AlertCircle,
  ShoppingCart,
  User,
  Package,
  Tag
} from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info',
    priority: 'medium',
    link: '',
    image: '',
    isBroadcast: false,
    targetRoles: []
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data.notifications || []);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('Notification created!');
        setShowModal(false);
        resetForm();
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/notifications/${id}`, { method: 'DELETE' });
      fetchNotifications();
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications?id=${id}`, { method: 'PUT' });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch('/api/notifications?markAllRead=true', { method: 'PUT' });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      message: '',
      type: 'info',
      priority: 'medium',
      link: '',
      image: '',
      isBroadcast: false,
      targetRoles: []
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'order': return <ShoppingCart className="w-5 h-5 text-blue-500" />;
      case 'payment': return <Tag className="w-5 h-5 text-green-500" />;
      case 'user': return <User className="w-5 h-5 text-purple-500" />;
      case 'product': return <Package className="w-5 h-5 text-orange-500" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'promotion': return <Tag className="w-5 h-5 text-pink-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotifications = notifications.filter(notification => 
    notification.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-500">{unreadCount} unread notifications</p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4" />
              Mark All Read
            </button>
          )}
          <button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create Notification
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center py-20">
            <BellOff className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification._id} 
                className={`p-4 hover:bg-gray-50 flex items-start gap-4 ${!notification.isRead ? 'bg-blue-50' : ''}`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getTypeIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-0.5 text-xs rounded ${getPriorityColor(notification.priority)}`}>
                      {notification.priority}
                    </span>
                    {notification.isBroadcast && (
                      <span className="px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">
                        Broadcast
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{new Date(notification.createdAt).toLocaleString()}</span>
                    {notification.link && (
                      <a href={notification.link} className="text-blue-600 hover:underline">
                        View Details →
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification._id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button 
                    onClick={() => handleDelete(notification._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Create Notification</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="info">Info</option>
                    <option value="order">Order</option>
                    <option value="payment">Payment</option>
                    <option value="user">User</option>
                    <option value="product">Product</option>
                    <option value="system">System</option>
                    <option value="promotion">Promotion</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
                <input
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isBroadcast}
                  onChange={(e) => setFormData({ ...formData, isBroadcast: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-sm text-gray-700">Broadcast to all users</span>
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
