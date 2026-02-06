"use client";

import { useState } from "react";
import { Product } from "@/lib/data/products";

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    const [selectedTab, setSelectedTab] = useState<"description" | "specs" | "reviews">("description");

    return (
        <div className="w-full mt-20">
            {/* Tab Headers */}
            <div className="flex w-full relative border-b border-divider gap-12">
                <button
                    onClick={() => setSelectedTab("description")}
                    className={`pb-4 text-lg uppercase tracking-widest font-black transition-colors relative ${selectedTab === "description" ? "text-green-600" : "text-muted hover:text-heading"
                        }`}
                >
                    Mô tả
                    {selectedTab === "description" && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />
                    )}
                </button>
                <button
                    onClick={() => setSelectedTab("specs")}
                    className={`pb-4 text-lg uppercase tracking-widest font-black transition-colors relative ${selectedTab === "specs" ? "text-green-600" : "text-muted hover:text-heading"
                        }`}
                >
                    Thông số
                    {selectedTab === "specs" && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />
                    )}
                </button>
                <button
                    onClick={() => setSelectedTab("reviews")}
                    className={`pb-4 text-lg uppercase tracking-widest font-black transition-colors relative ${selectedTab === "reviews" ? "text-green-600" : "text-muted hover:text-heading"
                        }`}
                >
                    Đánh giá ({product.reviews})
                    {selectedTab === "reviews" && (
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-green-600" />
                    )}
                </button>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
                {selectedTab === "description" && (
                    <div className="py-4">
                        <p className="text-xl text-body leading-[1.8] font-medium max-w-4xl">
                            {product.description}
                        </p>
                    </div>
                )}

                {selectedTab === "specs" && (
                    <div className="py-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-divider rounded-3xl overflow-hidden border border-divider shadow-soft">
                            {product.specifications.map((spec) => (
                                <div key={spec.key} className="flex flex-col gap-1 p-8 bg-white hover:bg-secondary/30 transition-colors">
                                    <span className="text-[10px] font-black text-muted uppercase tracking-widest">{spec.key}</span>
                                    <span className="text-lg font-bold text-heading">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {selectedTab === "reviews" && (
                    <div className="py-4">
                        <div className="flex flex-col items-center justify-center p-20 bg-secondary/30 rounded-[3rem] text-center">
                            <span className="text-6xl mb-4">🌟</span>
                            <h3 className="text-2xl font-black text-heading mb-2">Chưa có đánh giá thực tế</h3>
                            <p className="text-muted font-medium">Hãy là người đầu tiên trải nghiệm và chia sẻ cảm nghĩ của bạn về sản phẩm này!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
