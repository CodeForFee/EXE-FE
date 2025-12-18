"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import {
    UserGroupIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CursorArrowRaysIcon,
    CheckBadgeIcon,
    SparklesIcon,
    HandRaisedIcon,
} from "@heroicons/react/24/outline";

const team = [
    { name: "Nguyễn Văn A", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
    { name: "Trần Thị B", role: "Head of Design", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" },
    { name: "Lê Văn C", role: "CTO", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" },
];

const values = [
    { Icon: CheckBadgeIcon, number: "01", title: "Chất lượng", description: "Mỗi sản phẩm đều được kiểm định kỹ lưỡng trước khi đến tay bạn." },
    { Icon: CursorArrowRaysIcon, number: "02", title: "Giá cả hợp lý", description: "Chúng tôi hiểu túi tiền sinh viên và cam kết mức giá phải chăng nhất." },
    { Icon: SparklesIcon, number: "03", title: "Bền vững", description: "Khuyến khích tái sử dụng, giảm thiểu rác thải từ đồ nội thất." },
    { Icon: HandRaisedIcon, number: "04", title: "Cộng đồng", description: "Xây dựng mạng lưới hỗ trợ lẫn nhau giữa các sinh viên." },
];

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32">
                {/* Hero */}
                <section className="py-20 bg-secondary border-b border-divider">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-12 gap-8 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                className="col-span-12 lg:col-span-6"
                            >
                                <span className="editorial-badge mb-4 inline-block">Về chúng tôi</span>
                                <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-heading leading-[0.95] tracking-tighter mb-6">
                                    Nâng tầm không gian
                                    <br />
                                    <span className="text-green-700">sống sinh viên</span>
                                </h1>
                                <p className="text-xl text-body font-body italic max-w-lg">
                                    UNIHOME ra đời từ ý tưởng đơn giản: sinh viên xứng đáng có không gian sống đẹp mà không cần phải tốn kém.
                                </p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="col-span-12 lg:col-span-6"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=800"
                                        alt="Team working"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-green-600" />
                                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-green-600" />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="text-[11px] font-heading font-bold text-muted tracking-[0.2em] uppercase mb-6 block">
                                Sứ mệnh của chúng tôi
                            </span>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-heading leading-tight mb-8">
                                "Mỗi sinh viên đều xứng đáng có một không gian sống đẹp, tiện nghi và phản ánh cá tính của mình."
                            </h2>
                            <div className="w-24 h-1 bg-green-600 mx-auto" />
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 bg-secondary">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl mb-16">
                            <span className="editorial-badge mb-4 inline-block">Giá trị cốt lõi</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">
                                Điều làm nên UNIHOME
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.number}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-8 bg-card border border-divider hover:border-green-600/30 transition-all group"
                                >
                                    <div className="flex items-start gap-4">
                                        <value.Icon className="w-8 h-8 text-green-700 group-hover:scale-110 transition-transform flex-shrink-0" />
                                        <div>
                                            <span className="text-4xl font-heading font-extrabold text-divider/40 group-hover:text-green-600/20 transition-colors">
                                                {value.number}
                                            </span>
                                            <h3 className="text-2xl font-heading font-bold text-heading mt-2 mb-3">
                                                {value.title}
                                            </h3>
                                            <p className="text-body font-body">{value.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team */}
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <UserGroupIcon className="w-10 h-10 text-green-700 mx-auto mb-4" />
                            <span className="editorial-badge mb-4 inline-block">Đội ngũ</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading tracking-tight">
                                Những người đứng sau UNIHOME
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {team.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="relative w-40 h-40 mx-auto mb-6 overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-heading">{member.name}</h3>
                                    <p className="text-sm font-heading text-muted">{member.role}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact */}
                <section className="py-20 bg-secondary border-t border-divider">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-heading mb-6 tracking-tight">
                            Liên hệ với chúng tôi
                        </h2>
                        <p className="text-body font-body mb-10 max-w-sm mx-auto">
                            Có câu hỏi hoặc góp ý? Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
                        </p>
                        <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
                            <div className="flex items-center gap-4 text-heading font-heading">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <EnvelopeIcon className="w-6 h-6 text-green-700" />
                                </div>
                                <div className="text-left">
                                    <span className="text-[11px] font-bold text-green-700 tracking-[0.15em] uppercase block mb-1">Email</span>
                                    hello@unihome.vn
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-heading font-heading">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <PhoneIcon className="w-6 h-6 text-green-700" />
                                </div>
                                <div className="text-left">
                                    <span className="text-[11px] font-bold text-green-700 tracking-[0.15em] uppercase block mb-1">Điện thoại</span>
                                    0123 456 789
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-heading font-heading">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                    <MapPinIcon className="w-6 h-6 text-green-700" />
                                </div>
                                <div className="text-left">
                                    <span className="text-[11px] font-bold text-green-700 tracking-[0.15em] uppercase block mb-1">Địa chỉ</span>
                                    TP. Hồ Chí Minh
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
