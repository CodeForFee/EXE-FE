"use client";

import { motion } from "framer-motion";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function HomeTestimonials() {
    const testimonials = [
        { quote: "UNIHOME giúp mình tìm được đồ nội thất cũ chất lượng với giá rẻ bất ngờ!", name: "Minh Anh", school: "ĐH Bách Khoa" },
        { quote: "Phòng trọ của mình giờ đẹp hơn nhiều nhờ những gợi ý từ cộng đồng.", name: "Thu Hà", school: "ĐH Kinh tế" },
        { quote: "Ship nhanh, đóng gói cẩn thận. Sẽ quay lại mua tiếp!", name: "Đức Minh", school: "ĐH FPT" },
    ];

    return (
        <section className="py-24 bg-secondary">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="editorial-badge mb-4 inline-block">Cảm nhận</span>
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-heading tracking-tighter">
                        Sinh viên nói gì về chúng tôi
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.blockquote
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 bg-card border border-divider"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, j) => (
                                    <StarSolidIcon key={j} className="w-4 h-4 text-warning" />
                                ))}
                            </div>
                            <p className="text-lg font-body italic text-body mb-6 leading-relaxed">"{t.quote}"</p>
                            <footer>
                                <span className="font-heading font-bold text-heading block">{t.name}</span>
                                <span className="text-sm text-muted font-heading">{t.school}</span>
                            </footer>
                        </motion.blockquote>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/reviews"
                        className="inline-flex items-center gap-2 text-heading font-heading font-bold text-sm tracking-widest uppercase hover:text-green-700 transition-colors group"
                    >
                        Xem tất cả đánh giá
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
