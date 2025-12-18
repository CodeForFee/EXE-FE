"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Image } from "@heroui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
    StarIcon as StarOutline,
    HandThumbUpIcon,
    ChatBubbleLeftIcon,
    FunnelIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

import { products as allProducts } from "@/lib/data/products";

const reviews = [
    {
        id: 1,
        user: "Nguyễn Minh Anh",
        avatar: "M",
        rating: 5,
        date: "15/12/2024",
        product: allProducts[0].title,
        productImage: allProducts[0].image,
        content: "Ghế rất thoải mái, ngồi làm việc cả ngày không bị mỏi lưng. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ UniHome tiếp!",
        images: [],
        helpful: 24,
        verified: true,
    },
    {
        id: 2,
        user: "Trần Văn Hùng",
        avatar: "H",
        rating: 4,
        date: "12/12/2024",
        product: allProducts[1].title,
        productImage: allProducts[1].image,
        content: "Bàn đẹp, gỗ chắc chắn. Trừ 1 sao vì thời gian giao hàng hơi lâu (5 ngày). Tuy nhiên sản phẩm rất đáng tiền.",
        images: ["https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=200"],
        helpful: 18,
        verified: true,
    },
    {
        id: 3,
        user: "Lê Thị Hương",
        avatar: "H",
        rating: 5,
        date: "10/12/2024",
        product: allProducts[2].title,
        productImage: allProducts[2].image,
        content: "Đèn sáng đẹp, có 3 chế độ ánh sáng phù hợp cho việc học tập. Con mình rất thích. Cổng USB sạc điện thoại rất tiện!",
        images: [],
        helpful: 31,
        verified: true,
    },
    {
        id: 4,
        user: "Phạm Đức Nam",
        avatar: "N",
        rating: 5,
        date: "08/12/2024",
        product: allProducts[3].title,
        productImage: allProducts[3].image,
        content: "Giường pallet đẹp lắm, phù hợp với phòng nhỏ. Lắp đặt siêu dễ, chỉ mất 10 phút. Recommend cho các bạn sinh viên!",
        images: ["https://images.unsplash.com/photo-1540518614846-7eded433c457?w=200"],
        helpful: 42,
        verified: true,
    },
];


const stats = {
    average: 4.8,
    total: 1247,
    distribution: [
        { stars: 5, percent: 78 },
        { stars: 4, percent: 15 },
        { stars: 3, percent: 5 },
        { stars: 2, percent: 1 },
        { stars: 1, percent: 1 },
    ],
};

