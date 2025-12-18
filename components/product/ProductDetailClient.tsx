"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import { useCartStore } from "@/lib/stores/useCartStore";
import { useLoadingStore } from "@/lib/stores/useLoadingStore";
import { Product } from "@/lib/data/products";
import ProductCard from "@/components/ui/ProductCard";
import {
    CheckCircleIcon,
    TruckIcon,
    ArrowPathIcon,
    ShieldCheckIcon,
    HeartIcon,
    ShareIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    TagIcon,
} from "@heroicons/react/24/outline";
import { StarIcon, HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface ProductDetailClientProps {
    product: Product;
    recommendedProducts: Product[];
}

export default function ProductDetailClient({ product, recommendedProducts }: ProductDetailClientProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCartStore();
    const { setIsLoading } = useLoadingStore();

    const addToCart = () => {
        setIsLoading(true, "Đang thêm vào giỏ hàng...");
        setTimeout(() => {
            addItem({
                id: product.id,
                title: product.title,
                price: product.price,
                originalPrice: product.originalPrice,
                quantity: quantity,
                image: product.image,
            });
            setIsLoading(false);
        }, 800);
    };

    const nextImage = () => {
        setSelectedImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 text-sm font-heading text-muted mb-10"
            >
                <Link href="/" className="hover:text-green-700 transition-colors">Trang chủ</Link>
                <ChevronRightIcon className="w-4 h-4" />
                <Link href="/products" className="hover:text-green-700 transition-colors">Sản phẩm</Link>
                <ChevronRightIcon className="w-4 h-4" />
                <span className="text-heading font-semibold truncate max-w-[200px]">{product.title}</span>
            </motion.nav>

            <div className="grid grid-cols-12 gap-8 lg:gap-16">
                {/* Left: Gallery */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="col-span-12 lg:col-span-7"
                >
                    {/* Main Image */}
                    <div className="relative aspect-[4/3] overflow-hidden mb-4 bg-secondary group">
                        <img
                            src={product.images[selectedImage]}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Image Navigation */}
                        {product.images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 hover:bg-cream flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                                >
                                    <ChevronLeftIcon className="w-6 h-6 text-heading" />
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-cream/90 hover:bg-cream flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                                >
                                    <ChevronRightIcon className="w-6 h-6 text-heading" />
                                </button>
                            </>
                        )}

                        {/* Corner decorations */}
                        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-green-600/60" />
                        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-green-600/60" />

                        {/* Badge */}
                        {product.badge && (
                            <div className="absolute top-6 right-6">
                                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-700 text-cream text-xs font-heading font-bold tracking-wider uppercase">
                                    <TagIcon className="w-4 h-4" />
                                    {product.badge}
                                </span>
                            </div>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-heading/80 text-inverse text-xs font-heading font-medium">
                            {selectedImage + 1} / {product.images.length}
                        </div>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-3">
                        {product.images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`relative w-24 h-24 overflow-hidden transition-all ${selectedImage === i
                                    ? "ring-2 ring-green-700 ring-offset-2"
                                    : "border border-divider hover:border-green-600/50 opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Right: Product Info */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="col-span-12 lg:col-span-5"
                >
                    <div className="sticky top-32">
                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-heading leading-tight tracking-tighter mb-4">
                            {product.title}
                        </h1>

                        {/* Rating & Reviews */}
                        {product.rating && (
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating!) ? 'text-warning' : 'text-divider'}`}
                                        />
                                    ))}
                                </div>
                                <span className="font-heading font-bold text-heading">{product.rating.toFixed(1)}</span>
                                <span className="text-muted font-body text-sm">({product.reviews} đánh giá)</span>
                            </div>
                        )}

                        {/* Price */}
                        <div className="p-6 bg-secondary border border-divider mb-8">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-heading font-extrabold text-green-700">
                                    {product.price.toLocaleString("vi-VN")}₫
                                </span>
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <>
                                        <span className="text-xl text-muted line-through font-body">
                                            {product.originalPrice.toLocaleString("vi-VN")}₫
                                        </span>
                                        <span className="px-3 py-1.5 bg-terracotta text-cream text-sm font-heading font-bold">
                                            GIẢM {discount}%
                                        </span>
                                    </>
                                )}
                            </div>
                            <p className="text-sm text-muted font-body mt-2">
                                Đã bao gồm VAT • Tiết kiệm {((product.originalPrice || product.price) - product.price).toLocaleString("vi-VN")}₫
                            </p>
                        </div>

                        {/* Short Description */}
                        <p className="text-lg text-body font-body leading-relaxed mb-8">
                            {product.shortDescription || product.description}
                        </p>

                        {/* Features */}
                        {product.features && (
                            <div className="mb-8">
                                <h3 className="text-sm font-heading font-bold text-muted tracking-wider uppercase mb-4">
                                    Điểm nổi bật
                                </h3>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {product.features.slice(0, 4).map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3 text-body font-body">
                                            <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-sm font-heading font-bold text-muted tracking-wider uppercase">
                                Số lượng
                            </span>
                            <div className="flex items-center border border-divider">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors font-heading font-bold text-xl"
                                >
                                    −
                                </button>
                                <span className="w-16 h-12 flex items-center justify-center font-heading font-bold border-x border-divider">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors font-heading font-bold text-xl"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 mb-6">
                            <Button
                                onClick={addToCart}
                                className="flex-1 py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-wide hover:bg-green-700 transition-all"
                                radius="none"
                            >
                                THÊM VÀO GIỎ HÀNG
                            </Button>
                            <button
                                onClick={() => setIsFavorite(!isFavorite)}
                                className={`w-14 h-14 border-2 flex items-center justify-center transition-all ${isFavorite
                                    ? 'border-terracotta bg-terracotta/10'
                                    : 'border-divider hover:border-terracotta'
                                    }`}
                            >
                                {isFavorite ? (
                                    <HeartSolidIcon className="w-6 h-6 text-terracotta" />
                                ) : (
                                    <HeartIcon className="w-6 h-6 text-muted" />
                                )}
                            </button>
                            <button className="w-14 h-14 border-2 border-divider flex items-center justify-center hover:border-heading transition-all">
                                <ShareIcon className="w-6 h-6 text-muted" />
                            </button>
                        </div>

                        <Button
                            as={Link}
                            href="/checkout"
                            variant="bordered"
                            className="w-full py-7 border-2 border-green-900 text-green-900 font-heading font-bold text-base tracking-wide hover:bg-green-900 hover:text-cream transition-all flex items-center justify-center"
                            radius="none"
                            onClick={addToCart}
                        >
                            MUA NGAY
                        </Button>

                        {/* Shipping info */}
                        <div className="mt-8 p-6 bg-green-50 border border-green-200">
                            <h4 className="text-sm font-heading font-bold text-green-800 tracking-wider uppercase mb-4">
                                Ưu đãi khi mua hàng
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm font-heading text-green-700">
                                    <TruckIcon className="w-5 h-5 flex-shrink-0" />
                                    <span>Miễn phí vận chuyển cho đơn từ 500K</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-heading text-green-700">
                                    <ArrowPathIcon className="w-5 h-5 flex-shrink-0" />
                                    <span>Đổi trả miễn phí trong 7 ngày</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm font-heading text-green-700">
                                    <ShieldCheckIcon className="w-5 h-5 flex-shrink-0" />
                                    <span>Bảo hành 12 tháng chính hãng</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tabs: Description & Specs */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 pt-16"
            >
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-8 bg-green-700" />
                            <h3 className="text-2xl font-heading font-bold text-heading">Mô tả sản phẩm</h3>
                        </div>
                        <div className="prose prose-lg font-body text-body max-w-none">
                            <p className="text-lg leading-relaxed">{product.description}</p>
                            <p className="leading-relaxed">Với thiết kế tối giản nhưng tinh tế, sản phẩm dễ dàng kết hợp với nhiều phong cách trang trí khác nhau. Phù hợp cho không gian phòng trọ, ký túc xá hoặc căn hộ nhỏ của sinh viên.</p>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-8 bg-green-700" />
                            <h3 className="text-2xl font-heading font-bold text-heading">Thông số kỹ thuật</h3>
                        </div>
                        {product.specifications && product.specifications.length > 0 ? (
                            <div className="bg-secondary p-6 border border-divider">
                                <dl className="divide-y divide-divider">
                                    {product.specifications.map((spec, index) => (
                                        <div key={index} className="flex justify-between py-4 first:pt-0 last:pb-0">
                                            <dt className="font-heading font-medium text-muted">{spec.key}</dt>
                                            <dd className="font-heading font-semibold text-heading text-right">{spec.value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        ) : (
                            <p className="text-muted font-body italic">Thông số sẽ được cập nhật sớm.</p>
                        )}
                    </div>
                </div>
            </motion.section>

            {/* Related Products */}
            <motion.section
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-20 pt-16 border-t border-divider"
            >
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <span className="editorial-badge mb-4 inline-block">Gợi ý cho bạn</span>
                        <h2 className="text-3xl font-heading font-bold text-heading tracking-tight">Sản phẩm tương tự</h2>
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-green-700 font-heading font-bold text-green-700 hover:bg-green-700 hover:text-cream transition-all"
                    >
                        XEM TẤT CẢ
                        <ChevronRightIcon className="w-5 h-5" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {recommendedProducts.map((p, index) => (
                        <motion.div
                            key={p.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard {...p} />
                        </motion.div>
                    ))}
                </div>
            </motion.section>
        </div>
    );
}
