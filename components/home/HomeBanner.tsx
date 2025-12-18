"use client";

import { motion } from "framer-motion";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import {
    HomeModernIcon,
    LightBulbIcon,
    BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function HomeBanner() {
    return (
        <section className="py-24 bg-green-950 relative overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2000"
                    alt="Banner"
                    className="w-full h-full object-cover opacity-20"
                    radius="none"
                    removeWrapper
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-12 gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="col-span-12 lg:col-span-6"
                    >
                        <span className="text-[11px] font-heading font-bold text-green-400 tracking-[0.2em] uppercase mb-4 block">
                            ✦ Ưu đãi đặc biệt
                        </span>
                        <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-cream leading-[0.95] tracking-tighter mb-6">
                            Combo tiết kiệm
                            <br />
                            <span className="text-green-400">lên đến 30%</span>
                        </h2>
                        <p className="text-xl text-cream/60 font-body mb-8 max-w-lg">
                            Mua theo combo để được giảm giá sâu — tiết kiệm hơn, đẹp hơn cho không gian của bạn.
                        </p>
                        <Button
                            as={Link}
                            href="/combos"
                            className="px-10 py-7 bg-cream text-green-900 font-heading font-bold text-base tracking-wide hover:bg-green-400 transition-all"
                            radius="none"
                        >
                            XEM COMBO →
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="col-span-12 lg:col-span-5 lg:col-start-8 hidden lg:block"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { Icon: HomeModernIcon, label: "Ghế" },
                                { Icon: LightBulbIcon, label: "Đèn" },
                                { Icon: BookOpenIcon, label: "Kệ sách" },
                                { Icon: HomeModernIcon, label: "Sofa" },
                            ].map((item, i) => (
                                <div key={i} className="aspect-square bg-green-800/30 border border-green-700/30 flex flex-col items-center justify-center gap-3">
                                    <item.Icon className="w-12 h-12 text-green-400" />
                                    <span className="text-cream/70 font-heading text-sm">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
