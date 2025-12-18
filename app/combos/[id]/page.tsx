"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useCartStore } from "@/lib/stores/useCartStore";
import {
    HomeModernIcon,
    LightBulbIcon,
    BookOpenIcon,
    FolderIcon,
    PaintBrushIcon,
    ArrowLeftIcon,
    ShoppingCartIcon,
    CheckIcon,
    TruckIcon,
    ShieldCheckIcon,
    TagIcon,
    CubeIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import { combos as rawCombos, products } from "@/lib/data/products";

// Map icons to combo items
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

export default function ComboDetailPage() {
    const params = useParams();
    const { addItem } = useCartStore();
    const combo = combos.find((c) => c.id === params.id);

    if (!combo) {
        return (
            <div className="flex flex-col min-h-screen bg-main">
                <Header />
                <main className="flex-grow pt-32 pb-20">
                    <div className="container mx-auto px-4 text-center py-20">
                        <h1 className="text-3xl font-heading font-bold text-heading mb-4">Không tìm thấy combo</h1>
                        <p className="text-gray-500 mb-8">Combo bạn đang tìm kiếm không tồn tại.</p>
                        <Button
                            as={Link}
                            href="/combos"
                            className="px-8 py-6 bg-green-900 text-cream font-heading font-bold"
                            radius="none"
                        >
                            QUAY LẠI DANH SÁCH COMBO
                        </Button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const savings = combo.originalPrice - combo.comboPrice;
    const discountPercent = Math.round((savings / combo.originalPrice) * 100);

    // Get related products for the combo items
    const relatedProducts = products.slice(0, 4);

    const handleAddToCart = () => {
        // Add combo as a single item to cart
        addItem({
            id: `combo-${combo.id}`,
            title: combo.name,
            price: combo.comboPrice,
            originalPrice: combo.originalPrice,
            image: combo.image,
            quantity: 1,
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-sm font-heading text-muted mb-10"
                    >
                        <Link href="/" className="hover:text-green-700 transition-colors">Trang chủ</Link>
                        <span className="text-divider">/</span>
                        <Link href="/combos" className="hover:text-green-700 transition-colors">Combo</Link>
                        <span className="text-divider">/</span>
                        <span className="text-heading font-semibold">{combo.name}</span>
                    </motion.nav>

                    <div className="grid grid-cols-12 gap-8 lg:gap-16">
                        {/* Left: Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="col-span-12 lg:col-span-7"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-secondary">
                                <img
                                    src={combo.image}
                                    alt={combo.name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Decorative corners */}
                                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/40" />
                                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/40" />

                                {/* Tag badge */}
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-terracotta text-white font-heading font-bold text-sm">
                                        {combo.tag}
                                    </span>
                                </div>
                            </div>

                            {/* Combo Items Preview */}
                            <div className="grid grid-cols-4 gap-4">
                                {combo.items.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="aspect-square bg-secondary border border-divider flex flex-col items-center justify-center p-4 hover:border-green-600/50 transition-colors"
                                    >
                                        <item.Icon className="w-8 h-8 text-green-700 mb-2" />
                                        <span className="text-xs font-heading text-center text-muted">{item.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right: Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="col-span-12 lg:col-span-5"
                        >
                            <div className="sticky top-32">
                                {/* Tag */}
                                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 text-xs font-heading font-bold tracking-wide uppercase mb-4">
                                    <TagIcon className="w-4 h-4" />
                                    Combo tiết kiệm
                                </span>

                                <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-heading tracking-tight mb-4">
                                    {combo.name}
                                </h1>

                                {/* Rating */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon key={star} className="w-5 h-5 text-warning" />
                                        ))}
                                    </div>
                                    <span className="text-sm font-heading text-muted">(47 đánh giá)</span>
                                </div>

                                <p className="text-lg text-body font-body leading-relaxed mb-8">
                                    {combo.description}
                                </p>

                                {/* Included Items */}
                                <div className="bg-secondary border border-divider p-6 mb-8">
                                    <h3 className="font-heading font-bold text-heading mb-4">Bao gồm trong combo:</h3>
                                    <ul className="space-y-3">
                                        {combo.items.map((item, index) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                                                <item.Icon className="w-5 h-5 text-muted flex-shrink-0" />
                                                <span className="font-body text-body">{item.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Price */}
                                <div className="border-t border-b border-divider py-6 mb-8">
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <span className="text-4xl font-heading font-extrabold text-green-700">
                                            {combo.comboPrice.toLocaleString("vi-VN")}₫
                                        </span>
                                        <span className="text-xl text-muted line-through font-body">
                                            {combo.originalPrice.toLocaleString("vi-VN")}₫
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-terracotta text-white text-sm font-heading font-bold">
                                            -{discountPercent}%
                                        </span>
                                        <span className="text-green-600 font-heading font-medium">
                                            Tiết kiệm {savings.toLocaleString("vi-VN")}₫
                                        </span>
                                    </div>
                                </div>

                                {/* Add to Cart */}
                                <div className="space-y-4 mb-8">
                                    <Button
                                        className="w-full py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-wide hover:bg-green-700 transition-all flex items-center justify-center gap-3"
                                        radius="none"
                                        onClick={handleAddToCart}
                                    >
                                        <ShoppingCartIcon className="w-5 h-5" />
                                        THÊM COMBO VÀO GIỎ HÀNG
                                    </Button>
                                    <Button
                                        as={Link}
                                        href="/checkout"
                                        className="w-full py-7 border-2 border-heading/20 text-heading font-heading font-bold text-base tracking-wide hover:bg-heading hover:text-inverse transition-all"
                                        radius="none"
                                        variant="bordered"
                                        onClick={handleAddToCart}
                                    >
                                        MUA NGAY
                                    </Button>
                                </div>

                                {/* Trust Badges */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm font-heading text-muted">
                                        <TruckIcon className="w-5 h-5 text-green-600" />
                                        <span>Miễn phí giao hàng nội thành</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-heading text-muted">
                                        <ShieldCheckIcon className="w-5 h-5 text-green-600" />
                                        <span>Bảo hành 12 tháng</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Related Products */}
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-24 pt-16 border-t border-divider"
                    >
                        <div className="flex items-end justify-between mb-12">
                            <div>
                                <span className="text-[11px] font-heading font-bold text-green-700 tracking-[0.2em] uppercase mb-2 block">
                                    Sản phẩm liên quan
                                </span>
                                <h2 className="text-3xl font-heading font-bold text-heading">Có thể bạn cũng thích</h2>
                            </div>
                            <Link
                                href="/products"
                                className="hidden md:inline-flex items-center gap-2 font-heading font-bold text-green-700 hover:text-green-600 transition-colors"
                            >
                                Xem tất cả →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((product, index) => (
                                <motion.article
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group"
                                >
                                    <Link href={`/products/${product.id}`}>
                                        <div className="relative aspect-[4/3] overflow-hidden bg-secondary mb-4">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <h3 className="font-heading font-bold text-heading group-hover:text-green-700 transition-colors mb-2">
                                            {product.title}
                                        </h3>
                                        <span className="font-heading font-bold text-green-700">
                                            {product.price.toLocaleString("vi-VN")}₫
                                        </span>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </motion.section>

                    {/* Back to Combos */}
                    <div className="mt-16 pt-8 border-t border-divider">
                        <Link
                            href="/combos"
                            className="inline-flex items-center gap-2 font-heading font-bold text-green-700 hover:text-green-600 transition-colors"
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                            Quay lại tất cả combo
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
