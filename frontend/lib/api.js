// lib/api.js
const BASE_URL = 'http://localhost:5000/api';

// Products
export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`, { cache: 'no-store' });
  return res.json();
};

export const getFeaturedProducts = async () => {
  const res = await fetch(`${BASE_URL}/products?featured=true`, { cache: 'no-store' });
  return res.json();
};

export const getProductBySlug = async (slug) => {
  const res = await fetch(`${BASE_URL}/products/${slug}`, { cache: 'no-store' });
  return res.json();
};

// Categories
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`, { cache: 'no-store' });
  return res.json();
};

// Banners
export const getBanners = async () => {
  const res = await fetch(`${BASE_URL}/banners`, { cache: 'no-store' });
  return res.json();
};

// Auth
export const login = async (credentials) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  return res.json();
};
