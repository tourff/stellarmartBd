# StellarMartBD - E-commerce Platform

A full-featured multi-category e-commerce platform built with Next.js 14, MongoDB Atlas, and deployed on Vercel.

## Features

### Public Website
- ✅ Dynamic homepage with featured products
- ✅ Multi-category support with nested categories
- ✅ Dynamic routes: `/category/[slug]`, `/product/[slug]`
- ✅ Advanced search and filtering
- ✅ SEO optimized with dynamic metadata
- ✅ Fully responsive design
- ✅ Dark/Light mode support

### Admin Panel (25+ Modules)
- ✅ Dashboard with analytics
- ✅ User Management (CRUD, roles, ban/unban)
- ✅ Category Management (nested categories)
- ✅ Product/Item Management (stock, featured, SEO)
- ✅ Banner & Slider Manager
- ✅ Order Management
- ✅ Page Management (CMS)
- ✅ Contact Messages
- ✅ Tags Management
- ✅ Notifications
- ✅ System Settings
- ✅ Reports & Analytics
- ✅ Security Settings
- ✅ Theme Settings
- ✅ API Management
- ✅ Backup & Database
- ✅ Email Settings
- ✅ Activity Logs
- ✅ FAQ Manager
- ✅ Marketing Tools (Coupons, Promo &)

### Authentication Roles
- ✅ JWT-based authentication
- ✅ Role-based access control
- ✅ Roles: Super Admin, Admin, Moderator, Editor, Vendor, Customer

## Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router)
- **Database**: MongoDB Atlas (Mongoose ODM)
- **Authentication**: JWT
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod
- **Deployment**: Vercel

## Getting Started

### 1. Clone the Repository

```
bash
git clone https://github.com/your-username/stellarmartbd.git
cd stellarmartbd
```

### 2. Install Dependencies

```
bash
npm install
```

### 3. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier)
3. Create a database user
4. Get your connection string
5. Whitelist your IP address (0.0.0.0 for development)

### 4. Environment Variables

Create a `.env.local` file in the root directory:

```
env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/stellarmartbd?retryWrites=true&w=majority

# JWT Secret Key
JWT_SECRET=stellarmartbd_secret_key_2024_change_this
JWT_EXPIRE=7d

# Frontend URL
NEXT_PUBLIC_URL=http://localhost:3000
```

### 5. Run the Development Server

```
bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Create Admin User

Visit: `http://localhost:3000/api/seed`

Or use the register page and manually set the role to 'admin' in MongoDB.

**Default Admin Credentials:**
- Email: admin@stellarmartbd.com
- Password: turjo0424

## Vercel Deployment

### 1. Push to GitHub

```
bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/stellarmartbd.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure Environment Variables:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=generate_a_secure_random_string
JWT_EXPIRE=7d
NEXT_PUBLIC_URL=https://your-app.vercel.app
```

6. Click "Deploy"

### 3. Database Setup on Production

After deployment, visit:
`https://your-app.vercel.app/api/seed`

This will create the admin user in your MongoDB Atlas database.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/         # Authentication APIs
│   │   ├── products/     # Product APIs
│   │   ├── categories/  # Category APIs
│   │   └── banners/      # Banner APIs
│   ├── admin/            # Admin Panel Pages
│   │   ├── categories/  # Category Management
│   │   ├── products/    # Product Management
│   │   └── users/       # User Management
│   ├── login/           # Login Page
│   ├── register/        # Register Page
│   └── page.jsx         # Homepage
├── models/              # MongoDB Models
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   └── Banner.js
├── lib/                 # Utility Functions
│   └── db.js           # MongoDB Connection
├── middleware.js        # Next.js Middleware
└── package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters)
- `POST /api/products` - Create product (admin)
- `GET /api/products/[id]` - Get single product
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `GET /api/categories/[slug]` - Get category by slug
- `PUT /api/categories/[id]` - Update category (admin)
- `DELETE /api/categories/[id]` - Delete category (admin)

### Banners
- `GET /api/banners` - Get all banners
- `POST /api/banners` - Create banner (admin)

## License

MIT License
