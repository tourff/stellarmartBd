# 🌟 StellarMart BD - E-Commerce Platform

A complete, modern e-commerce platform built with **Next.js**, **Node.js/Express**, and **MySQL**. Designed for single vendor with multiple categories and a powerful admin panel.

## 📋 Features

### 👥 Customer Features
- ✅ Home Page with Slider, Featured Products, Categories
- ✅ Browse Products by Category & Subcategory
- ✅ Advanced Product Filtering & Sorting
- ✅ Product Details with Images, Variations, Reviews
- ✅ Shopping Cart Management
- ✅ Secure Checkout & Payment Integration
- ✅ Order Tracking & History
- ✅ Wishlist Management
- ✅ User Dashboard & Profile
- ✅ Reviews & Ratings System

### 🔧 Admin Features
- ✅ Dashboard with Sales Analytics & Reports
- ✅ Product Management (Add/Edit/Delete)
- ✅ Category & Subcategory Management
- ✅ Order Management & Status Updates
- ✅ Customer Management
- ✅ Coupon & Offer Management
- ✅ Inventory & Stock Tracking
- ✅ Payment & Shipping Configuration
- ✅ Newsletter Management
- ✅ Activity Logs & Admin Users
- ✅ Website Settings & SEO Management
- ✅ And 25+ more admin features!

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js, React, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Authentication** | JWT |
| **Deployment** | XAMPP (Local), AWS/Heroku (Production) |

## 📁 Project Structure

```
stellarmartBd/
├── frontend/          # Next.js Frontend
├── backend/           # Node.js + Express Backend
├── database/          # MySQL Schemas
├── docs/              # Documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MySQL (XAMPP)
- npm or yarn

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/tourff/stellarmartBd.git
cd stellarmartBd
```

2. **Frontend Setup**
```bash
cd frontend
npm install
npm run dev
# Visit http://localhost:3000
```

3. **Backend Setup**
```bash
cd ../backend
npm install
npm run dev
# Server runs on http://localhost:5000
```

4. **Database Setup**
```bash
# Import database/schema.sql into MySQL using XAMPP PhpMyAdmin
```

## 📚 Documentation

- [Setup Guide](./docs/SETUP_GUIDE.md)
- [API Documentation](./docs/API_DOCUMENTATION.md)
- [Database Schema](./docs/DATABASE_SCHEMA.md)
- [Features List](./docs/FEATURES.md)

## 📊 Database Tables

- `users` - Customer accounts
- `products` - Product listings
- `categories` - Product categories
- `orders` - Customer orders
- `order_items` - Order line items
- `coupons` - Discount coupons
- `reviews` - Product reviews
- `admin_users` - Admin accounts
- `inventory` - Stock tracking
- `activity_logs` - Admin actions

## 🔐 Environment Variables

Create `.env` files in both frontend and backend directories. See `.env.example` for reference.

## 📈 Development Roadmap

- [x] Project Setup
- [x] Database Schema Design
- [ ] Backend API Development
- [ ] Frontend UI Development
- [ ] Integration Testing
- [ ] Admin Panel
- [ ] Deployment Setup

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT License - See [LICENSE](./LICENSE) file.

## 👨‍💻 Author

- **Tourff** (@tourff)

## 📞 Support

For issues, questions, or suggestions, please create a [GitHub Issue](https://github.com/tourff/stellarmartBd/issues).

---

**Made with ❤️ for StellarMart BD**
