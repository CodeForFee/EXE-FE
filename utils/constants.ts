// Navigation menu items
export const NAVIGATION_ITEMS = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/products" },
  { name: "Combo tiết kiệm", href: "/combos" },
  { name: "Đổi trả", href: "/exchange" },
  { name: "Cộng đồng", href: "/community" },
  { name: "Về chúng tôi", href: "/about" },
] as const;

// Product categories
export const PRODUCT_CATEGORIES = [
  { id: "furniture", name: "Nội thất", icon: "🪑" },
  { id: "desk", name: "Bàn học", icon: "📚" },
  { id: "chair", name: "Ghế", icon: "🪑" },
  { id: "storage", name: "Kệ/Tủ", icon: "📦" },
  { id: "lighting", name: "Đèn", icon: "💡" },
  { id: "decoration", name: "Trang trí", icon: "🎨" },
  { id: "bedding", name: "Chăn ga gối", icon: "🛏️" },
  { id: "kitchen", name: "Đồ dùng bếp", icon: "🍳" },
] as const;

// Product conditions
export const PRODUCT_CONDITIONS = [
  { value: "new", label: "Mới", color: "success" },
  { value: "like-new", label: "Như mới", color: "primary" },
  { value: "used", label: "Đã sử dụng", color: "warning" },
  { value: "refurbished", label: "Đã tân trang", color: "default" },
] as const;

// Order statuses
export const ORDER_STATUSES = [
  { value: "pending", label: "Chờ xác nhận", color: "warning" },
  { value: "confirmed", label: "Đã xác nhận", color: "primary" },
  { value: "shipping", label: "Đang giao", color: "info" },
  { value: "delivered", label: "Đã giao", color: "success" },
  { value: "cancelled", label: "Đã hủy", color: "danger" },
] as const;

