"use client";

import { motion } from "framer-motion";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import { ArrowDownIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

import { products as allProducts } from "@/lib/data/products";

export default function HomeHero() {
    const featuredProduct = allProducts[0];
    const displayPrice = (featuredProduct.price / 1000).toLocaleString("vi-VN") + "k";

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-[#073B3A]">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000"
                    alt="Hero background"
                    className="w-full h-full object-cover opacity-40 scale-105"
                    radius="none"
                    removeWrapper
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-950 via-green-950/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-950" />
            </div>

            {/* Grid & Decorative Elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                <motion.div
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10 pt-16 md:pt-4">
                <div className="grid grid-cols-12 gap-8 items-center">
                    {/* LEFT CONTENT */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="col-span-12 lg:col-span-6 xl:col-span-7"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-600/20 border border-green-500/30 text-green-300 text-[10px] md:text-xs font-heading font-bold tracking-[0.15em] uppercase mb-6"
                        >
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                            Bộ sưu tập mới 2025
                        </motion.span>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-cream leading-[1.1] tracking-tighter mb-6 transition-all">
                            KHÔNG GIAN
                            <br />
                            <span className="text-green-400">SỐNG</span>
                            <br />
                            <span className="text-cream/20 italic font-body font-normal text-4xl md:text-6xl lg:text-7xl">Đích thực</span>
                        </h1>

                        <p className="text-lg md:text-xl text-cream/70 font-body italic max-w-lg mb-8 leading-relaxed">
                            Biến căn phòng trọ thành tổ ấm đầy cảm hứng —{" "}
                            <span className="not-italic font-semibold text-cream">nội thất chất lượng, giá sinh viên.</span>
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button
                                as={Link}
                                href="/products"
                                className="px-8 py-6 bg-green-400 text-green-950 font-heading font-bold text-base tracking-wide hover:bg-cream transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-green-900/40"
                                radius="none"
                            >
                                KHÁM PHÁ NGAY →
                            </Button>
                            <Button
                                as={Link}
                                href="/combos"
                                variant="bordered"
                                className="px-8 py-6 border-2 border-cream/30 text-cream font-heading font-bold text-base tracking-wide hover:bg-cream/10 transition-all duration-300"
                                radius="none"
                            >
                                XEM COMBO
                            </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-cream/10 md:max-w-md">
                            <div className="group cursor-default">
                                <span className="block text-3xl font-heading font-extrabold text-green-400 group-hover:scale-105 transition-transform">2K+</span>
                                <span className="text-[10px] text-cream/50 font-heading uppercase tracking-widest mt-0.5 block">Sản phẩm</span>
                            </div>
                            <div className="group cursor-default">
                                <span className="block text-3xl font-heading font-extrabold text-green-400 group-hover:scale-105 transition-transform">15K</span>
                                <span className="text-[10px] text-cream/50 font-heading uppercase tracking-widest mt-0.5 block">Sinh viên</span>
                            </div>
                            <div className="group cursor-default">
                                <div className="flex items-center gap-2">
                                    <span className="block text-3xl font-heading font-extrabold text-green-400 group-hover:scale-105 transition-transform">4.9</span>
                                    <StarSolidIcon className="w-5 h-5 text-green-400" />
                                </div>
                                <span className="text-[10px] text-cream/50 font-heading uppercase tracking-widest mt-0.5 block">Đánh giá</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT VISUAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="col-span-12 lg:col-span-6 xl:col-span-5 relative hidden lg:block"
                    >
                        {/* Main Image with Glass Container */}
                        <div className="relative z-10 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl max-w-[420px] ml-auto">
                            <img
                                src={featuredProduct.image}
                                alt={featuredProduct.title}
                                className="w-full aspect-square object-cover rounded-xl shadow-2xl shadow-green-950/50"
                            />

                            {/* Floating Card: Description */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -left-8 bottom-16 p-4 bg-cream text-green-950 shadow-2xl max-w-[170px]"
                            >
                                <CheckBadgeIcon className="w-6 h-6 text-green-600 mb-1" />
                                <span className="block font-heading font-extrabold text-base leading-tight uppercase">Best for Study</span>
                                <span className="text-[10px] font-body opacity-70">{featuredProduct.shortDescription}</span>
                            </motion.div>

                            {/* Floating Card: Price */}
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -right-4 top-10 p-4 bg-green-500 text-green-950 shadow-2xl"
                            >
                                <span className="block text-[10px] font-heading font-bold opacity-60 uppercase tracking-widest">Giá sinh viên</span>
                                <span className="block text-2xl font-heading font-extrabold">{displayPrice}</span>
                            </motion.div>
                        </div>


                        {/* Decorative Rings */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] border border-cream/10 rounded-full pointer-events-none" />
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[9px] font-heading font-bold text-cream/40 tracking-[0.4em] uppercase">Khám phá</span>
                    <div className="w-[1px] h-8 bg-gradient-to-bottom from-cream/40 to-transparent" />
                </div>
            </motion.div>
        </section>
    );
}

