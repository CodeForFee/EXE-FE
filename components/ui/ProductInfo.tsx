"use client";

import { Button, Chip, Divider } from "@heroui/react";
import { Product } from "@/lib/data/products";
import { motion } from "framer-motion";

interface ProductInfoProps {
    product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
    return (
        <div className="flex flex-col gap-8 h-full">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    {product.badge && (
                        <Chip className="bg-green-600 text-white font-black uppercase text-[10px] px-3">
                            {product.badge}
                        </Chip>
                    )}
                    <div className="flex items-center gap-1 text-muted text-sm font-bold">
                        <span className="text-yellow-500">★</span>
                        <span>{product.rating}</span>
                        <span className="text-muted/40 font-medium">({product.reviews} đánh giá)</span>
                    </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-heading mb-4 tracking-tighter leading-tight">
                    {product.title}
                </h1>

                <p className="text-lg text-body mb-8 font-medium leading-relaxed italic border-l-4 border-green-600 pl-6">
                    {product.shortDescription}
                </p>

                <div className="flex items-baseline gap-4 mb-10">
                    <span className="text-5xl font-black text-green-700 tracking-tighter">
                        {product.price.toLocaleString("vi-VN")}₫
                    </span>
                    {product.originalPrice && (
                        <span className="text-xl text-muted/50 line-through font-bold">
                            {product.originalPrice.toLocaleString("vi-VN")}₫
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-4 mb-12">
                    <h4 className="text-xs font-black text-muted uppercase tracking-widest">Đặc điểm nổi bật</h4>
                    <div className="flex flex-wrap gap-2">
                        {product.features.map((f) => (
                            <Chip key={f} variant="flat" className="bg-secondary text-green-800 font-bold border-none">
                                ✓ {f}
                            </Chip>
                        ))}
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        size="lg"
                        className="flex-1 bg-green-600 text-white font-black h-20 text-lg rounded-[1.5rem] shadow-xl shadow-green-600/30 hover:bg-green-700 transition-all hover:scale-[1.02]"
                    >
                        MUA NGAY
                    </Button>
                    <Button
                        isIconOnly
                        size="lg"
                        variant="bordered"
                        className="w-20 h-20 border-2 border-divider/50 rounded-[1.5rem] hover:bg-white hover:border-green-600 transition-all"
                    >
                        <span className="text-2xl">🛒</span>
                    </Button>
                </div>
            </motion.div>
        </div>
    );
}
