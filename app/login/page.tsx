"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRightEndOnRectangleIcon,
    EnvelopeIcon,
    LockClosedIcon,
} from "@heroicons/react/24/outline";

export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-12 gap-12 items-center min-h-[60vh]">
                        {/* Cột trái - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="col-span-12 lg:col-span-5"
                        >
                            <div className="max-w-md mx-auto lg:ml-0">
                                <ArrowRightEndOnRectangleIcon className="w-10 h-10 text-green-700 mb-6" />
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">
                                    Chào mừng trở lại
                                </span>
                                <h1 className="text-4xl font-heading font-extrabold text-heading mb-2 tracking-tighter">
                                    Đăng nhập
                                </h1>
                                <p className="text-body font-body mb-8">
                                    Chưa có tài khoản?{" "}
                                    <Link href="/register" className="text-green-700 font-semibold hover:underline">
                                        Đăng ký ngay
                                    </Link>
                                </p>

                                <form className="space-y-6">
                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-heading font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                                            <EnvelopeIcon className="w-4 h-4" /> Email
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "border border-divider bg-card hover:border-green-700 focus-within:!border-green-700 h-14"
                                            }}
                                            radius="none"
                                        />
                                    </div>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-heading font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                                            <LockClosedIcon className="w-4 h-4" /> Mật khẩu
                                        </label>
                                        <Input
                                            type="password"
                                            placeholder="••••••••"
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "border border-divider bg-card hover:border-green-700 focus-within:!border-green-700 h-14"
                                            }}
                                            radius="none"
                                        />
                                    </div>

                                    {/* Custom Checkbox fix dính chữ */}
                                    {/* Phần Checkbox Ghi nhớ đăng nhập trong LoginPage */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center group">
                                            <label className="relative flex items-center cursor-pointer select-none">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-5 h-5 border border-divider bg-white peer-checked:bg-green-800 peer-checked:border-green-800 transition-all flex items-center justify-center">
                                                    <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </label>
                                            {/* leading-5 giúp chữ "Ghi nhớ..." cao bằng ô vuông 20px */}
                                            <span className="ml-3 text-sm text-body font-body leading-5">
                                                Ghi nhớ đăng nhập
                                            </span>
                                        </div>

                                        <Link href="/forgot-password" className="text-sm text-green-700 font-medium hover:underline">
                                            Quên mật khẩu?
                                        </Link>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-widest hover:bg-green-800 transition-all"
                                        radius="none"
                                    >
                                        ĐĂNG NHẬP
                                    </Button>
                                </form>

                                {/* Social Login */}
                                <div className="mt-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-divider" />
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase tracking-widest">
                                            <span className="px-4 bg-main text-muted font-heading">hoặc đăng nhập với</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Button
                                            variant="bordered"
                                            className="w-full py-6 border border-divider font-heading font-medium hover:bg-secondary flex items-center justify-center gap-3"
                                            radius="none"
                                        >
                                            {/* Giữ nguyên Logo Google SVG của bạn */}
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path
                                                    fill="currentColor"
                                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                                />
                                                <path
                                                    fill="currentColor"
                                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                                />
                                            </svg>
                                            Tiếp tục với Google
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Cột phải - Hình ảnh */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="col-span-12 lg:col-span-7 hidden lg:block self-stretch"
                        >
                            <div className="relative h-full min-h-[600px] overflow-hidden group">
                                <img
                                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000"
                                    alt="Beautiful interior"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <blockquote className="text-cream italic text-2xl leading-relaxed mb-6">
                                        "UNIHOME giúp mình trang trí phòng trọ đẹp mà không tốn kém. Thích nhất là đội ngũ tư vấn rất nhiệt tình!"
                                    </blockquote>
                                    <div className="flex items-center gap-4 text-cream/80">
                                        <div className="h-[1px] w-8 bg-cream/50"></div>
                                        <cite className="font-heading text-sm tracking-widest uppercase not-italic">
                                            Minh Anh, Sinh viên ĐH Bách Khoa
                                        </cite>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}