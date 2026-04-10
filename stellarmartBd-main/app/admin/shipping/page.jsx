'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Loader2,
  X,
  Truck,
  Globe,
  DollarSign,
  Weight,
  Clock,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function ShippingPage() {
  const [methods, setMethods] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemType, setItemType] = useState('method'); // 'method' or 'zone'
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: 'flat_rate',
    cost: 0,
    minimumOrderAmount: 0,
    freeShippingThreshold: '',
    estimatedDeliveryDays: 3,
    isActive: true,
    isDefault: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/shipping');
      const data = await res.json();
      setMethods(data.methods || []);
      setZones(data.zones || []);
    } catch (error) {
      console.error('Error fetching shipping data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const typeParam = itemType === 'zone' ? 'zone' : 'method';
      const res = await fetch(`/api/shipping?type=${typeParam}`, {
        method: editingItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          id: editingItem?._id,
          freeShippingThreshold: formData.freeShippingThreshold ? parseFloat(formData.freeShippingThreshold) : null
        })
      });

      if (res.ok) {
        alert(editingItem ? 'Updated successfully!' : 'Created successfully!');
        setShowModal(false);
        resetForm();
        fetchData();
      }
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  const handleDelete = async (item, type) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/shipping?type=${type}&id=${item._id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);
    setItemType(type);
    if (type === 'zone') {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        countries: item.countries || [],
        isActive: item.isActive ?? true
      });
    } else {
      setFormData({
        name: item.name || '',
        description: item.description || '',
        type: item.type || 'flat_rate',
        cost: item.cost || 0,
        minimumOrderAmount: item.minimumOrderAmount || 0,
        freeShippingThreshold: item.freeShippingThreshold || '',
        estimatedDeliveryDays: item.estimatedDeliveryDays || 3,
        isActive: item.isActive ?? true,
        isDefault: item.isDefault || false
      });
    }
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      type: 'flat_rate',
      cost: 0,
      minimumOrderAmount: 0,
      freeShippingThreshold: '',
      estimatedDeliveryDays: 3,
      isActive: true,
      isDefault: false
    });
  };

  const toggleActive = async (item, type) => {
    try {
      const typeParam = type === 'zone' ? 'zone' : 'method';
      await fetch(`/api/shipping?type=${typeParam}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item._id, isActive: !item.isActive })
      });
      fetchData();
    } catch (error) {
      console.error('Error toggling:', error);
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'flat_rate': return <DollarSign className="w-4 h-4" />;
      case 'free_shipping': return <Truck className="w-4 h-4" />;
      case 'weight_based': return <Weight className="w-4 h-4" />;
      case 'local_pickup': return <Truck className="w-4 h-4" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shipping Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => { setItemType('zone'); resetForm(); setShowModal(true); }}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            Add Zone
          </button>
          <button 
            onClick={() => { setItemType('method'); resetForm(); setShowModal(true); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Method
          </button>
        </div>
      </div>

      {/* Shipping Zones */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Shipping Zones
        </h2>
        {zones.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No shipping zones defined</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((zone) => (
              <div key={zone._id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{zone.name}</h3>
                  <button
                    onClick={() => toggleActive(zone, 'zone')}
                    className={zone.isActive ? 'text-green-600' : 'text-gray-400'}
                  >
                    {zone.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-2">{zone.countries?.join(', ')}</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(zone, 'zone')}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(zone, 'zone')}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Shipping Methods */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Truck className="w-5 h-5" />
          Shipping Methods
        </h2>
        {methods.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No shipping methods defined</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Method</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Cost</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Min Order</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Free Over</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Delivery</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {methods.map((method) => (
                  <tr key={method._id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium">{method.name}</div>
                      {method.description && (
                        <div className="text-sm text-gray-500">{method.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1 capitalize">
                        {getTypeIcon(method.type)}
                        {method.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4">৳{method.cost}</td>
                    <td className="px-4 py-4">৳{method.minimumOrderAmount || 0}</td>
                    <td className="px-4 py-4">
                      {method.freeShippingThreshold ? `৳${method.freeShippingThreshold}` : '-'}
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        {method.estimatedDeliveryDays} days
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleActive(method, 'method')}
                        className={method.isActive ? 'text-green-600' : 'text-gray-400'}
                      >
                        {method.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleEdit(method, 'method')}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(method, 'method')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingItem ? `Edit ${itemType === 'zone' ? 'Zone' : 'Method'}` : `Add ${itemType === 'zone' ? 'Zone' : 'Method'}`}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {itemType === 'zone' ? 'Zone Name *' : 'Method Name *'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {itemType === 'zone' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Countries (comma separated)</label>
                  <input
                    type="text"
                    value={formData.countries?.join(', ')}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      countries: e.target.value.split(',').map(c => c.trim()).filter(Boolean)
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Bangladesh, India, USA"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Method Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="flat_rate">Flat Rate</option>
                      <option value="free_shipping">Free Shipping</option>
                      <option value="weight_based">Weight Based</option>
                      <option value="local_pickup">Local Pickup</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Shipping Cost (৳)</label>
                      <input
                        type="number"
                        value={formData.cost}
                        onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Min Order Amount (৳)</label>
                      <input
                        type="number"
                        value={formData.minimumOrderAmount}
                        onChange={(e) => setFormData({ ...formData, minimumOrderAmount: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Free Shipping Threshold (৳)</label>
                      <input
                        type="number"
                        value={formData.freeShippingThreshold}
                        onChange={(e) => setFormData({ ...formData, freeShippingThreshold: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Leave empty to disable"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Delivery (days)</label>
                      <input
                        type="number"
                        value={formData.estimatedDeliveryDays}
                        onChange={(e) => setFormData({ ...formData, estimatedDeliveryDays: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        min="1"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
                {itemType === 'method' && (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isDefault}
                      onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Default Method</span>
                  </label>
                )}
              </div>

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
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
