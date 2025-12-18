import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data/products";
import { motion } from "framer-motion";
import ProductsClient from "@/components/product/ProductsClient";
import * as Framer from "framer-motion";

const categories = [
    { value: "all", label: "Tất cả" },
    { value: "desk", label: "Bàn làm việc" },
    { value: "chair", label: "Ghế" },
    { value: "lighting", label: "Đèn" },
    { value: "storage", label: "Kệ & Tủ" },
    { value: "decoration", label: "Trang trí" },
];

const sortOptions = [
    { value: "newest", label: "Mới nhất" },
    { value: "price-asc", label: "Giá thấp → cao" },
    { value: "price-desc", label: "Giá cao → thấp" },
    { value: "popular", label: "Phổ biến" },
];

export const metadata = {
    title: "Sản phẩm | UNIHOME",
    description: "Khám phá bộ sưu tập nội thất tối giản, chất lượng cao dành riêng cho sinh viên.",
};

export default function ProductsPage() {
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
                        <ProductsClient
                            initialProducts={products}
                            categories={categories}
                            sortOptions={sortOptions}
                        />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

