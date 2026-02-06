"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
import { furnitureService } from "@/lib/api/services/furniture";
import type { FurnitureResponse } from "@/lib/api/types";

type ComboUi = {
    id: string;
    name: string;
    description: string;
    items: { Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; name: string }[];
    originalPrice: number;
    comboPrice: number;
    image: string;
    tag: string;
};

export default function CombosPage() {
    const [combos, setCombos] = useState<ComboUi[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCombos = async () => {
            try {
                const page = await furnitureService.getAllFurniture(0, 6, "createdAt", "DESC");
                const iconSets = [
                    [CubeIcon, HomeModernIcon, LightBulbIcon, BookOpenIcon],
                    [CubeIcon, HomeModernIcon, LightBulbIcon, FolderIcon],
                    [PaintBrushIcon, LightBulbIcon, HomeModernIcon, CubeIcon],
                ] as const;

                const mapped: ComboUi[] = page.content.map((p, index) => {
                    const icons = iconSets[index] || iconSets[0];
                    const items = [
                        { Icon: icons[0], name: "Bàn & ghế học tập" },
                        { Icon: icons[1], name: "Không gian tổng thể" },
                        { Icon: icons[2], name: "Ánh sáng & decor" },
                        { Icon: icons[3], name: "Lưu trữ gọn gàng" },
                    ];

                    return {
                        id: p.furnitureId,
                        name: p.name,
                        description: p.description || "Combo nội thất tối ưu cho phòng trọ sinh viên.",
                        items,
                        originalPrice: p.price,
                        comboPrice: p.finalPrice ?? p.price,
                        image: p.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
                        tag: p.discountPercentage ? "Giảm giá" : "Gợi ý",
                    };
                });

                setCombos(mapped);
            } catch (error) {
                console.error("Failed to load combos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCombos();
    }, []);

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
                                <ReceiptPercentIcon className="w-5 h-5" /> Tiết kiệm từ giá gốc
                            </span>
                            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-cream leading-[0.95] tracking-tighter mb-6">
                                Combo tiết kiệm
                                <br />
                                <span className="outline-text text-green-400/30">cho sinh viên</span>
                            </h1>
                            <p className="text-xl text-cream/60 font-body italic max-w-xl">
                                Các gói nội thất được gợi ý trực tiếp từ sản phẩm thật trên hệ thống UniHome.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Combos Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="space-y-16">
                            {loading && (
                                <p className="text-center text-muted py-10">Đang tải combo ưu đãi...</p>
                            )}
                            {!loading && combos.map((combo, index) => (
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
                                                {combo.comboPrice !== combo.originalPrice && (
                                                    <>
                                                        <span className="text-lg text-muted line-through font-body">
                                                            {combo.originalPrice.toLocaleString("vi-VN")}₫
                                                        </span>
                                                        <span className="px-2 py-1 bg-terracotta text-cream text-xs font-heading font-bold">
                                                            -{Math.round(((combo.originalPrice - combo.comboPrice) / combo.originalPrice) * 100)}%
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            <Link
                                                href={`/combos/${combo.id}`}
                                                className="px-8 py-6 bg-green-900 text-cream font-heading font-bold text-sm tracking-wide hover:bg-green-700 transition-all inline-flex items-center gap-2"
                                            >
                                                XEM CHI TIẾT <ArrowRightIcon className="w-5 h-5" />
                                            </Link>
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
                        <button
                            className="px-8 py-6 border-2 border-heading/20 text-heading font-heading font-bold text-sm tracking-wide hover:bg-heading hover:text-inverse transition-all"
                        >
                            TƯ VẤN MIỄN PHÍ
                        </button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