export default function ReviewsPage() {
    const [filter, setFilter] = useState("all");

    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <section className="py-20 bg-green-950 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1517248135467-4c7ed9d2019c?q=80&w=1600&auto=format&fit=crop"
                            className="w-full h-full object-cover opacity-20"
                            alt="Reviews background"
                        />
                        <div className="absolute inset-0 bg-green-950/60" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto"
                        >
                            <span className="text-[11px] font-heading font-bold text-green-400 tracking-[0.2em] uppercase mb-4 block">
                                ✦ Tin tưởng từ cộng đồng
                            </span>
                            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-cream leading-tight tracking-tighter mb-6">
                                Khách hàng nói gì về UniHome?
                            </h1>
                            <p className="text-xl text-cream/70 font-body italic">
                                Hơn 1,000+ đánh giá thực từ khách hàng đã mua sắm và trang trí không gian sống cùng UniHome
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="container mx-auto px-4 py-16">
                    <div className="grid grid-cols-12 gap-8">
                        {/* Sidebar Stats */}
                        <aside className="col-span-12 lg:col-span-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="sticky top-32"
                            >
                                {/* Overall Rating */}
                                <div className="bg-card border border-divider p-8 mb-6">
                                    <div className="text-center mb-6">
                                        <span className="text-6xl font-heading font-extrabold text-heading">{stats.average}</span>
                                        <div className="flex justify-center gap-1 my-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <StarIcon
                                                    key={star}
                                                    className={`w-6 h-6 ${star <= Math.floor(stats.average) ? "text-warning" : "text-divider"}`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-muted font-body">Dựa trên {stats.total.toLocaleString()} đánh giá</p>
                                    </div>

                                    {/* Distribution */}
                                    <div className="space-y-3">
                                        {stats.distribution.map((item) => (
                                            <div key={item.stars} className="flex items-center gap-3">
                                                <span className="text-sm font-heading font-medium w-8">{item.stars} ★</span>
                                                <div className="flex-1 h-3 bg-secondary overflow-hidden">
                                                    <div
                                                        className="h-full bg-warning"
                                                        style={{ width: `${item.percent}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm text-muted font-body w-10 text-right">{item.percent}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Filter */}
                                <div className="bg-card border border-divider p-6">
                                    <h3 className="font-heading font-bold text-heading mb-4 flex items-center gap-2">
                                        <FunnelIcon className="w-5 h-5" />
                                        Lọc đánh giá
                                    </h3>
                                    <div className="space-y-2">
                                        {["all", "5", "4", "3", "2", "1", "photo"].map((f) => (
                                            <button
                                                key={f}
                                                onClick={() => setFilter(f)}
                                                className={`w-full text-left px-4 py-3 font-heading font-medium text-sm transition-all border ${filter === f
                                                    ? "bg-green-900 text-cream border-green-900"
                                                    : "bg-main border-divider hover:border-green-600/50"
                                                    }`}
                                            >
                                                {f === "all" ? "Tất cả" : f === "photo" ? (
                                                    <span className="flex items-center gap-2"><PhotoIcon className="w-4 h-4" /> Có hình ảnh</span>
                                                ) : `${f} sao`}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </aside>

                        {/* Reviews List */}
                        <div className="col-span-12 lg:col-span-8 space-y-6">
                            {reviews.map((review, i) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-card border border-divider p-6"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center font-heading font-bold text-green-700">
                                                {review.avatar}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-heading font-bold text-heading">{review.user}</span>
                                                    {review.verified && (
                                                        <span className="text-xs font-heading font-bold text-green-600 bg-green-50 px-2 py-0.5">
                                                            ✓ Đã mua hàng
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-sm text-muted font-body">{review.date}</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <StarIcon
                                                    key={star}
                                                    className={`w-5 h-5 ${star <= review.rating ? "text-warning" : "text-divider"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product */}
                                    <div className="flex items-center gap-3 mb-4 p-3 bg-secondary">
                                        <div className="w-10 h-10 overflow-hidden">
                                            <Image src={review.productImage} alt="" className="w-full h-full object-cover" radius="none" removeWrapper />
                                        </div>
                                        <span className="text-sm font-heading text-heading">{review.product}</span>
                                    </div>

                                    {/* Content */}
                                    <p className="text-body font-body leading-relaxed mb-4">{review.content}</p>

                                    {/* Images */}
                                    {review.images.length > 0 && (
                                        <div className="flex gap-2 mb-4">
                                            {review.images.map((img, j) => (
                                                <div key={j} className="w-24 h-24 overflow-hidden border border-divider">
                                                    <Image src={img} alt="" className="w-full h-full object-cover" radius="none" removeWrapper />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex items-center gap-6 pt-4 border-t border-divider">
                                        <button className="flex items-center gap-2 text-sm text-muted hover:text-green-700 transition-colors">
                                            <HandThumbUpIcon className="w-5 h-5" />
                                            Hữu ích ({review.helpful})
                                        </button>
                                        <button className="flex items-center gap-2 text-sm text-muted hover:text-green-700 transition-colors">
                                            <ChatBubbleLeftIcon className="w-5 h-5" />
                                            Bình luận
                                        </button>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Load More */}
                            <div className="text-center pt-8">
                                <Button
                                    className="px-12 py-6 border-2 border-heading/20 text-heading font-heading font-bold text-sm tracking-wide hover:bg-heading hover:text-inverse transition-all"
                                    radius="none"
                                    variant="bordered"
                                >
                                    XEM THÊM ĐÁNH GIÁ
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
