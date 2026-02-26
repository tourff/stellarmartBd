'use client';

import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, 
  FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPaperPlane 
} from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ভ্যালিডেশন চেক
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('দয়া করে প্রয়োজনীয় সব তথ্য প্রদান করুন');
      return;
    }

    setLoading(true);
    
    // সিমুলেটেড API কল
    setTimeout(() => {
      setLoading(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      toast.success('আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করবো।');
    }, 1500);
  };

  const contactInfo = [
    { icon: FaMapMarkerAlt, title: 'অফিস ঠিকানা', info: 'উত্তরা, ঢাকা, বাংলাদেশ', color: 'bg-blue-50 text-blue-600' },
    { icon: FaPhone, title: 'ফোন করুন', info: '+880 1234 567890', color: 'bg-green-50 text-green-600' },
    { icon: FaEnvelope, title: 'ইমেইল', info: 'support@stellarmartbd.com', color: 'bg-red-50 text-red-600' },
    { icon: FaClock, title: 'সাপোর্ট সময়', info: 'শনিবার - শুক্রবার: সকাল ৯টা - রাত ৯টা', color: 'bg-purple-50 text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
            আমাদের সাথে <span className="text-blue-600">যোগাযোগ</span> করুন
          </h1>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
            আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের মেসেজ পাঠান। আমাদের টিম খুব শীঘ্রই আপনার সাথে যোগাযোগ করবে।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Contact Form - Left Side (8 columns on large screens) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 p-8 border border-gray-100 h-full">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                মেসেজ পাঠান
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">আপনার নাম *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="পুরো নাম লিখুন"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">ইমেইল এড্রেস *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">ফোন নাম্বার</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">বিষয়</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="কি বিষয়ে জানতে চান?"
                      className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">মেসেজ *</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="আপনার প্রশ্ন বা মতামতটি এখানে লিখুন..."
                    className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-black text-white text-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'}`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>মেসেজ পাঠান <FaPaperPlane /></>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info - Right Side (4 columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">যোগাযোগের তথ্য</h2>
              
              <div className="grid grid-cols-1 gap-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center gap-5 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm ${item.color}`}>
                      <item.icon />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{item.title}</p>
                      <p className="font-bold text-gray-800 text-lg leading-tight">{item.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-10 pt-8 border-t border-dashed border-gray-200">
                <p className="font-bold text-gray-800 mb-6 uppercase text-xs tracking-widest text-center">সোশ্যাল মিডিয়ায় যুক্ত হোন</p>
                <div className="flex justify-center gap-4">
                  {[
                    { icon: FaFacebook, link: '#', color: 'hover:bg-blue-600' },
                    { icon: FaInstagram, link: '#', color: 'hover:bg-pink-600' },
                    { icon: FaYoutube, link: '#', color: 'hover:bg-red-600' },
                    { icon: FaTwitter, link: '#', color: 'hover:bg-sky-500' }
                  ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.link} 
                      className={`w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 hover:text-white transition-all duration-300 ${social.color}`}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 overflow-hidden border border-gray-100">
              <div className="p-6 pb-0">
                <h2 className="text-lg font-bold text-gray-800 mb-4">আমাদের লোকেশন</h2>
              </div>
              <div className="relative h-64 w-full bg-gray-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.953388867!2d90.337288!3d23.7806207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd" 
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}