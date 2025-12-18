"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Skeleton, StatsCardSkeleton, TableRowSkeleton } from "@/components/ui/Skeleton";
import {
    UserCircleIcon,
    CubeIcon,
    ClipboardDocumentListIcon,
    ChartBarIcon,
    BanknotesIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
    ArrowRightOnRectangleIcon,
    PlusIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    EyeIcon,
    PencilSquareIcon,
    TrashIcon,
    CheckBadgeIcon,
    SparklesIcon,
    FireIcon,
    BellAlertIcon,
    CalendarDaysIcon,
    ArrowPathIcon,
    EllipsisHorizontalIcon,
    ChevronRightIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const menuItems = [
    { icon: ChartBarIcon, label: "Dashboard", id: "dashboard" },
    { icon: CubeIcon, label: "Sản phẩm", id: "products", badge: 24 },
    { icon: ClipboardDocumentListIcon, label: "Đơn hàng", id: "orders", badge: 5 },
    { icon: BanknotesIcon, label: "Doanh thu", id: "revenue" },
    { icon: ChatBubbleLeftRightIcon, label: "Tin nhắn", id: "messages", badge: 3 },
    { icon: Cog6ToothIcon, label: "Cài đặt", id: "settings" },
];

const stats = [
    { label: "Doanh thu tháng", value: "12.5M", subValue: "₫", change: "+15%", up: true, icon: BanknotesIcon, color: "from-emerald-500 to-green-600" },
    { label: "Đơn hàng mới", value: "48", subValue: "đơn", change: "+8%", up: true, icon: ClipboardDocumentListIcon, color: "from-blue-500 to-indigo-600" },
    { label: "Sản phẩm đang bán", value: "24", subValue: "sản phẩm", change: "+2", up: true, icon: CubeIcon, color: "from-violet-500 to-purple-600" },
    { label: "Lượt xem hôm nay", value: "1.2K", subValue: "views", change: "-5%", up: false, icon: EyeIcon, color: "from-amber-500 to-orange-600" },
];

import { products as allProducts } from "@/lib/data/products";

const products = allProducts.slice(0, 4).map((p, i) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    stock: [15, 8, 0, 5][i] || 10,
    sold: [48, 32, 89, 21][i] || 15,
    rating: p.rating,
    image: p.image,
    status: i === 2 ? "out_of_stock" : "active",
    trend: i === 0 ? "hot" : i === 2 ? "bestseller" : null,
}));


const recentOrders = [
    { id: "UH-001", customer: "Nguyễn Văn A", avatar: "N", total: 1250000, status: "pending", time: "5 phút trước", items: 1 },
    { id: "UH-002", customer: "Trần Thị B", avatar: "T", total: 850000, status: "confirmed", time: "15 phút trước", items: 2 },
    { id: "UH-003", customer: "Lê Văn C", avatar: "L", total: 2100000, status: "shipping", time: "1 giờ trước", items: 3 },
    { id: "UH-004", customer: "Phạm Đức D", avatar: "P", total: 450000, status: "delivered", time: "2 giờ trước", items: 1 },
];

