'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Loader2,
  X,
  Store,
  Star,
  Phone,
  Mail,
  MapPin,
  Shield,
  ShieldCheck,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    email: '',
    phone: '',
    logo: '',
    banner: '',
    description: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'Bangladesh'
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      youtube: '',
      website: ''
    },
    commissionRate: 10,
    isActive: true,
    isVerified: false
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const res = await fetch('/api/vendors');
      const data = await res.json();
      setVendors(data.vendors || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingVendor 
        ? `/api/vendors/${editingVendor._id}`
        : '/api/vendors';
      const method = editingVendor ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(editingVendor ? 'Vendor updated!' : 'Vendor created!');
        setShowModal(false);
        resetForm();
        fetchVendors();
      } else {
        const data = await res.json();
        alert(data.error || 'Error saving vendor');
      }
    } catch (error) {
      console.error('Error saving vendor:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this vendor?')) return;
    try {
      await fetch(`/api/vendors/${id}`, { method: 'DELETE' });
      fetchVendors();
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  const handleEdit = (vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name || '',
      slug: vendor.slug || '',
      email: vendor.email || '',
      phone: vendor.phone || '',
      logo: vendor.logo || '',
      banner: vendor.banner || '',
      description: vendor.description || '',
      address: vendor.address || {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Bangladesh'
      },
      socialLinks: vendor.socialLinks || {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        website: ''
      },
      commissionRate: vendor.commissionRate || 10,
      isActive: vendor.isActive ?? true,
      isVerified: vendor.isVerified || false
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingVendor(null);
    setFormData({
      name: '',
      slug: '',
      email: '',
      phone: '',
      logo: '',
      banner: '',
      description: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'Bangladesh'
      },
      socialLinks: {
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        website: ''
      },
      commissionRate: 10,
      isActive: true,
      isVerified: false
    });
  };

  const toggleActive = async (vendor) => {
    try {
      await fetch(`/api/vendors/${vendor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !vendor.isActive })
      });
      fetchVendors();
    } catch (error) {
      console.error('Error toggling vendor:', error);
    }
  };

  const toggleVerified = async (vendor) => {
    try {
      await fetch(`/api/vendors/${vendor._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerified: !vendor.isVerified })
      });
      fetchVendors();
    } catch (error) {
      console.error('Error toggling vendor verification:', error);
    }
  };

  const filteredVendors = vendors.filter(vendor => 
    vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.phone?.includes(searchTerm)
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Vendor Management</h1>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Vendor
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search vendors by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredVendors.length === 0 ? (
          <div className="text-center py-20">
            <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No vendors found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredVendors.map((vendor) => (
              <div key={vendor._id} className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                {/* Banner */}
                <div className="h-24 bg-gradient-to-r from-blue-500 to-purple-600 relative">
                  {vendor.banner && (
                    <img src={vendor.banner} alt="" className="w-full h-full object-cover" />
                  )}
                  <div className="absolute -bottom-10 left-4">
                    <div className="w-16 h-16 bg-white rounded-full p-1">
                      {vendor.logo ? (
                        <img src={vendor.logo} alt={vendor.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                          <Store className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-12 pb-4 px-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-lg flex items-center gap-2">
                        {vendor.name}
                        {vendor.isVerified && (
                          <ShieldCheck className="w-5 h-5 text-blue-500" />
                        )}
                      </h3>
                      <p className="text-sm text-gray-500">@{vendor.slug}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{vendor.rating || 0}</span>
                      <span className="text-xs text-gray-500">({vendor.totalReviews || 0})</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{vendor.email}</span>
                    </div>
                    {vendor.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{vendor.phone}</span>
                      </div>
                    )}
                    {vendor.address?.city && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{vendor.address.city}, {vendor.address.country}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Products:</span>
                      <span className="font-medium ml-1">{vendor.totalProducts || 0}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Sales:</span>
                      <span className="font-medium ml-1">{vendor.totalSales || 0}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Commission:</span>
                      <span className="font-medium ml-1">{vendor.commissionRate}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <button
                      onClick={() => toggleVerified(vendor)}
                      className={`flex items-center gap-1 text-sm ${vendor.isVerified ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                      <Shield className="w-4 h-4" />
                      {vendor.isVerified ? 'Verified' : 'Unverified'}
                    </button>
                    <button
                      onClick={() => toggleActive(vendor)}
                      className={`flex items-center gap-1 text-sm ${vendor.isActive ? 'text-green-600' : 'text-gray-400'}`}
                    >
                      {vendor.isActive ? (
                        <ToggleRight className="w-5 h-5" />
                      ) : (
                        <ToggleLeft className="w-5 h-5" />
                      )}
                      {vendor.isActive ? 'Active' : 'Inactive'}
                    </button>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => handleEdit(vendor)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(vendor._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                  <input
                    type="url"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner URL</label>
                  <input
                    type="url"
                    value={formData.banner}
                    onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={formData.address.street}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, street: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={formData.address.city}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, city: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={formData.address.state}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, state: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  <input
                    type="text"
                    value={formData.address.zipCode}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, zipCode: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.address.country}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      address: { ...formData.address, country: e.target.value }
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate (%)</label>
                <input
                  type="number"
                  value={formData.commissionRate}
                  onChange={(e) => setFormData({ ...formData, commissionRate: parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="0"
                  max="100"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isVerified}
                    onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Verified</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
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
                  {editingVendor ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
