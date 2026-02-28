'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  Eye,
  EyeOff,
  GripVertical,
  X
} from 'lucide-react';

export default function BannerManagement() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    titleBn: '',
    description: '',
    descriptionBn: '',
    image: '',
    link: '',
    linkText: 'Shop Now',
    position: 'hero',
    isActive: true,
    orderBy: 0,
    startDate: '',
    endDate: ''
  });

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners?admin=true');
      const data = await res.json();
      setBanners(data.banners || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = editingBanner 
        ? `/api/banners/${editingBanner._id}`
        : '/api/banners';
      
      const method = editingBanner ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert(editingBanner ? 'Banner updated!' : 'Banner created!');
        setShowModal(false);
        resetForm();
        fetchBanners();
      } else {
        alert('Error creating banner. Make sure MongoDB is connected!');
      }
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Error saving banner!');
    }
  };

  // Delete banner
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    
    try {
      await fetch(`/api/banners/${id}`, { method: 'DELETE' });
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
    }
  };

  // Toggle active status
  const toggleActive = async (banner) => {
    try {
      await fetch(`/api/banners/${banner._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !banner.isActive })
      });
      fetchBanners();
    } catch (error) {
      console.error('Error toggling banner:', error);
    }
  };

  // Edit banner
  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title || '',
      titleBn: banner.titleBn || '',
      description: banner.description || '',
      descriptionBn: banner.descriptionBn || '',
      image: banner.image || '',
      link: banner.link || '',
      linkText: banner.linkText || 'Shop Now',
      position: banner.position || 'hero',
      isActive: banner.isActive ?? true,
      orderBy: banner.orderBy || 0,
      startDate: banner.startDate ? banner.startDate.split('T')[0] : '',
      endDate: banner.endDate ? banner.endDate.split('T')[0] : ''
    });
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      titleBn: '',
      description: '',
      descriptionBn: '',
      image: '',
      link: '',
      linkText: 'Shop Now',
      position: 'hero',
      isActive: true,
      orderBy: 0,
      startDate: '',
      endDate: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Banner Management</h1>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add New Banner
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg min-h-screen p-4">
          <nav className="space-y-1">
            <a href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              <span>← Back to Dashboard</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {loading ? (
            <div className="text-center py-10 text-gray-700">Loading...</div>
          ) : banners.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No banners found</p>
              <p className="text-gray-500 text-sm mt-2">Create banners to display on your website</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 text-blue-600 hover:underline font-medium"
              >
                Create your first banner
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {banners.map((banner) => (
                <div
                  key={banner._id}
                  className={`bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 ${
                    !banner.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                  
                  <div className="w-32 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {banner.image ? (
                      <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{banner.title}</h3>
                    <p className="text-sm text-gray-600 truncate">{banner.description}</p>
                    <div className="flex gap-2 mt-1">
                      <span className={`px-2 py-0.5 text-xs rounded font-medium ${
                        banner.position === 'hero' ? 'bg-blue-100 text-blue-700' :
                        banner.position === 'top' ? 'bg-green-100 text-green-700' :
                        banner.position === 'middle' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-200 text-gray-700'
                      }`}>
                        {banner.position}
                      </span>
                      <span className="px-2 py-0.5 text-xs rounded bg-gray-200 text-gray-700 font-medium">
                        Order: {banner.orderBy}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(banner)}
                      className={`p-2 rounded-lg ${
                        banner.isActive 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                      }`}
                      title={banner.isActive ? 'Active' : 'Inactive'}
                    >
                      {banner.isActive ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    
                    <button
                      onClick={() => handleEdit(banner)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => handleDelete(banner._id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Banner Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="https://example.com/image.jpg"
                  required
                />
                {formData.image && (
                  <div className="mt-2 w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title (Bangla)
                  </label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (English)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Bangla)
                  </label>
                  <textarea
                    value={formData.descriptionBn}
                    onChange={(e) => setFormData({ ...formData, descriptionBn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    rows={2}
                  />
                </div>
              </div>

              {/* Link & Position */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Link URL
                  </label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="/shop"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.linkText}
                    onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Position
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="hero">Hero Banner</option>
                    <option value="top">Top Banner</option>
                    <option value="middle">Middle Banner</option>
                    <option value="bottom">Bottom Banner</option>
                  </select>
                </div>
              </div>

              {/* Order & Active */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.orderBy}
                    onChange={(e) => setFormData({ ...formData, orderBy: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                    min={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                  />
                </div>
              </div>

              {/* Active Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded text-blue-600"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (Show on website)
                </label>
              </div>

              {/* Submit Button */}
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
                  {editingBanner ? 'Update Banner' : 'Create Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
