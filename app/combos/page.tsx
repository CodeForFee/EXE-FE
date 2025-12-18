"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    HomeModernIcon,
    LightBulbIcon,
    BookOpenIcon,
    FolderIcon,
    PaintBrushIcon,
    ReceiptPercentIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    CubeIcon,
} from "@heroicons/react/24/outline";

import { combos as rawCombos } from "@/lib/data/products";

const combos = rawCombos.map((combo, index) => {
    const icons = [
        [CubeIcon, HomeModernIcon, LightBulbIcon, BookOpenIcon],
        [CubeIcon, HomeModernIcon, LightBulbIcon, FolderIcon],
        [PaintBrushIcon, LightBulbIcon, HomeModernIcon, CubeIcon],
    ][index] || [CubeIcon, HomeModernIcon, LightBulbIcon, CubeIcon];

    return {
        ...combo,
        items: combo.items.map((item, i) => ({
            ...item,
            Icon: icons[i]
        }))
    };
});


export default function CombosPage() {
    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32">
                {/* Hero */}
                <section className="py-20 bg-green-950 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600/10 blur-[100px]" />
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-3xl"
                        >
                            <span className="inline-flex items-center gap-2 text-[11px] font-heading font-bold text-green-400 tracking-[0.2em] uppercase mb-4">
                                <ReceiptPercentIcon className="w-5 h-5" /> Tiết kiệm đến 30%
                            </span>
                            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-cream leading-[0.95] tracking-tighter mb-6">
                                Combo tiết kiệm
                                <br />
                                <span className="outline-text text-green-400/30">cho sinh viên</span>
                            </h1>
                            <p className="text-xl text-cream/60 font-body italic max-w-xl">
                                Mua theo combo để được giảm giá sâu —{" "}
                                <span className="not-italic font-semibold text-cream/80">tiết kiệm hơn, đẹp hơn.</span>
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Combos Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="space-y-16">
                            {combos.map((combo, index) => (
                                <motion.article
                                    key={combo.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="grid grid-cols-12 gap-8 items-center"
                                >
                                    {/* Image */}
                                    <div className={`col-span-12 lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                        <div className="relative aspect-[4/3] overflow-hidden">
                                            <img
                                                src={combo.image}
                                                alt={combo.name}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-6 left-6">
                                                <span className="editorial-badge">{combo.tag}</span>
                                            </div>
                                            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-cream/40" />
                                            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-cream/40" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className={`col-span-12 lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                        <div className="max-w-lg">
                                            <span className="text-6xl font-heading font-extrabold text-divider/40 leading-none block mb-4">
                                                0{index + 1}
                                            </span>
                                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-4 tracking-tight">
                                                {combo.name}
                                            </h2>
                                            <p className="text-lg text-body font-body mb-6">
                                                {combo.description}
                                            </p>

                                            <ul className="space-y-3 mb-8">
                                                {combo.items.map((item, i) => (
                                                    <li key={i} className="flex items-center gap-3 text-body font-body">
                                                        <item.Icon className="w-5 h-5 text-green-700" />
                                                        {item.name}
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex items-baseline gap-4 mb-8">
                                                <span className="text-3xl font-heading font-extrabold text-green-700">
                                                    {combo.comboPrice.toLocaleString("vi-VN")}₫
                                                </span>
                                                <span className="text-lg text-muted line-through font-body">
                                                    {combo.originalPrice.toLocaleString("vi-VN")}₫
                                                </span>
                                                <span className="px-2 py-1 bg-terracotta text-cream text-xs font-heading font-bold">
                                                    -{Math.round(((combo.originalPrice - combo.comboPrice) / combo.originalPrice) * 100)}%
                                                </span>
                                            </div>

                                            <Button
                                                as={Link}
                                                href={`/combos/${combo.id}`}
                                                className="px-8 py-6 bg-green-900 text-cream font-heading font-bold text-sm tracking-wide hover:bg-green-700 transition-all inline-flex items-center gap-2"
                                                radius="none"
                                            >
                                                XEM CHI TIẾT <ArrowRightIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 bg-secondary border-t border-divider">
                    <div className="container mx-auto px-4 text-center">
                        <CheckCircleIcon className="w-12 h-12 text-green-700 mx-auto mb-4" />
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-heading mb-4">
                            Không tìm thấy combo phù hợp?
                        </h3>
                        <p className="text-body font-body mb-8 max-w-md mx-auto">
                            Liên hệ với chúng tôi để được tư vấn combo riêng theo nhu cầu của bạn.
                        </p>
                        <Button
                            className="px-8 py-6 border-2 border-heading/20 text-heading font-heading font-bold text-sm tracking-wide hover:bg-heading hover:text-inverse transition-all"
                            radius="none"
                            variant="bordered"
                        >
                            TƯ VẤN MIỄN PHÍ
                        </Button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
