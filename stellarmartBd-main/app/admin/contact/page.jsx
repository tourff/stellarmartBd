'use client';

import { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Trash2,
  Reply,
  MoreVertical,
  Send
} from 'lucide-react';

export default function ContactPage() {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+8801234567890', subject: 'Product Inquiry', message: 'I want to know about your pricing for bulk orders.', status: 'unread', date: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+8801234567891', subject: 'Support Request', message: 'I need help with my recent order #12345.', status: 'read', date: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+8801234567892', subject: 'Partnership', message: 'We are interested in becoming a vendor.', status: 'replied', date: '2024-01-13' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '+8801234567893', subject: 'Feedback', message: 'Great website! Love the shopping experience.', status: 'read', date: '2024-01-12' },
    { id: 5, name: 'Tom Brown', email: 'tom@example.com', phone: '+8801234567894', subject: 'Shipping Query', message: 'Do you ship internationally?', status: 'unread', date: '2024-01-11' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');

  const filteredContacts = contacts.filter(contact => 
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     contact.subject.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || contact.status === filterStatus)
  );

  const markAsRead = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status: 'read' } : c));
  };

  const markAsReplied = (id) => {
    setContacts(contacts.map(c => c.id === id ? { ...c, status: 'replied' } : c));
    setShowReplyModal(false);
    setReplyMessage('');
  };

  const deleteContact = (id) => {
    if (confirm('Are you sure you want to delete this message?')) {
      setContacts(contacts.filter(c => c.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      unread: 'bg-red-100 text-red-800',
      read: 'bg-blue-100 text-blue-800',
      replied: 'bg-green-100 text-green-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  const unreadCount = contacts.filter(c => c.status === 'unread').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Contact Messages</h1>
          <p className="text-gray-500">{unreadCount} unread messages</p>
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
                placeholder="Search messages..."
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
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact List */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Messages ({filteredContacts.length})</h2>
          </div>
          <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div 
                key={contact.id}
                onClick={() => { setSelectedContact(contact); markAsRead(contact.id); }}
                className={`p-4 cursor-pointer hover:bg-gray-50 ${selectedContact?.id === contact.id ? 'bg-blue-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium">{contact.name}</h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{contact.subject}</p>
                <p className="text-sm text-gray-500 truncate">{contact.message}</p>
                <p className="text-xs text-gray-400 mt-1">{contact.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm">
          {selectedContact ? (
            <>
              <div className="p-6 border-b">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{selectedContact.subject}</h2>
                    <p className="text-gray-500">From: {selectedContact.name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowReplyModal(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Reply className="w-4 h-4" />
                      Reply
                    </button>
                    <button 
                      onClick={() => deleteContact(selectedContact.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium">{selectedContact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium">{selectedContact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="font-medium">{selectedContact.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <p className="font-medium capitalize">{selectedContact.status}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Message</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{selectedContact.message}</p>
                  </div>
                </div>
              </div>

              {/* Reply Modal */}
              {showReplyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 w-full max-w-lg">
                    <h3 className="text-lg font-semibold mb-4">Reply to {selectedContact.name}</h3>
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Write your reply..."
                      className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowReplyModal(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => markAsReplied(selectedContact.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
