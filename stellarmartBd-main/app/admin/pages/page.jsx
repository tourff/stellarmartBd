'use client';

import { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye,
  Globe,
  Calendar,
  MoreVertical,
  Copy,
  ToggleLeft,
  ToggleRight,
  Image
} from 'lucide-react';

export default function PagesPage() {
  const [pages, setPages] = useState([
    { id: 1, title: 'Home', slug: 'home', status: 'published', author: 'Admin', createdAt: '2024-01-01', updatedAt: '2024-01-15', featured: true },
    { id: 2, title: 'Shop', slug: 'shop', status: 'published', author: 'Admin', createdAt: '2024-01-01', updatedAt: '2024-01-14', featured: true },
    { id: 3, title: 'About Us', slug: 'about', status: 'published', author: 'Admin', createdAt: '2024-01-02', updatedAt: '2024-01-10', featured: false },
    { id: 4, title: 'Contact', slug: 'contact', status: 'published', author: 'Admin', createdAt: '2024-01-02', updatedAt: '2024-01-12', featured: false },
    { id: 5, title: 'Privacy Policy', slug: 'privacy-policy', status: 'published', author: 'Admin', createdAt: '2024-01-03', updatedAt: '2024-01-08', featured: false },
    { id: 6, title: 'Terms of Service', slug: 'terms-of-service', status: 'published', author: 'Admin', createdAt: '2024-01-03', updatedAt: '2024-01-08', featured: false },
    { id: 7, title: 'FAQ', slug: 'faq', status: 'draft', author: 'Admin', createdAt: '2024-01-05', updatedAt: '2024-01-14', featured: false },
    { id: 8, title: 'Return Policy', slug: 'return-policy', status: 'draft', author: 'Admin', createdAt: '2024-01-06', updatedAt: '2024-01-13', featured: false },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);

  const filteredPages = pages.filter(page => 
    (page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     page.slug.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || page.status === filterStatus)
  );

  const toggleStatus = (id) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, status: page.status === 'published' ? 'draft' : 'published' } : page
    ));
  };

  const toggleFeatured = (id) => {
    setPages(pages.map(page => 
      page.id === id ? { ...page, featured: !page.featured } : page
    ));
  };

  const deletePage = (id) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(page => page.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    return status === 'published' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Pages Management</h1>
          <p className="text-gray-500">Manage your website pages</p>
        </div>
        <button 
          onClick={() => { setEditingPage(null); setShowModal(true); }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Page
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-sm text-gray-500">Total Pages</p>
          <p className="text-2xl font-bold">{pages.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-sm text-gray-500">Published</p>
          <p className="text-2xl font-bold">{pages.filter(p => p.status === 'published').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Edit className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-sm text-gray-500">Drafts</p>
          <p className="text-2xl font-bold">{pages.filter(p => p.status === 'draft').length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Image className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-sm text-gray-500">Featured</p>
          <p className="text-2xl font-bold">{pages.filter(p => p.featured).length}</p>
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
                placeholder="Search pages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Pages Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Updated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Featured</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-gray-400" />
                      <span className="font-medium">{page.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-blue-600">/{page.slug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(page.status)}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{page.author}</td>
                  <td className="px-6 py-4 text-gray-600">{page.updatedAt}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleFeatured(page.id)}
                      className="text-gray-500 hover:text-blue-600"
                    >
                      {page.featured ? <ToggleRight className="w-6 h-6 text-blue-600" /> : <ToggleLeft className="w-6 h-6" />}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => { setEditingPage(page); setShowModal(true); }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deletePage(page.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
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
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4">
              {editingPage ? 'Edit Page' : 'Create New Page'}
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Page Title</label>
                <input 
                  type="text" 
                  defaultValue={editingPage?.title}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter page title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug</label>
                <input 
                  type="text" 
                  defaultValue={editingPage?.slug}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="page-slug"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <textarea 
                  rows={8}
                  defaultValue={editingPage?.content}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter page content..."
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select 
                    defaultValue={editingPage?.status}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Featured Image</label>
                  <input 
                    type="file" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingPage ? 'Update Page' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
