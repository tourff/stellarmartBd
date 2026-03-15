'use client';

import { usePathname } from 'next/navigation';\nimport Navbar from './Navbar';\nimport CategoryMenu from './CategoryMenu';\nimport Footer from './Footer';\nimport { CategoryProvider } from '../context/CategoryContext';\n\nexport default function UserLayoutWrapper({ children }) {\n  const pathname = usePathname();\n  \n  // Check if we're on an admin route (including /admin/login and /admin-login)\n  const isAdminRoute = pathname?.startsWith('/admin') || pathname?.startsWith('/admin-login');\n  \n  return (\n    <>\n      {isAdminRoute ? (\n        children\n      ) : (\n        <CategoryProvider>\n          <Navbar />\n          <CategoryMenu />\n          {children}\n          <Footer />\n        </CategoryProvider>\n      )}\n    </>\n  );\n}

