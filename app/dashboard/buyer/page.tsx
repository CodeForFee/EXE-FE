"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    UserCircleIcon,
    ShoppingBagIcon,
    HeartIcon,
    MapPinIcon,
    CreditCardIcon,
    BellIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    TruckIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    ChevronRightIcon,
    SparklesIcon,
    GiftIcon,
    TicketIcon,
    CalendarDaysIcon,
    ArrowPathIcon,
    // ChatBubbleLeftIcon,
    EyeIcon,
    ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";
import { StarIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { products as allProducts } from "@/lib/data/products";

// Mock Data
const menuItems = [
    { icon: UserCircleIcon, label: "Tài khoản", id: "account" },
    { icon: ShoppingBagIcon, label: "Đơn hàng", id: "orders", badge: 3 },
    { icon: HeartIcon, label: "Yêu thích", id: "wishlist", badge: 8 },
    { icon: MapPinIcon, label: "Địa chỉ", id: "addresses" },
    { icon: CreditCardIcon, label: "Thanh toán", id: "payment" },
    { icon: BellIcon, label: "Thông báo", id: "notifications", badge: 5 },
    { icon: Cog6ToothIcon, label: "Cài đặt", id: "settings" },
];

const stats = [
    { label: "Đơn hàng", value: 12, icon: ShoppingBagIcon, color: "from-blue-500 to-indigo-600", bg: "bg-blue-100", textColor: "text-blue-600" },
    { label: "Yêu thích", value: 8, icon: HeartIcon, color: "from-pink-500 to-rose-600", bg: "bg-rose-100", textColor: "text-rose-600" },
    { label: "Điểm thưởng", value: "2,450", icon: GiftIcon, color: "from-amber-500 to-orange-600", bg: "bg-amber-100", textColor: "text-amber-600" },
    { label: "Voucher", value: 3, icon: TicketIcon, color: "from-violet-500 to-purple-600", bg: "bg-violet-100", textColor: "text-violet-600" },
];

const recentOrders = [
    {
        id: "UH-2024001",
        date: "15/12/2024",
        status: "delivered",
        total: 1600000,
        items: [
            { title: allProducts[0].title, image: allProducts[0].image, qty: 1 },
        ],
    },
    {
        id: "UH-2024002",
        date: "18/12/2024",
        status: "shipping",
        total: 850000,
        items: [
            { title: allProducts[1].title, image: allProducts[1].image, qty: 1 },
        ],
    },
    {
        id: "UH-2024003",
        date: "18/12/2024",
        status: "pending",
        total: 350000,
        items: [
            { title: allProducts[2].title, image: allProducts[2].image, qty: 1 },
        ],
    },
];

const statusConfig = {
    pending: { label: "Chờ xác nhận", bg: "bg-amber-100", text: "text-amber-700", icon: ClockIcon, dot: "bg-amber-500" },
    shipping: { label: "Đang giao", bg: "bg-blue-100", text: "text-blue-700", icon: TruckIcon, dot: "bg-blue-500" },
    delivered: { label: "Đã giao", bg: "bg-green-100", text: "text-green-700", icon: CheckCircleIcon, dot: "bg-green-500" },
    cancelled: { label: "Đã hủy", bg: "bg-red-100", text: "text-red-700", icon: XCircleIcon, dot: "bg-red-500" },
};

const wishlistItems = allProducts.slice(4, 6).map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.image,
    rating: p.rating
}));

