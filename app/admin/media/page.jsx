'use client';

import { useState } from 'react';
import { 
  Upload, 
  Image as ImageIcon, 
  Film, 
  File, 
  Search,
  Grid,
  List,
  Trash2,
  Download,
  Eye,
  MoreVertical,
  Folder,
  Cloud
} from 'lucide-react';

export default function MediaPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);

  const mediaFiles = [
    { id: 1, name: 'banner-1.jpg', type: 'image', size: '2.4 MB', url: '#', date: '2024-01-15' },
    { id: 2, name: 'product-1.jpg', type: 'image', size: '1.2 MB', url: '#', date: '2024-01-14' },
    { id: 3, name: 'logo.png', type: 'image', size: '45 KB', url: '#', date: '2024-01-10' },
    { id: 4, name: 'promo-video.mp4', type: 'video', size: '15 MB', url: '#', date: '2024-01-08' },
    { id: 5, name: 'category-thumb.jpg', type: 'image', size: '890 KB', url: '#', date: '2024-01-05' },
  ];

  const filteredFiles = mediaFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (mediaType === 'all' || file.type === mediaType)
  );

  const getFileIcon = (type) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-8 h-8 text-blue-500" />;
      case 'video': return <Film className="w-8 h-8 text-purple-500" />;
      default: return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const handleUpload = () => {
    alert('Upload functionality - integrate with your storage provider (AWS S3, Cloudinary, etc.)');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Media Library</h1>
          <p className="text-gray-500">Manage your images, videos, and files</p>
        </div>
        <button 
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload Files
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-[200px] max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Files</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="document">Documents</option>
          </select>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Storage Info */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Cloud className="w-10 h-10" />
            <div>
              <p className="text-lg font-semibold">Cloud Storage</p>
              <p className="text-sm opacity-80">2.4 GB of 10 GB used</p>
            </div>
          </div>
          <div className="w-48">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '24%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Media Files */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredFiles.map((file) => (
            <div key={file.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                {file.type === 'image' ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                ) : (
                  getFileIcon(file.type)
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{file.name}</p>
                <p className="text-xs text-gray-500">{file.size}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFiles.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.type)}
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-600">{file.type}</td>
                  <td className="px-6 py-4 text-gray-600">{file.size}</td>
                  <td className="px-6 py-4 text-gray-600">{file.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
  );
}
