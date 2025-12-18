"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ChatBubbleLeftRightIcon,
    ArrowPathIcon,
    LightBulbIcon,
    TrophyIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const features = [
    {
        Icon: ChatBubbleLeftRightIcon,
        title: "Diễn đàn thảo luận",
        description: "Chia sẻ kinh nghiệm trang trí, hỏi đáp và kết nối với sinh viên khác."
    },
    {
        Icon: ArrowPathIcon,
        title: "Trao đổi đồ cũ",
        description: "Mua bán, trao đổi hoặc tặng đồ nội thất không còn sử dụng."
    },
    {
        Icon: LightBulbIcon,
        title: "Ý tưởng thiết kế",
        description: "Khám phá inspiration và xu hướng trang trí phòng trọ."
    },
    {
        Icon: TrophyIcon,
        title: "Cuộc thi & Sự kiện",
        description: "Tham gia các cuộc thi trang trí và nhận giải thưởng hấp dẫn."
    },
];

const testimonials = [
    {
        quote: "Nhờ cộng đồng UNIHOME mà mình tìm được bộ bàn ghế cũ giá rẻ chỉ bằng 1/3 mua mới!",
        author: "Hoàng Anh",
        school: "Sinh viên ĐH Kinh tế"
    },
    {
        quote: "Học được rất nhiều mẹo hay từ các bạn trong group. Phòng trọ của mình giờ đẹp hơn nhiều.",
        author: "Thu Hà",
        school: "Sinh viên ĐH Ngoại thương"
    },
    {
        quote: "Tham gia cuộc thi decor phòng và bất ngờ giành giải nhất! Cảm ơn UNIHOME.",
        author: "Minh Đức",
        school: "Sinh viên ĐH Bách khoa"
    },
];

export default function CommunityPage() {
    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32">
                {/* Hero */}
                <section className="py-20 bg-green-950 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
                            className="w-full h-full object-cover opacity-20"
                            alt="Background"
                        />
                        <div className="absolute inset-0 bg-green-950/60" />
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600/10 blur-[100px]" />
                        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-green-400/5 blur-[80px]" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-12 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="col-span-12 lg:col-span-7"
                            >
                                <span className="text-[11px] font-heading font-bold text-green-400 tracking-[0.2em] uppercase mb-4 block">
                                    ✦ Cộng đồng 15,000+ thành viên
                                </span>
                                <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-cream leading-[0.95] tracking-tighter mb-6">
                                    Kết nối với
                                    <br />
                                    <span className="outline-text text-green-400/30">cộng đồng sinh viên</span>
                                </h1>
                                <p className="text-xl text-cream/70 font-body italic max-w-xl mb-8">
                                    Nơi chia sẻ ý tưởng, trao đổi kinh nghiệm và cùng nhau tạo nên không gian sống đẹp hơn cho sinh viên.
                                </p>
                                <Button
                                    as={Link}
                                    href="/register"
                                    className="px-10 py-7 bg-cream text-green-900 font-heading font-bold text-base tracking-wide hover:bg-green-400 transition-all inline-flex items-center gap-2"
                                    radius="none"
                                >
                                    THAM GIA NGAY <ArrowRightIcon className="w-5 h-5" />
                                </Button>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="editorial-badge mb-4 inline-block">Tính năng</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">
                                Khám phá cộng đồng
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 bg-card border border-divider hover:border-green-600/30 transition-all text-center group"
                                >
                                    <feature.Icon className="w-10 h-10 text-green-700 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                    <h3 className="text-xl font-heading font-bold text-heading mb-3 group-hover:text-green-700 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-body font-body text-sm">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <span className="editorial-badge mb-4 inline-block">Cảm nhận</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">
                                Thành viên nói gì
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {testimonials.map((item, index) => (
                                <motion.blockquote
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 bg-card border border-divider"
                                >
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(5)].map((_, j) => (
                                            <StarIcon key={j} className="w-4 h-4 text-warning" />
                                        ))}
                                    </div>
                                    <p className="text-lg font-body italic text-body mb-6 leading-relaxed">
                                        "{item.quote}"
                                    </p>
                                    <footer>
                                        <cite className="not-italic">
                                            <span className="font-heading font-bold text-heading block">{item.author}</span>
                                            <span className="text-sm text-muted font-heading">{item.school}</span>
                                        </cite>
                                    </footer>
                                </motion.blockquote>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6 tracking-tight">
                                Sẵn sàng tham gia?
                            </h2>
                            <p className="text-lg text-body font-body mb-8">
                                Đăng ký miễn phí và bắt đầu kết nối với cộng đồng sinh viên yêu thích nội thất ngay hôm nay.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    as={Link}
                                    href="/register"
                                    className="px-10 py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-wide hover:bg-green-700 transition-all"
                                    radius="none"
                                >
                                    ĐĂNG KÝ MIỄN PHÍ
                                </Button>
                                <Button
                                    as={Link}
                                    href="/about"
                                    variant="bordered"
                                    className="px-10 py-7 border-2 border-heading/20 text-heading font-heading font-bold text-base tracking-wide hover:bg-heading hover:text-inverse transition-all"
                                    radius="none"
                                >
                                    TÌM HIỂU THÊM
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
