'use client';

import { useState, useEffect } from 'react';
import { 
  Plus,
  Edit,
  Trash2,
  Search,
  Eye,
  Loader2,
  X,
  ShoppingCart,
  Image as ImageIcon,
  Upload
} from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    nameBn: '',
    description: '',
    descriptionBn: '',
    regularPrice: 0,
    sellingPrice: 0,
    stockQuantity: 0,
    category: '',
    sku: '',
    brand: '',
    tags: [],
    images: [],
    featuredImage: '',
    isFeatured: false,
    isNewArrival: false,
    isBestSeller: false,
    isActive: true
  });
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/categories')
      ]);
      
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      
      setProducts(productsData.products || []);
      setCategories(categoriesData.categories || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure product is always active (published)
      const productData = {
        ...formData,
        isActive: true, // Always publish the product
        price: formData.sellingPrice,
        oldPrice: formData.regularPrice,
        stock: formData.stockQuantity
      };
      
      const url = editingProduct 
        ? `/api/products/${editingProduct._id}`
        : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        alert(editingProduct ? 'Product updated and published!' : 'Product created and published!');
        setShowModal(false);
        resetForm();
        fetchData();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || '',
      nameBn: product.nameBn || '',
      description: product.description || '',
      descriptionBn: product.descriptionBn || '',
      regularPrice: product.regularPrice || product.oldPrice || 0,
      sellingPrice: product.sellingPrice || product.price || 0,
      stockQuantity: product.stockQuantity || product.stock || 0,
      category: product.category?._id || product.category || '',
      sku: product.sku || '',
      brand: product.brand || '',
      tags: product.tags || [],
      images: product.images || [],
      featuredImage: product.featuredImage || '',
      isFeatured: product.isFeatured || false,
      isNewArrival: product.isNewArrival || false,
      isBestSeller: product.isBestSeller || false,
      isActive: product.isActive ?? true
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameBn: '',
      description: '',
      descriptionBn: '',
      regularPrice: 0,
      sellingPrice: 0,
      stockQuantity: 0,
      category: '',
      sku: '',
      brand: '',
      tags: [],
      images: [],
      featuredImage: '',
      isFeatured: false,
      isNewArrival: false,
      isBestSeller: false,
      isActive: true
    });
    setImageInput('');
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
        featuredImage: formData.featuredImage || imageInput.trim()
      });
      setImageInput('');
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
      featuredImage: newImages[0] || ''
    });
  };

  const setAsFeatured = (imageUrl) => {
    setFormData({
      ...formData,
      featuredImage: imageUrl
    });
  };

  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>

      {/* Toolbar */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => { resetForm(); setShowModal(true); }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No products found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                      {product.featuredImage || product.images?.[0] ? (
                        <img 
                          src={product.featuredImage || product.images[0]} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{product.name}</span>
                    {product.isFeatured && (
                      <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.sku || '-'}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.category?.name || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-900 font-semibold">৳{product.sellingPrice?.toLocaleString() || product.price?.toLocaleString()}</span>
                    {product.regularPrice > product.sellingPrice && (
                      <span className="ml-2 text-gray-500 line-through text-sm">
                        ৳{product.regularPrice?.toLocaleString() || product.oldPrice?.toLocaleString()}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.stockQuantity > 0 || product.stock > 0 ? (
                      <span className={(product.stockQuantity || product.stock) < 10 ? 'text-orange-600 font-medium' : 'text-green-600'}>
                        {product.stockQuantity || product.stock}
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Out of Stock</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {product.isActive ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                    ) : (
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Inactive</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(product._id)}
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name (English) *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Name (Bangla)</label>
                  <input
                    type="text"
                    value={formData.nameBn}
                    onChange={(e) => setFormData({ ...formData, nameBn: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (English)</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Bangla)</label>
                <textarea
                  value={formData.descriptionBn}
                  onChange={(e) => setFormData({ ...formData, descriptionBn: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              {/* Pricing */}
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Regular Price *</label>
                  <input
                    type="number"
                    value={formData.regularPrice}
                    onChange={(e) => setFormData({ ...formData, regularPrice: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price *</label>
                  <input
                    type="number"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Images</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Add
                  </button>
                </div>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={img} 
                          alt={`Product ${index + 1}`}
                          className={`w-full h-20 object-cover rounded-lg ${formData.featuredImage === img ? 'ring-2 ring-blue-500' : ''}`}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1">
                          {formData.featuredImage !== img && (
                            <button
                              type="button"
                              onClick={() => setAsFeatured(img)}
                              className="p-1 bg-white rounded text-xs text-gray-700"
                            >
                              Set Featured
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1 bg-red-500 rounded text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        {formData.featuredImage === img && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded">Featured</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Add image URLs. Click on an image to set it as featured.</p>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 flex-wrap">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Featured</span>
                </label>
                
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isNewArrival}
                    onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">New Arrival</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isBestSeller}
                    onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Best Seller</span>
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
                  {editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
