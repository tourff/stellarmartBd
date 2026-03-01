'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2,
  Eye,
  Edit,
  Trash2,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const orderStats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{orderStats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Processing</p>
          <p className="text-2xl font-bold text-blue-600">{orderStats.processing}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Shipped</p>
          <p className="text-2xl font-bold text-purple-600">{orderStats.shipped}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Delivered</p>
          <p className="text-2xl font-bold text-green-600">{orderStats.delivered}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Cancelled</p>
          <p className="text-2xl font-bold text-red-600">{orderStats.cancelled}</p>
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
                placeholder="Search orders by ID, name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm">{order._id?.slice(-8)}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{order.user?.name || 'Guest'}</p>
                        <p className="text-sm text-gray-500">{order.user?.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">{order.items?.length || 0} items</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">৳{order.total?.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <div className="relative group">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Edit className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 min-w-[150px]">
                            <button
                              onClick={() => updateOrderStatus(order._id, 'processing')}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              Mark Processing
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'shipped')}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              Mark Shipped
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'delivered')}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            >
                              Mark Delivered
                            </button>
                            <button
                              onClick={() => updateOrderStatus(order._id, 'cancelled')}
                              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              Cancel Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Order Details</h2>
                <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <XCircle className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Order ID: {selectedOrder._id}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p><span className="font-medium">Name:</span> {selectedOrder.user?.name || 'Guest'}</p>
                  <p><span className="font-medium">Email:</span> {selectedOrder.user?.email || 'N/A'}</p>
                  <p><span className="font-medium">Phone:</span> {selectedOrder.shippingAddress?.phone || 'N/A'}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>{selectedOrder.shippingAddress?.street}</p>
                  <p>{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}</p>
                  <p>{selectedOrder.shippingAddress?.zipCode}, {selectedOrder.shippingAddress?.country}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold mb-2">Order Items</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm">Product</th>
                        <th className="px-4 py-2 text-left text-sm">Qty</th>
                        <th className="px-4 py-2 text-left text-sm">Price</th>
                        <th className="px-4 py-2 text-left text-sm">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">{item.quantity}</td>
                          <td className="px-4 py-2">৳{item.price}</td>
                          <td className="px-4 py-2">৳{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="flex justify-end">
                <div className="w-64">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span>৳{selectedOrder.subtotal?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Shipping:</span>
                    <span>৳{selectedOrder.shippingCost || 0}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax:</span>
                    <span>৳{selectedOrder.tax || 0}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Discount:</span>
                      <span>-৳{selectedOrder.discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>৳{selectedOrder.total?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Update Status */}
              <div>
                <h3 className="font-semibold mb-2">Update Status</h3>
                <div className="flex flex-wrap gap-2">
                  {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => updateOrderStatus(selectedOrder._id, status)}
                      className={`px-4 py-2 rounded-lg capitalize ${selectedOrder.status === status 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
