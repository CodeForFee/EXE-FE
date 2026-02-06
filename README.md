# UNIHOME - Nội thất cho sinh viên

Nền tảng mua bán nội thất giá rẻ, phù hợp túi tiền cho sinh viên và người mới đi làm.

## 🚀 Công nghệ sử dụng

- **Framework**: Next.js 16 (App Router)
- **UI**: Custom React components + Tailwind CSS 4
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Language**: TypeScript
- **Theme Management**: next-themes

## 📁 Cấu trúc dự án

```
unihome/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout với Providers
│   ├── page.tsx           # Trang chủ
│   └── globals.css        # Global styles và CSS variables
├── components/            # React components
│   ├── layout/           # Layout components (Header, Footer)
│   └── ui/               # UI components (ProductCard, HeroSection, etc.)
├── lib/                  # Library code
│   ├── providers.tsx     # App providers (React Query, Theme, v.v.)
│   └── constants.ts      # App constants
├── types/                # TypeScript type definitions
│   └── index.ts         # Shared types
├── utils/               # Utility functions
│   ├── format.ts        # Formatting utilities
│   └── constants.ts     # Constants
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind CSS configuration với custom theme
```

## 🎨 Design System

### Màu sắc (từ req.md)

- **Brand Green**: #08A045 (primary), #0B6E4F, #073B3A
- **Background**: #F5F1E8 (main), #EFE6D8 (secondary), #FFFFFF (card)
- **Wood/Material**: #D2B48C (light), #B08968 (medium), #6B4F3F (dark)
- **Typography**: #2E2E2E (heading), #4A4A4A (body), #7A7A7A (muted)

### Components

Các components UI được xây dựng thủ công trên nền Tailwind, tối ưu cho brand UNIHOME.

## 🛠️ Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build

# Chạy production server
npm start
```

## 📝 Tính năng chính

- ✅ Trang chủ với hero section và featured products
- ✅ Navigation header responsive với cart icon
- ✅ Footer với links và thông tin
- ✅ Product cards với rating và pricing
- ✅ Feature sections
- ✅ Theme configuration với màu sắc brand
- ✅ Responsive design
- ✅ Trang sản phẩm chi tiết (`/products/[id]`)
- ✅ Trang danh sách sản phẩm với filter (`/products`)
- ✅ Trang combo tiết kiệm (`/combos`)
- ✅ Chat box (ChatBot widget)
- ✅ Authentication (Login/Register)
- ✅ Giỏ hàng (`/cart`)
- ✅ Thanh toán (`/checkout`)
- ✅ Dashboard người mua (`/dashboard/buyer`)
- ✅ Dashboard người bán (`/dashboard/seller`)
- ✅ Đổi trả (`/returns`)
- ✅ Feedback và reviews (`/reviews`)
- ✅ Trang cộng đồng (`/community`)
- ✅ Trang về chúng tôi (`/about`)

## 🔜 Tính năng có thể mở rộng

- [ ] Authentication thực với API
- [ ] Tích hợp thanh toán VNPay/MoMo
- [ ] Push notifications
- [ ] Real-time chat
- [ ] Image upload cho đánh giá

## 📚 Tài liệu tham khảo

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)

## 📄 License

Private project
