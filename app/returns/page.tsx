"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button, Input } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowPathIcon,
    TruckIcon,
    ShieldCheckIcon,
    ClockIcon,
    CheckCircleIcon,
    ExclamationCircleIcon,
    ChevronRightIcon,
    MagnifyingGlassIcon,
    QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const policies = [
    {
        icon: ClockIcon,
        title: "7 ngày đổi trả miễn phí",
        description: "Áp dụng cho sản phẩm còn nguyên tem mác, chưa qua sử dụng",
    },
    {
        icon: ShieldCheckIcon,
        title: "Bảo hành 12 tháng",
        description: "Bảo hành chính hãng tại các trung tâm ủy quyền",
    },
    {
        icon: TruckIcon,
        title: "Miễn phí vận chuyển đổi trả",
        description: "UniHome chi trả phí ship khi đổi trả sản phẩm lỗi",
    },
];

const steps = [
    { step: 1, title: "Kiểm tra điều kiện", description: "Sản phẩm còn trong thời hạn đổi trả, còn nguyên tem mác" },
    { step: 2, title: "Liên hệ UniHome", description: "Gọi hotline hoặc chat với tư vấn viên để được hỗ trợ" },
    { step: 3, title: "Gửi sản phẩm", description: "Đóng gói và gửi sản phẩm về kho UniHome (miễn phí ship)" },
    { step: 4, title: "Nhận hoàn tiền/sản phẩm mới", description: "Trong vòng 3-5 ngày làm việc kể từ khi nhận được hàng" },
];

const faqs = [
    {
        q: "Điều kiện để được đổi trả là gì?",
        a: "Sản phẩm còn trong thời hạn 7 ngày kể từ ngày nhận hàng, còn nguyên tem mác, chưa qua sử dụng, không bị hư hỏng do lỗi người dùng.",
    },
    {
        q: "Tôi có được hoàn tiền không nếu không muốn đổi sản phẩm?",
        a: "Có, bạn có thể chọn hoàn tiền 100% về tài khoản ngân hàng hoặc ví điện tử trong vòng 3-5 ngày làm việc.",
    },
    {
        q: "Ai sẽ chịu phí vận chuyển khi đổi trả?",
        a: "Nếu sản phẩm bị lỗi do nhà sản xuất, UniHome sẽ chịu toàn bộ phí ship. Nếu đổi trả vì lý do cá nhân, phí ship sẽ do khách hàng chi trả.",
    },
    {
        q: "Làm sao để theo dõi tiến độ đổi trả?",
        a: "Bạn có thể theo dõi trạng thái đổi trả trong mục 'Đơn hàng' tại trang tài khoản hoặc liên hệ hotline để được cập nhật.",
    },
];

export default function ReturnsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                {/* Hero */}
                <section className="py-20 bg-green-950 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?q=80&w=1600&auto=format&fit=crop"
                            className="w-full h-full object-cover opacity-20"
                            alt="Returns background"
                        />
                        <div className="absolute inset-0 bg-green-950/60" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <span className="text-[11px] font-heading font-bold text-green-400 tracking-[0.2em] uppercase mb-4 block">
                                Chính sách hỗ trọng
                            </span>
                            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-cream leading-tight tracking-tighter mb-6">
                                Đổi trả & Hoàn tiền
                            </h1>
                            <p className="text-xl text-cream/70 font-body italic">
                                UniHome cam kết mang đến trải nghiệm mua sắm an tâm với chính sách đổi trả linh hoạt,
                                bảo vệ quyền lợi tối đa cho khách hàng.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Policy Cards */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {policies.map((policy, i) => (
                                <motion.div
                                    key={policy.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-card border border-divider p-8 text-center hover:border-green-600/50 transition-colors"
                                >
                                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <policy.icon className="w-8 h-8 text-green-700" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-heading mb-3">{policy.title}</h3>
                                    <p className="text-body font-body">{policy.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Steps */}
                <section className="py-16 bg-secondary">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-heading font-bold text-heading mb-4">Quy trình đổi trả</h2>
                            <p className="text-body font-body">4 bước đơn giản để đổi trả sản phẩm</p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="relative"
                                >
                                    <div className="bg-card border border-divider p-6">
                                        <span className="w-12 h-12 bg-green-700 text-white rounded-full flex items-center justify-center font-heading font-bold text-xl mb-4">
                                            {step.step}
                                        </span>
                                        <h4 className="font-heading font-bold text-heading mb-2">{step.title}</h4>
                                        <p className="text-sm text-body font-body">{step.description}</p>
                                    </div>
                                    {i < 3 && (
                                        <ChevronRightIcon className="hidden md:block w-6 h-6 text-muted absolute top-1/2 -right-3 -translate-y-1/2" />
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Check Order */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto bg-card border border-divider p-8"
                        >
                            <h2 className="text-2xl font-heading font-bold text-heading mb-6 text-center">
                                Kiểm tra trạng thái đổi trả
                            </h2>
                            <div className="flex gap-3">
                                <Input
                                    placeholder="Nhập mã đơn hàng (VD: UH-2024001)"
                                    classNames={{
                                        input: "font-body",
                                        inputWrapper: "border border-divider bg-main hover:border-green-600/50"
                                    }}
                                    radius="none"
                                    startContent={<MagnifyingGlassIcon className="w-5 h-5 text-muted" />}
                                />
                                <Button
                                    className="px-8 bg-green-900 text-cream font-heading font-bold"
                                    radius="none"
                                >
                                    TRA CỨU
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* FAQs */}
                <section className="py-16 bg-secondary">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-heading font-bold text-heading mb-4">Câu hỏi thường gặp</h2>
                        </motion.div>

                        <div className="max-w-3xl mx-auto space-y-4">
                            {faqs.map((faq, i) => (
                                <motion.details
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-card border border-divider group"
                                >
                                    <summary className="p-6 cursor-pointer font-heading font-bold text-heading flex items-center justify-between">
                                        <span className="flex items-center gap-3">
                                            <QuestionMarkCircleIcon className="w-5 h-5 text-green-700" />
                                            {faq.q}
                                        </span>
                                        <ChevronRightIcon className="w-5 h-5 text-muted transition-transform group-open:rotate-90" />
                                    </summary>
                                    <div className="px-6 pb-6 text-body font-body border-t border-divider pt-4">
                                        {faq.a}
                                    </div>
                                </motion.details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-green-900 p-12 text-center text-white"
                        >
                            <h2 className="text-3xl font-heading font-bold mb-4">Cần hỗ trợ thêm?</h2>
                            <p className="text-green-200 mb-8 max-w-xl mx-auto font-body">
                                Đội ngũ chăm sóc khách hàng của UniHome luôn sẵn sàng hỗ trợ bạn 24/7
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    className="px-8 py-6 bg-white text-green-900 font-heading font-bold"
                                    radius="none"
                                >
                                    GỌI HOTLINE: 1900-XXXX
                                </Button>
                                <Button
                                    variant="bordered"
                                    className="px-8 py-6 border-2 border-white text-white font-heading font-bold hover:bg-white hover:text-green-900"
                                    radius="none"
                                >
                                    CHAT VỚI TƯ VẤN VIÊN
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
