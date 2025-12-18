// API endpoints
export const API_ENDPOINTS = {
  products: "/api/products",
  combos: "/api/combos",
  users: "/api/users",
  orders: "/api/orders",
  reviews: "/api/reviews",
  chat: "/api/chat",
} as const;

// App configuration
export const APP_CONFIG = {
  name: "UNIHOME",
  description: "Nền tảng mua bán nội thất giá rẻ cho sinh viên",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
} as const;

// Pagination
export const PAGINATION = {
  defaultPageSize: 12,
  maxPageSize: 100,
} as const;

