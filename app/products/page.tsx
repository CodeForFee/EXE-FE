"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import ProductsClient from "@/components/product/ProductsClient";
import * as Framer from "framer-motion";
import { useProductStore } from "@/lib/stores/useProductStore";
import { useEffect, useState } from "react";
import { Product } from "@/lib/data/products";
import { categoryService } from "@/lib/api/services/category";
import type { CategoryResponse } from "@/lib/api/types";

const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-asc", label: "Giá thấp → cao" },
    { value: "price-desc", label: "Giá cao → thấp" },
    { value: "popular", label: "Phổ biến" }, // Popular might need logic support
];

// Metadata cannot be exported from client component, so we remove it or move to layout/separate server component.
// Since this is becoming "use client", metadata export is invalid here.
// Assuming layout handles metadata or we accept losing specific metadata for this page for now.

export default function ProductsPage() {
    const { products, fetchProducts, isLoading } = useProductStore();
    const [categories, setCategories] = useState<{ value: string; label: string }[]>([
        { value: "all", label: "Tất cả" },
    ]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data: CategoryResponse[] = await categoryService.getAllCategoriesNoPaging();
                setCategories([
                    { value: "all", label: "Tất cả" },
                    ...data.map((cat) => ({
                        value: cat.name,
                        label: cat.name,
                    })),
                ]);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };

        loadCategories();
    }, []);

    // Mapping FurnitureResponse to Product type expected by ProductsClient
    const mappedProducts: Product[] = products.map((p) => ({
        id: p.furnitureId,
        title: p.name, // 'name' mapped to 'title'
        price: p.finalPrice || p.price,
        originalPrice: p.price !== p.finalPrice ? p.price : undefined,
        discount: p.discountPercentage,
        image: p.primaryImageUrl || p.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800", // Fallback image
        images: p.primaryImageUrl ? [p.primaryImageUrl] : (p.image ? [p.image] : ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"]), // Create array
        rating: 5, // Mock default
        reviews: 0, // Mock default
        badge: p.discountPercentage ? "Giảm giá" : undefined, // Mock badge
        // Dùng đúng tên danh mục từ BE để khớp với filter categories
        category: p.categoryName || "Khác",
        tags: ["furniture"], // Mock tags
        shortDescription: p.description ? p.description.substring(0, 100) + "..." : "Mô tả sản phẩm",
        description: p.description || "Chi tiết sản phẩm đang được cập nhật.",
        specifications: [], // Mock empty
        features: [] // Mock empty
    }));

    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32">
                {/* Hero Banner */}
                <section className="py-16 bg-secondary border-b border-divider">
                    <div className="container mx-auto px-4">
                        <div className="space-y-4">
                            <span className="editorial-badge mb-4 inline-block">Bộ sưu tập</span>
                            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-heading leading-[0.95] tracking-tighter mb-4">
                                Tất cả sản phẩm
                            </h1>
                            <p className="text-xl text-body font-body italic max-w-xl">
                                Khám phá bộ sưu tập nội thất được chọn lọc —{" "}
                                <span className="not-italic font-semibold">chất lượng cao, giá sinh viên.</span>
                            </p>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        {isLoading ? (
                            <div className="text-center py-20">Đang tải sản phẩm...</div>
                        ) : (
                            <ProductsClient
                                initialProducts={mappedProducts}
                                categories={categories}
                                sortOptions={sortOptions}
                            />
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

