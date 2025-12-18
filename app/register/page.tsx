"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    UserPlusIcon,
    EnvelopeIcon,
    LockClosedIcon,
    PhoneIcon,
    UserIcon,
    GiftIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    ArrowPathIcon,
} from "@heroicons/react/24/outline";

export default function RegisterPage() {
    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4">
                    {/* Sử dụng grid 12 cột, điều chỉnh gap lớn hơn để thoáng trang */}
                    <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">

                        {/* Cột trái - Hình ảnh được mở rộng (col-span-7) */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="col-span-12 lg:col-span-7 hidden lg:block sticky top-32"
                        >
                            <div className="relative w-full aspect-[4/5] max-h-[800px] overflow-hidden group shadow-sm">
                                <img
                                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000"
                                    alt="Beautiful interior"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                />
                                {/* Overlay gradient để nổi bật text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-green-950/90 via-green-950/20 to-transparent" />

                                <div className="absolute bottom-12 left-12 right-12">
                                    <h3 className="text-4xl font-heading font-bold text-white mb-8 leading-tight tracking-tight">
                                        Tham gia cộng đồng <br /> 15,000+ sinh viên
                                    </h3>
                                    <ul className="space-y-5 text-white/90 font-body">
                                        <li className="flex items-center gap-4">
                                            <div className="p-2 bg-white/10 rounded-full">
                                                <GiftIcon className="w-5 h-5 text-green-400" />
                                            </div>
                                            <span className="text-lg">Ưu đãi độc quyền cho thành viên</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div className="p-2 bg-white/10 rounded-full">
                                                <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 text-green-400" />
                                            </div>
                                            <span className="text-lg">Tư vấn miễn phí từ chuyên gia</span>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div className="p-2 bg-white/10 rounded-full">
                                                <ArrowPathIcon className="w-5 h-5 text-green-400" />
                                            </div>
                                            <span className="text-lg">Hỗ trợ đổi trả dễ dàng</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* Cột phải - Form Đăng ký (col-span-5) */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="col-span-12 lg:col-span-5"
                        >
                            <div className="max-w-md mx-auto lg:ml-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <UserPlusIcon className="w-8 h-8 text-green-700" />
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold uppercase tracking-widest">
                                        Rất đầu ngay
                                    </span>
                                </div>
                                <h1 className="text-4xl font-heading font-extrabold text-heading leading-tight tracking-tighter mb-2">
                                    Tạo tài khoản
                                </h1>
                                <p className="text-body font-body mb-8">
                                    Đã có tài khoản?{" "}
                                    <Link href="/login" className="text-green-700 font-semibold hover:underline">
                                        Đăng nhập
                                    </Link>
                                </p>

                                <form className="space-y-5">
                                    {/* Grid Họ & Tên */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-heading font-bold text-muted tracking-widest uppercase flex items-center gap-2">
                                                <UserIcon className="w-4 h-4" /> Họ
                                            </label>
                                            <Input
                                                placeholder="Nguyễn"
                                                variant="bordered"
                                                classNames={{
                                                    inputWrapper: "border border-divider bg-card hover:border-green-700 focus-within:!border-green-700 h-12"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-heading font-bold text-muted tracking-widest uppercase">
                                                Tên
                                            </label>
                                            <Input
                                                placeholder="Văn A"
                                                variant="bordered"
                                                classNames={{
                                                    inputWrapper: "border border-divider bg-card hover:border-green-700 focus-within:!border-green-700 h-12"
                                                }}
                                                radius="none"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-heading font-bold text-muted tracking-widest uppercase flex items-center gap-2">
                                            <EnvelopeIcon className="w-4 h-4" /> Email
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="email@example.com"
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "border border-divider bg-card hover:border-green-700 focus-within:!border-green-700 h-12"
                                            }}
                                            radius="none"
                                        />
                                    </div>

                                    {/* Số điện thoại */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-heading font-bold text-muted tracking-widest uppercase flex items-center gap-2">
                                            <PhoneIcon className="w-4 h-4" /> Số điện thoại
                                        </label>
                                        <Input
                                            type="tel"
                                            placeholder="0123 456 789"
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "border border-divider bg-card hover:border-green-700 focus-within:!border-green-700 h-12"
                                            }}
                                            radius="none"
                                        />
                                    </div>

                                    {/* Mật khẩu */}
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-heading font-bold text-muted tracking-widest uppercase flex items-center gap-2">
                                            <LockClosedIcon className="w-4 h-4" /> Mật khẩu
                                        </label>
                                        <Input
                                            type="password"
                                            placeholder="Tối thiểu 8 ký tự"
                                            variant="bordered"
                                            classNames={{
                                                inputWrapper: "border border-divider bg-card hover:border-green-700 focus-within:!border-green-700 h-12"
                                            }}
                                            radius="none"
                                        />
                                    </div>

                                    {/* CHECKBOX NGANG HÀNG CHUẨN */}
                                    <div className="flex items-start pt-2">
                                        <label className="relative flex items-center cursor-pointer select-none mt-0.5">
                                            <input type="checkbox" className="sr-only peer" />
                                            <div className="w-5 h-5 border border-divider bg-white peer-checked:bg-green-800 peer-checked:border-green-800 transition-all flex items-center justify-center">
                                                <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </label>
                                        <span className="ml-3 text-sm text-body font-body leading-5">
                                            Tôi đồng ý với <Link href="/terms" className="text-green-700 font-medium hover:underline">Điều khoản sử dụng</Link> và <Link href="/privacy" className="text-green-700 font-medium hover:underline">Chính sách bảo mật</Link>
                                        </span>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-widest hover:bg-green-800 transition-all shadow-md"
                                        radius="none"
                                    >
                                        ĐĂNG KÝ NGAY
                                    </Button>
                                </form>

                                {/* Social Login */}
                                <div className="mt-8 pb-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-divider" />
                                        </div>
                                        <div className="relative flex justify-center text-[11px] uppercase tracking-widest">
                                            <span className="px-4 bg-main text-muted font-heading">hoặc đăng ký với</span>
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <Button
                                            variant="bordered"
                                            className="w-full py-6 border border-divider font-heading font-medium hover:bg-secondary flex items-center justify-center gap-3"
                                            radius="none"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                            Tiếp tục với Google
                                        </Button>
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