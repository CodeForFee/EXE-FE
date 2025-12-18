"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/stores/useCartStore";
import {
    TrashIcon,
    MinusIcon,
    PlusIcon,
    ShoppingBagIcon,
    ArrowRightIcon,
    TruckIcon,
    ShieldCheckIcon,
    TagIcon,
} from "@heroicons/react/24/outline";

export default function CartPage() {
    const { items: cartItems, updateQuantity, removeItem, getSubtotal } = useCartStore();
    const [promoCode, setPromoCode] = useState("");
    const [isClient, setIsClient] = useState(false);

    // Ensure hydration matches server
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;

    const subtotal = getSubtotal();
    const savings = cartItems.reduce(
        (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity,
        0
    );
    const shipping = subtotal >= 500000 ? 0 : 30000;
    const total = subtotal + shipping;

    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-sm font-heading text-muted mb-10"
                    >
                        <Link href="/" className="hover:text-green-700 transition-colors">Trang chủ</Link>
                        <span className="text-divider">/</span>
                        <span className="text-heading font-semibold">Giỏ hàng</span>
                    </motion.nav>

                    {cartItems.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <ShoppingBagIcon className="w-24 h-24 text-gray-400 mb-6" />
                            <h2 className="text-3xl font-heading font-bold text-heading mb-4 text-center">Giỏ hàng trống</h2>
                            <p className="text-gray-500 font-body mb-8 text-center">Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
                            <Button
                                as={Link}
                                href="/products"
                                className="px-8 py-6 bg-green-900 text-cream font-heading font-bold"
                                radius="none"
                            >
                                KHÁM PHÁ SẢN PHẨM
                            </Button>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-12 gap-8 lg:gap-12">
                            {/* Cart Items */}
                            <div className="col-span-12 lg:col-span-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <h1 className="text-3xl font-heading font-bold text-heading">
                                            Giỏ hàng của bạn
                                        </h1>
                                        <span className="text-muted font-heading">
                                            {cartItems.length} sản phẩm
                                        </span>
                                    </div>

                                    <div className="space-y-6">
                                        {cartItems.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex gap-6 p-6 bg-card border border-divider group hover:border-green-600/30 transition-colors"
                                            >
                                                {/* Image */}
                                                <Link href={`/products/${item.id}`} className="flex-shrink-0">
                                                    <div className="w-28 h-28 overflow-hidden bg-secondary">
                                                        <Image
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                            radius="none"
                                                            removeWrapper
                                                        />
                                                    </div>
                                                </Link>

                                                {/* Details */}
                                                <div className="flex-1 flex flex-col">
                                                    <Link href={`/products/${item.id}`}>
                                                        <h3 className="font-heading font-bold text-heading hover:text-green-700 transition-colors">
                                                            {item.title}
                                                        </h3>
                                                    </Link>

                                                    <div className="flex items-baseline gap-2 mt-2">
                                                        <span className="text-lg font-heading font-bold text-green-700">
                                                            {item.price.toLocaleString("vi-VN")}₫
                                                        </span>
                                                        {item.originalPrice && (
                                                            <span className="text-sm text-muted line-through">
                                                                {item.originalPrice.toLocaleString("vi-VN")}₫
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between mt-auto pt-4">
                                                        {/* Quantity */}
                                                        <div className="flex items-center border border-divider">
                                                            <button
                                                                onClick={() => updateQuantity(item.id, -1)}
                                                                className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                                                            >
                                                                <MinusIcon className="w-4 h-4" />
                                                            </button>
                                                            <span className="w-12 h-10 flex items-center justify-center font-heading font-bold border-x border-divider">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => updateQuantity(item.id, 1)}
                                                                className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                                                            >
                                                                <PlusIcon className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        {/* Subtotal & Remove */}
                                                        <div className="flex items-center gap-6">
                                                            <span className="font-heading font-bold text-heading">
                                                                {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                                                            </span>
                                                            <button
                                                                onClick={() => removeItem(item.id)}
                                                                className="p-2 text-muted hover:text-terracotta transition-colors"
                                                            >
                                                                <TrashIcon className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Continue Shopping */}
                                    <div className="mt-8 pt-8 border-t border-divider">
                                        <Link
                                            href="/products"
                                            className="inline-flex items-center gap-2 font-heading font-bold text-green-700 hover:text-green-600 transition-colors"
                                        >
                                            ← Tiếp tục mua sắm
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Order Summary */}
                            <div className="col-span-12 lg:col-span-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="sticky top-32"
                                >
                                    <div className="bg-secondary border border-divider p-8">
                                        <h2 className="text-xl font-heading font-bold text-heading mb-6">
                                            Tóm tắt đơn hàng
                                        </h2>

                                        {/* Promo Code */}
                                        <div className="mb-6">
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={promoCode}
                                                    onChange={(e) => setPromoCode(e.target.value)}
                                                    placeholder="Mã giảm giá"
                                                    className="flex-1 px-4 py-3 border border-divider bg-card font-body text-sm focus:outline-none focus:border-green-600"
                                                />
                                                <button className="px-4 py-3 bg-heading text-inverse font-heading font-bold text-sm hover:bg-green-700 transition-colors">
                                                    ÁP DỤNG
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pb-6 border-b border-divider">
                                            <div className="flex justify-between text-body font-body">
                                                <span>Tạm tính</span>
                                                <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                                            </div>
                                            {savings > 0 && (
                                                <div className="flex justify-between text-green-700 font-heading font-medium">
                                                    <span className="flex items-center gap-2">
                                                        <TagIcon className="w-4 h-4" />
                                                        Tiết kiệm
                                                    </span>
                                                    <span>-{savings.toLocaleString("vi-VN")}₫</span>
                                                </div>
                                            )}
                                            <div className="flex justify-between text-body font-body">
                                                <span>Phí vận chuyển</span>
                                                <span className={shipping === 0 ? "text-green-700 font-semibold" : ""}>
                                                    {shipping === 0 ? "Miễn phí" : `${shipping.toLocaleString("vi-VN")}₫`}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex justify-between py-6 border-b border-divider">
                                            <span className="text-lg font-heading font-bold text-heading">Tổng cộng</span>
                                            <span className="text-2xl font-heading font-extrabold text-green-700">
                                                {total.toLocaleString("vi-VN")}₫
                                            </span>
                                        </div>

                                        <Button
                                            as={Link}
                                            href="/checkout"
                                            className="w-full mt-6 py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-wide hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                            radius="none"
                                        >
                                            TIẾN HÀNH THANH TOÁN
                                            <ArrowRightIcon className="w-5 h-5" />
                                        </Button>

                                        {/* Trust Badges */}
                                        <div className="mt-6 pt-6 border-t border-divider space-y-3">
                                            <div className="flex items-center gap-3 text-sm font-heading text-muted">
                                                <TruckIcon className="w-5 h-5 text-green-600" />
                                                <span>Miễn phí ship đơn từ 500K</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm font-heading text-muted">
                                                <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                                                <span>Thanh toán an toàn 100%</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
