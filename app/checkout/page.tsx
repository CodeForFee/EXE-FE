"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Image, Input, Radio, RadioGroup } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    ChevronRightIcon,
    TruckIcon,
    ShieldCheckIcon,
    CreditCardIcon,
    BanknotesIcon,
    BuildingLibraryIcon,
    CheckCircleIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";

import { products as allProducts } from "@/lib/data/products";

const orderItems = [
    {
        id: allProducts[0].id,
        title: allProducts[0].title,
        price: allProducts[0].price,
        quantity: 1,
        image: allProducts[0].image,
    },
    {
        id: allProducts[2].id,
        title: allProducts[2].title,
        price: allProducts[2].price,
        quantity: 2,
        image: allProducts[2].image,
    },
];


export default function CheckoutPage() {
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [step, setStep] = useState(1);

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 0;
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
                        <ChevronRightIcon className="w-4 h-4" />
                        <Link href="/cart" className="hover:text-green-700 transition-colors">Giỏ hàng</Link>
                        <ChevronRightIcon className="w-4 h-4" />
                        <span className="text-heading font-semibold">Thanh toán</span>
                    </motion.nav>

                    {/* Progress Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-center gap-4 mb-12"
                    >
                        {["Thông tin", "Thanh toán", "Xác nhận"].map((label, i) => (
                            <div key={label} className="flex items-center gap-4">
                                <div className={`flex items-center gap-3 ${i + 1 <= step ? "text-green-700" : "text-muted"}`}>
                                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold ${i + 1 < step
                                        ? "bg-green-700 text-white"
                                        : i + 1 === step
                                            ? "bg-green-100 text-green-700 border-2 border-green-700"
                                            : "bg-secondary text-muted border border-divider"
                                        }`}>
                                        {i + 1 < step ? <CheckCircleIcon className="w-5 h-5" /> : i + 1}
                                    </span>
                                    <span className="font-heading font-medium hidden sm:inline">{label}</span>
                                </div>
                                {i < 2 && <div className="w-16 h-px bg-divider" />}
                            </div>
                        ))}
                    </motion.div>

                    <div className="grid grid-cols-12 gap-8 lg:gap-12">
                        {/* Form Section */}
                        <div className="col-span-12 lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-8"
                            >
                                {/* Shipping Info */}
                                <div className="bg-card border border-divider p-8">
                                    <h2 className="text-xl font-heading font-bold text-heading mb-6 flex items-center gap-3">
                                        <TruckIcon className="w-6 h-6 text-green-700" />
                                        Thông tin giao hàng
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-heading font-medium text-heading mb-2 block">
                                                Họ và tên *
                                            </label>
                                            <Input
                                                placeholder="Nguyễn Văn A"
                                                classNames={{
                                                    input: "font-body",
                                                    inputWrapper: "border border-divider bg-main hover:border-green-600/50"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-heading font-medium text-heading mb-2 block">
                                                Số điện thoại *
                                            </label>
                                            <Input
                                                placeholder="0901234567"
                                                classNames={{
                                                    input: "font-body",
                                                    inputWrapper: "border border-divider bg-main hover:border-green-600/50"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-heading font-medium text-heading mb-2 block">
                                                Email
                                            </label>
                                            <Input
                                                placeholder="email@example.com"
                                                type="email"
                                                classNames={{
                                                    input: "font-body",
                                                    inputWrapper: "border border-divider bg-main hover:border-green-600/50"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-heading font-medium text-heading mb-2 block">
                                                Địa chỉ giao hàng *
                                            </label>
                                            <Input
                                                placeholder="Số nhà, tên đường, phường/xã"
                                                classNames={{
                                                    input: "font-body",
                                                    inputWrapper: "border border-divider bg-main hover:border-green-600/50"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-heading font-medium text-heading mb-2 block">
                                                Quận/Huyện *
                                            </label>
                                            <Input
                                                placeholder="Chọn quận/huyện"
                                                classNames={{
                                                    input: "font-body",
                                                    inputWrapper: "border border-divider bg-main hover:border-green-600/50"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-sm font-heading font-medium text-heading mb-2 block">
                                                Tỉnh/Thành phố *
                                            </label>
                                            <Input
                                                placeholder="Chọn tỉnh/thành"
                                                classNames={{
                                                    input: "font-body",
                                                    inputWrapper: "border border-divider bg-main hover:border-green-600/50"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="text-sm font-heading font-medium text-heading mb-2 block">
                                                Ghi chú
                                            </label>
                                            <textarea
                                                placeholder="Ghi chú cho người giao hàng (tùy chọn)"
                                                rows={3}
                                                className="w-full px-4 py-3 border border-divider bg-main font-body text-sm resize-none focus:outline-none focus:border-green-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="bg-card border border-divider p-8">
                                    <h2 className="text-xl font-heading font-bold text-heading mb-6 flex items-center gap-3">
                                        <CreditCardIcon className="w-6 h-6 text-green-700" />
                                        Phương thức thanh toán
                                    </h2>
                                    <div className="space-y-3">
                                        {[
                                            { value: "cod", icon: BanknotesIcon, label: "Thanh toán khi nhận hàng (COD)", desc: "Miễn phí" },
                                            { value: "bank", icon: BuildingLibraryIcon, label: "Chuyển khoản ngân hàng", desc: "Giảm thêm 2%" },
                                            { value: "card", icon: CreditCardIcon, label: "Thẻ tín dụng/Ghi nợ", desc: "Visa, Mastercard, JCB" },
                                        ].map((method) => (
                                            <label
                                                key={method.value}
                                                className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${paymentMethod === method.value
                                                    ? "border-green-700 bg-green-50"
                                                    : "border-divider hover:border-green-600/50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="payment"
                                                    value={method.value}
                                                    checked={paymentMethod === method.value}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                    className="w-5 h-5 accent-green-700"
                                                />
                                                <method.icon className="w-6 h-6 text-green-700" />
                                                <div className="flex-1">
                                                    <span className="font-heading font-medium text-heading">{method.label}</span>
                                                    <span className="text-sm text-muted font-body ml-2">• {method.desc}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-span-12 lg:col-span-5">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="sticky top-32"
                            >
                                <div className="bg-secondary border border-divider p-8">
                                    <h2 className="text-xl font-heading font-bold text-heading mb-6">
                                        Đơn hàng của bạn
                                    </h2>

                                    {/* Items */}
                                    <div className="space-y-4 pb-6 border-b border-divider">
                                        {orderItems.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-16 h-16 bg-card overflow-hidden flex-shrink-0">
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        radius="none"
                                                        removeWrapper
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-heading font-medium text-heading text-sm truncate">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-sm text-muted">x{item.quantity}</p>
                                                </div>
                                                <span className="font-heading font-bold text-heading">
                                                    {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Totals */}
                                    <div className="space-y-3 py-6 border-b border-divider">
                                        <div className="flex justify-between text-body font-body">
                                            <span>Tạm tính</span>
                                            <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                                        </div>
                                        <div className="flex justify-between text-body font-body">
                                            <span>Phí vận chuyển</span>
                                            <span className="text-green-700 font-semibold">Miễn phí</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between py-6">
                                        <span className="text-lg font-heading font-bold text-heading">Tổng cộng</span>
                                        <span className="text-2xl font-heading font-extrabold text-green-700">
                                            {total.toLocaleString("vi-VN")}₫
                                        </span>
                                    </div>

                                    <Button
                                        className="w-full py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-wide hover:bg-green-700 transition-all flex items-center justify-center gap-2"
                                        radius="none"
                                    >
                                        <LockClosedIcon className="w-5 h-5" />
                                        ĐẶT HÀNG
                                    </Button>

                                    {/* Security Note */}
                                    <div className="mt-6 flex items-start gap-3 text-sm text-muted">
                                        <ShieldCheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <p className="font-body">
                                            Thông tin của bạn được bảo mật và mã hóa SSL 256-bit.
                                        </p>
                                    </div>
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
