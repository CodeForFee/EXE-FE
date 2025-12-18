"use client";

import { motion } from "framer-motion";
import {
    CurrencyDollarIcon,
    ShieldCheckIcon,
    UserGroupIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";

export default function AnimatedFeatures() {
    const features = [
        { Icon: CurrencyDollarIcon, title: "Giá cả phù hợp", desc: "Nội thất giá rẻ, combo tiết kiệm" },
        { Icon: ShieldCheckIcon, title: "Đáng tin cậy", desc: "Xác thực người bán, đánh giá minh bạch" },
        { Icon: UserGroupIcon, title: "Cộng đồng", desc: "Trao đổi, chia sẻ mẹo bài trí" },
        { Icon: SparklesIcon, title: "Bền vững", desc: "Khuyến khích tái sử dụng, giảm lãng phí" },
    ];

    return (
        <section className="py-24 bg-secondary relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-divider to-transparent" />

            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mb-16"
                >
                    <span className="editorial-badge mb-4 inline-block">Tại sao chọn chúng tôi</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-heading leading-tight tracking-tighter">
                        Được thiết kế cho
                        <span className="text-green-700"> cuộc sống sinh viên</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-card border border-divider hover:border-green-600/30 transition-all group"
                        >
                            <feature.Icon className="w-10 h-10 text-green-700 mb-4 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-heading font-bold text-heading mb-2 group-hover:text-green-700 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-body font-body text-sm">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
