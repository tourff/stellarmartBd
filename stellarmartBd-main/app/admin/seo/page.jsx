'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Globe,
  FileText,
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';

export default function SEOPage() {
  const [seoSettings, setSeoSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingSeo, setEditingSeo] = useState(null);
  const [copied, setCopied] = useState(null);
  const [formData, setFormData] = useState({
    key: '',
    pageName: '',
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    canonicalUrl: '',
    noIndex: false,
    noFollow: false
  });

  useEffect(() => {
    fetchSeoSettings();
  }, []);

  const fetchSeoSettings = async () => {
    try {
      const res = await fetch('/api/seo');
      const data = await res.json();
      setSeoSettings(data.seoSettings || []);
    } catch (error) {
      console.error('Error fetching SEO settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingSeo ? 'PUT' : 'POST';
      const res = await fetch('/api/seo', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          keywords: formData.keywords.split(',').map(k => k.trim()).filter(Boolean)
        })
      });

      if (res.ok) {
        alert(editingSeo ? 'SEO settings updated!' : 'SEO settings created!');
        setShowModal(false);
        resetForm();
        fetchSeoSettings();
      } else {
        const data = await res.json();
        alert(data.error || 'Error saving SEO settings');
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error);
    }
  };

  const handleDelete = async (key) => {
    if (!confirm('Are you sure you want to delete these SEO settings?')) return;
    try {
      await fetch(`/api/seo?key=${key}`, { method: 'DELETE' });
      fetchSeoSettings();
    } catch (error) {
      console.error('Error deleting SEO settings:', error);
    }
  };

  const handleEdit = (seo) => {
    setEditingSeo(seo);
    setFormData({
      key: seo.key || '',
      pageName: seo.pageName || '',
      title: seo.title || '',
      description: seo.description || '',
      keywords: seo.keywords?.join(', ') || '',
      ogImage: seo.ogImage || '',
      canonicalUrl: seo.canonicalUrl || '',
      noIndex: seo.noIndex || false,
      noFollow: seo.noFollow || false
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingSeo(null);
    setFormData({
      key: '',
      pageName: '',
      title: '',
      description: '',
      keywords: '',
      ogImage: '',
      canonicalUrl: '',
      noIndex: false,
      noFollow: false
    });
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredSeo = seoSettings.filter(seo => 
    seo.key?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seo.pageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    seo.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPreviewMetaTags = (seo) => {
    return [
      { name: 'description', content: seo.description },
      { name: 'keywords', content: seo.keywords?.join(', ') },
      { property: 'og:title', content: seo.title },
      { property: 'og:description', content: seo.description },
      { property: 'og:image', content: seo.ogImage },
      ...(seo.noIndex ? [{ name: 'robots', content: 'noindex' }] : []),
      ...(seo.noFollow ? [{ name: 'robots', content: 'nofollow' }] : [])
    ].filter(tag => tag.content);
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
        <div>
          <h1 className="text-2xl font-bold">SEO Settings</h1>
          <p className="text-gray-500">Manage meta tags and search engine optimization</p>
        </div>
        <button 
          onClick={() => { resetForm(); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add SEO Settings
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search SEO settings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* SEO Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSeo.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow-sm p-12 text-center">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No SEO settings found</p>
          </div>
        ) : (
          filteredSeo.map((seo) => (
            <div key={seo._id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{seo.pageName}</h3>
                  <p className="text-sm text-gray-500">/{seo.key}</p>
                </div>
                <div className="flex gap-1">
                  <button 
                    onClick={() => handleEdit(seo)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(seo.key)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 uppercase">Title</label>
                  <p className="text-sm font-medium truncate">{seo.title || '-'}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase">Description</label>
                  <p className="text-sm text-gray-600 line-clamp-2">{seo.description || '-'}</p>
                </div>
                
                {(seo.noIndex || seo.noFollow) && (
                  <div className="flex gap-2">
                    {seo.noIndex && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">noindex</span>
                    )}
                    {seo.noFollow && (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">nofollow</span>
                    )}
                  </div>
                )}

                {/* Preview Meta Tags */}
                <div className="pt-3 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 uppercase">Meta Tags</span>
                    <button 
                      onClick={() => copyToClipboard(JSON.stringify(getPreviewMetaTags(seo), null, 2), seo._id)}
                      className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                    >
                      {copied === seo._id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied === seo._id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="bg-gray-50 rounded p-2 text-xs font-mono overflow-x-auto">
                    {getPreviewMetaTags(seo).map((tag, i) => (
                      <div key={i} className="text-gray-600">
                        {tag.name ? `<meta name="${tag.name}" content="${tag.content}">` : `<meta property="${tag.property}" content="${tag.content}">`}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingSeo ? 'Edit SEO Settings' : 'Add SEO Settings'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Key *</label>
                  <input
                    type="text"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., home, products, about"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique identifier for the page</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Name *</label>
                  <input
                    type="text"
                    value={formData.pageName}
                    onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Home Page, Products, About Us"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Page title for search engines (50-60 chars)"
                  maxLength={70}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.title.length}/70 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description for search results (150-160 chars)"
                  rows={3}
                  maxLength={160}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description.length}/160 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                <input
                  type="text"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
                <input
                  type="url"
                  value={formData.ogImage}
                  onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                <input
                  type="url"
                  value={formData.canonicalUrl}
                  onChange={(e) => setFormData({ ...formData, canonicalUrl: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.noIndex}
                    onChange={(e) => setFormData({ ...formData, noIndex: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">No Index (hide from search)</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.noFollow}
                    onChange={(e) => setFormData({ ...formData, noFollow: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">No Follow (don't follow links)</span>
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
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {editingSeo ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
