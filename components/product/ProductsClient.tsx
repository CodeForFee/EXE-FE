"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "@heroui/react";
import ProductCard from "@/components/ui/ProductCard";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import { Product } from "@/lib/data/products";

interface ProductsClientProps {
    initialProducts: Product[];
    categories: { value: string; label: string }[];
    sortOptions: { value: string; label: string }[];
}

export default function ProductsClient({
    initialProducts,
    categories,
    sortOptions,
}: ProductsClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [isLoading, setIsLoading] = useState(true);

    // Simulated loading to demonstrate skeletons on mount/filter
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, [selectedCategory, sortBy]);

    const filteredProducts = initialProducts.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Basic sorting logic (expand as needed)
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        return 0; // default (newest etc would need date field)
    });

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <aside className="col-span-12 lg:col-span-3">
                <div className="sticky top-32 space-y-8">
                    {/* Search */}
                    <div>
                        <label className="text-[11px] font-heading font-bold text-muted tracking-[0.15em] uppercase mb-3 block">
                            Tìm kiếm
                        </label>
                        <Input
                            placeholder="Nhập tên sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            classNames={{
                                input: "font-body",
                                inputWrapper: "border border-divider bg-card hover:border-green-600/50"
                            }}
                            radius="none"
                        />
                    </div>

                    {/* Categories */}
                    <div>
                        <label className="text-[11px] font-heading font-bold text-muted tracking-[0.15em] uppercase mb-3 block">
                            Danh mục
                        </label>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => {
                                        setIsLoading(true);
                                        setSelectedCategory(cat.value);
                                    }}
                                    className={`w-full text-left px-4 py-3 font-heading font-medium text-sm transition-all border ${selectedCategory === cat.value
                                        ? "bg-green-900 text-cream border-green-900"
                                        : "bg-card text-body border-divider hover:border-green-600/50"
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Products Grid */}
            <div className="col-span-12 lg:col-span-9">
                {/* Toolbar */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-divider">
                    <span className="text-sm font-heading text-muted">
                        Hiển thị <span className="font-bold text-heading">{sortedProducts.length}</span> sản phẩm
                    </span>
                    <div className="flex items-center gap-4">
                        <label className="text-[11px] font-heading font-bold text-muted tracking-[0.1em] uppercase">
                            Sắp xếp:
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => {
                                setIsLoading(true);
                                setSortBy(e.target.value);
                            }}
                            className="px-4 py-2 bg-card border border-divider font-heading text-sm text-heading focus:border-green-600 focus:outline-none"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))
                    ) : sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <p className="text-muted font-body italic">Không tìm thấy sản phẩm nào phù hợp.</p>
                        </div>
                    )}
                </div>

                {/* Load More */}
                {!isLoading && sortedProducts.length > 0 && (
                    <div className="mt-16 text-center">
                        <Button
                            className="px-12 py-6 border-2 border-heading/20 text-heading font-heading font-bold text-sm tracking-wide hover:bg-heading hover:text-inverse transition-all"
                            radius="none"
                            variant="bordered"
                        >
                            TẢI THÊM SẢN PHẨM
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
