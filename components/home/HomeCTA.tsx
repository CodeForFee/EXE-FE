"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import Link from "next/link";
import { TruckIcon } from "@heroicons/react/24/outline";

export default function HomeCTA() {
    return (
        <section className="py-24 bg-main border-t border-divider">
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TruckIcon className="w-12 h-12 text-green-700 mx-auto mb-6" />
                    <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-heading tracking-tighter mb-6">
                        Sẵn sàng thay đổi không gian sống?
                    </h2>
                    <p className="text-xl text-body font-body mb-10 max-w-2xl mx-auto">
                        Đăng ký ngay để nhận ưu đãi độc quyền và cập nhật bộ sưu tập mới nhất.
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
                            href="/products"
                            variant="bordered"
                            className="px-10 py-7 border-2 border-heading/20 text-heading font-heading font-bold text-base tracking-wide hover:bg-heading hover:text-inverse transition-all"
                            radius="none"
                        >
                            XEM SẢN PHẨM
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