export default function BuyerDashboard() {
    const [activeTab, setActiveTab] = useState("account");

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Welcome Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-heading font-bold rounded-full flex items-center gap-1">
                                    <SparklesIcon className="w-3.5 h-3.5" />
                                    Thành viên Vàng
                                </span>
                            </div>
                            <h1 className="text-4xl font-heading font-extrabold text-heading tracking-tight">
                                Xin chào, Nguyễn Văn A! 👋
                            </h1>
                            <p className="text-muted font-body mt-2">Quản lý tài khoản và theo dõi đơn hàng của bạn</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link href="/products" passHref legacyBehavior>
                                <Button
                                    className="px-6 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-heading font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-200"
                                    radius="sm"
                                >
                                    <ShoppingBagIcon className="w-5 h-5" />
                                    Tiếp tục mua sắm
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8">
                        {/* Sidebar */}
                        <aside className="col-span-12 lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="sticky top-32 space-y-6"
                            >
                                {/* Profile Card */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-6 rounded-2xl text-white shadow-xl">
                                    {/* Decorative */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/40">
                                                <UserCircleIcon className="w-10 h-10 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-heading font-bold text-lg">Nguyễn Văn A</h3>
                                                <p className="text-sm text-green-200">nguyenvana@email.com</p>
                                            </div>
                                        </div>

                                        {/* Member Progress */}
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-heading font-medium flex items-center gap-2">
                                                    <StarIcon className="w-4 h-4 text-yellow-300" />
                                                    Thành viên Vàng
                                                </span>
                                                <span className="text-xs text-green-200">550/1000 điểm</span>
                                            </div>
                                            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                                                <div className="w-[55%] h-full bg-gradient-to-r from-yellow-300 to-amber-400 rounded-full" />
                                            </div>
                                            <p className="text-[11px] text-green-200 mt-2 flex items-center gap-1">
                                                <ArrowTrendingUpIcon className="w-3.5 h-3.5" />
                                                Còn 450 điểm nữa để lên Kim Cương
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu */}
                                <nav className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                    {menuItems.map((item, i) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center justify-between px-5 py-4 font-heading font-medium text-sm transition-all ${activeTab === item.id
                                                ? "bg-green-50 text-green-700 border-l-4 border-green-600"
                                                : "text-gray-600 hover:bg-gray-50 border-l-4 border-transparent"
                                                } ${i > 0 ? "border-t border-gray-100" : ""}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className={`w-5 h-5 ${activeTab === item.id ? "text-green-600" : "text-gray-400"}`} />
                                                {item.label}
                                            </div>
                                            {item.badge && (
                                                <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${activeTab === item.id ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"
                                                    }`}>
                                                    {item.badge}
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                    <button className="w-full flex items-center gap-3 px-5 py-4 font-heading font-medium text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-gray-100">
                                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                                        Đăng xuất
                                    </button>
                                </nav>
                            </motion.div>
                        </aside>

                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-9 space-y-8">
                            {/* Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.bg} ${stat.textColor} flex items-center justify-center shadow-sm mb-4`}>
                                            <stat.icon className="w-6 h-6" />
                                        </div>
                                        <span className="text-3xl font-heading font-extrabold text-heading">{stat.value}</span>
                                        <p className="text-sm text-muted font-body">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Recent Orders */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <ShoppingBagIcon className="w-5 h-5 text-blue-600" />
                                        <h2 className="font-heading font-bold text-heading">Đơn hàng gần đây</h2>
                                    </div>
                                    <Button
                                        variant="light"
                                        className="text-sm font-heading font-bold text-green-700 flex items-center gap-1"
                                        radius="sm"
                                    >
                                        Xem tất cả <ChevronRightIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="divide-y divide-gray-100">
                                    {recentOrders.map((order) => {
                                        const status = statusConfig[order.status as keyof typeof statusConfig];
                                        return (
                                            <div key={order.id} className="p-5 hover:bg-gray-50/50 transition-colors">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-14 h-14 bg-gray-100 rounded-xl overflow-hidden">
                                                            <img src={order.items[0].image} alt="" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-heading font-bold text-heading">#{order.id}</span>
                                                                <span className="text-xs text-muted flex items-center gap-1">
                                                                    <CalendarDaysIcon className="w-3.5 h-3.5" />
                                                                    {order.date}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-body">{order.items[0].title}</p>
                                                        </div>
                                                    </div>
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-heading font-semibold rounded-full ${status.bg} ${status.text}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        {order.status === "delivered" && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-xs font-heading font-semibold border-green-200 text-green-700 hover:bg-green-50"
                                                                radius="lg"
                                                            >
                                                                <StarIcon className="w-3.5 h-3.5 mr-1" />
                                                                Đánh giá
                                                            </Button>
                                                        )}
                                                        {order.status === "shipping" && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="text-xs font-heading font-semibold border-blue-200 text-blue-700 hover:bg-blue-50"
                                                                radius="lg"
                                                            >
                                                                <EyeIcon className="w-3.5 h-3.5 mr-1" />
                                                                Theo dõi
                                                            </Button>
                                                        )}
                                                        <Button
                                                            size="sm"
                                                            variant="light"
                                                            className="text-xs font-heading font-semibold text-gray-500"
                                                            radius="lg"
                                                        >
                                                            <ArrowPathIcon className="w-3.5 h-3.5 mr-1" />
                                                            Mua lại
                                                        </Button>
                                                    </div>
                                                    <span className="font-heading font-bold text-green-700">
                                                        {order.total.toLocaleString("vi-VN")}₫
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Wishlist Preview */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <HeartSolidIcon className="w-5 h-5 text-pink-500" />
                                        <h2 className="font-heading font-bold text-heading">Sản phẩm yêu thích</h2>
                                    </div>
                                    <Button
                                        variant="light"
                                        className="text-sm font-heading font-bold text-green-700 flex items-center gap-1"
                                        radius="sm"
                                    >
                                        Xem tất cả <ChevronRightIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                                    {wishlistItems.map((item) => (
                                        <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                                            <div className="w-20 h-20 bg-white rounded-xl overflow-hidden flex-shrink-0">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-heading font-semibold text-heading text-sm truncate mb-1">{item.title}</h4>
                                                <div className="flex items-center gap-1 text-xs text-muted mb-2">
                                                    <StarIcon className="w-3.5 h-3.5 text-amber-400" />
                                                    {item.rating}
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span className="font-heading font-bold text-green-700">{item.price.toLocaleString("vi-VN")}₫</span>
                                                    <Button
                                                        size="sm"
                                                        className="px-3 py-1 bg-green-600 text-white text-xs font-heading font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
                                                        radius="lg"
                                                    >
                                                        Mua ngay
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