const statusConfig = {
    pending: { label: "Chờ xác nhận", bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
    confirmed: { label: "Đã xác nhận", bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
    shipping: { label: "Đang giao", bg: "bg-indigo-100", text: "text-indigo-700", dot: "bg-indigo-500" },
    delivered: { label: "Đã giao", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
};

export default function SellerDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-main">
                <Header />
                <main className="flex-grow pt-32 pb-20">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Sidebar Skeleton */}
                            <aside className="w-full lg:w-64 space-y-2">
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <Skeleton key={i} className="h-12 w-full" />
                                ))}
                            </aside>

                            {/* Main Content Skeleton */}
                            <div className="flex-1 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <StatsCardSkeleton key={i} />
                                    ))}
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                    <div className="lg:col-span-2 space-y-4">
                                        <Skeleton className="h-8 w-48" />
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <TableRowSkeleton key={i} columns={6} />
                                        ))}
                                    </div>
                                    <div className="space-y-4">
                                        <Skeleton className="h-8 w-48" />
                                        {Array.from({ length: 3 }).map((_, i) => (
                                            <div key={i} className="flex gap-4 items-center">
                                                <Skeleton className="w-12 h-12 rounded-full" />
                                                <div className="space-y-2 flex-1">
                                                    <Skeleton className="h-4 w-full" />
                                                    <Skeleton className="h-3 w-2/3" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

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
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-heading font-bold rounded-full flex items-center gap-1">
                                    <SparklesIcon className="w-3.5 h-3.5" />
                                    Seller Pro
                                </span>
                            </div>
                            <h1 className="text-4xl font-heading font-extrabold text-heading tracking-tight">
                                Xin chào, UniHome Store! 👋
                            </h1>
                            <p className="text-muted font-body mt-2">Đây là tổng quan hoạt động của cửa hàng hôm nay</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="bordered"
                                className="px-5 py-5 border-2 border-divider text-heading font-heading font-bold text-sm flex items-center gap-2 hover:border-green-600 transition-colors"
                                radius="sm"
                            >
                                <CalendarDaysIcon className="w-5 h-5" />
                                Tháng 12, 2024
                            </Button>
                            <Button
                                className="px-6 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-heading font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-200"
                                radius="sm"
                            >
                                <PlusIcon className="w-5 h-5" />
                                Thêm sản phẩm
                            </Button>
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
                                {/* Shop Card */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-green-700 to-emerald-800 p-6 rounded-2xl text-white shadow-xl">
                                    {/* Decorative circles */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                                    <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full" />

                                    <div className="relative">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                                                <span className="text-2xl font-heading font-bold">U</span>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-heading font-bold text-lg">UniHome Store</h3>
                                                    <CheckBadgeIcon className="w-5 h-5 text-green-300" />
                                                </div>
                                                <p className="text-sm text-green-200">Xác thực từ 2024</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                            <div className="text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <span className="text-xl font-heading font-bold">4.9</span>
                                                    <StarIcon className="w-4 h-4 text-yellow-300" />
                                                </div>
                                                <p className="text-[10px] text-green-200 uppercase tracking-wider">Đánh giá</p>
                                            </div>
                                            <div className="text-center border-x border-white/20">
                                                <span className="text-xl font-heading font-bold">169</span>
                                                <p className="text-[10px] text-green-200 uppercase tracking-wider">Đã bán</p>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-xl font-heading font-bold">98%</span>
                                                <p className="text-[10px] text-green-200 uppercase tracking-wider">Phản hồi</p>
                                            </div>
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

                                {/* Quick Actions */}
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <BellAlertIcon className="w-5 h-5 text-amber-600" />
                                        <span className="font-heading font-bold text-amber-800 text-sm">Cần xử lý</span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-700">Đơn chờ xác nhận</span>
                                            <span className="font-heading font-bold text-amber-800">5</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-amber-700">Sản phẩm hết hàng</span>
                                            <span className="font-heading font-bold text-amber-800">1</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </aside>

                        {/* Main Content */}
                        <div className="col-span-12 lg:col-span-9 space-y-8">
                            {/* Stats Grid */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5"
                            >
                                {stats.map((stat, i) => (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05 }}
                                        className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                                                <stat.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <span className={`text-xs font-heading font-bold flex items-center gap-1 px-2 py-1 rounded-full ${stat.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                                                }`}>
                                                {stat.up ? <ArrowTrendingUpIcon className="w-3.5 h-3.5" /> : <ArrowTrendingDownIcon className="w-3.5 h-3.5" />}
                                                {stat.change}
                                            </span>
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-heading font-extrabold text-heading">{stat.value}</span>
                                            <span className="text-sm text-muted font-body">{stat.subValue}</span>
                                        </div>
                                        <p className="text-sm text-muted font-body mt-1">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>

                            <div className="grid grid-cols-12 gap-6">
                                {/* Products Table */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="col-span-12 xl:col-span-7 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <CubeIcon className="w-5 h-5 text-green-600" />
                                            <h2 className="font-heading font-bold text-heading">Sản phẩm của bạn</h2>
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
                                        {products.map((product) => (
                                            <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50/50 transition-colors group">
                                                <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                    <Image src={product.image} alt={product.title} className="w-full h-full object-cover" radius="none" removeWrapper />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="font-heading font-semibold text-heading text-sm truncate">{product.title}</h4>
                                                        {product.trend === "hot" && (
                                                            <span className="px-1.5 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded flex items-center gap-0.5">
                                                                <FireIcon className="w-3 h-3" /> Hot
                                                            </span>
                                                        )}
                                                        {product.trend === "bestseller" && (
                                                            <span className="px-1.5 py-0.5 bg-purple-100 text-purple-600 text-[10px] font-bold rounded flex items-center gap-0.5">
                                                                <StarIcon className="w-3 h-3" /> Best
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs text-muted">
                                                        <span className="flex items-center gap-1">
                                                            <StarIcon className="w-3.5 h-3.5 text-amber-400" />
                                                            {product.rating}
                                                        </span>
                                                        <span>Đã bán: {product.sold}</span>
                                                        <span className={product.stock === 0 ? "text-red-500 font-semibold flex items-center gap-1" : ""}>
                                                            {product.stock === 0 && <ExclamationTriangleIcon className="w-3.5 h-3.5" />}
                                                            Kho: {product.stock}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span className="font-heading font-bold text-green-700 text-sm">{product.price.toLocaleString("vi-VN")}₫</span>
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                                        <PencilSquareIcon className="w-4 h-4 text-gray-500" />
                                                    </button>
                                                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                                        <TrashIcon className="w-4 h-4 text-red-400" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Recent Orders */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="col-span-12 xl:col-span-5 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                                >
                                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <ClipboardDocumentListIcon className="w-5 h-5 text-blue-600" />
                                            <h2 className="font-heading font-bold text-heading">Đơn hàng mới</h2>
                                        </div>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <ArrowPathIcon className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                    <div className="divide-y divide-gray-100">
                                        {recentOrders.map((order) => {
                                            const status = statusConfig[order.status as keyof typeof statusConfig];
                                            return (
                                                <div key={order.id} className="p-4 hover:bg-gray-50/50 transition-colors">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center font-heading font-bold text-green-700 text-sm">
                                                                {order.avatar}
                                                            </div>
                                                            <div>
                                                                <span className="font-heading font-semibold text-heading text-sm">{order.customer}</span>
                                                                <p className="text-[11px] text-muted">#{order.id} • {order.items} sản phẩm</p>
                                                            </div>
                                                        </div>
                                                        <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                                                            <EllipsisHorizontalIcon className="w-4 h-4 text-gray-400" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-heading font-semibold rounded-full ${status.bg} ${status.text}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                                            {status.label}
                                                        </span>
                                                        <div className="text-right">
                                                            <span className="font-heading font-bold text-heading text-sm">
                                                                {order.total.toLocaleString("vi-VN")}₫
                                                            </span>
                                                            <p className="text-[10px] text-muted">{order.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="p-4 border-t border-gray-100">
                                        <Button
                                            variant="bordered"
                                            className="w-full py-5 border-2 border-dashed border-gray-200 text-gray-500 font-heading font-semibold text-sm hover:border-green-300 hover:text-green-600 transition-colors"
                                            radius="lg"
                                        >
                                            Xem tất cả đơn hàng
                                        </Button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
