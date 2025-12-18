"use client";

import { Button, Link } from "@heroui/react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut" as const
      }
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1, x: 100 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: "easeOut" as const,
        delay: 0.4
      }
    },
  };


  return (
    <section className="relative min-h-screen overflow-hidden bg-main">
      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-divider/40" />
        <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-divider/20" />
        <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-divider/40" />
      </div>

      {/* Diagonal Accent */}
      <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-green-600/5 rotate-12 rounded-[80px]" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-green-600 to-transparent" />

      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="grid grid-cols-12 gap-4 md:gap-8 items-center min-h-[80vh]">

          {/* Left Content - Asymmetric */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="col-span-12 lg:col-span-6 xl:col-span-5"
          >
            {/* Editorial Badge */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="editorial-badge">
                ✦ Bộ sưu tập 2024
              </span>
            </motion.div>

            {/* Massive Editorial Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-[clamp(3rem,8vw,7rem)] font-heading font-extrabold text-heading leading-[0.85] tracking-tighter mb-8"
            >
              KHÔNG GIAN
              <br />
              <span className="text-green-700">SỐNG</span>
              <br />
              <span className="outline-text text-green-600/30">ĐÍCH THỰC</span>
            </motion.h1>

            {/* Italic Editorial Subhead */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-body font-body italic leading-relaxed mb-12 max-w-lg"
            >
              Biến căn phòng trọ thành không gian đầy cảm hứng.
              <span className="not-italic font-semibold text-heading"> Nội thất tinh tế, giá sinh viên.</span>
            </motion.p>

            {/* Asymmetric Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                as={Link}
                href="/products"
                className="px-10 py-7 bg-green-900 text-cream font-heading font-bold text-base tracking-wide hover:bg-green-700 transition-all duration-500 hover:-translate-y-1 shadow-hard"
                radius="none"
              >
                KHÁM PHÁ NGAY →
              </Button>
              <Button
                as={Link}
                href="/combos"
                variant="bordered"
                className="px-10 py-7 border-2 border-heading/20 text-heading font-heading font-bold text-base tracking-wide hover:bg-heading hover:text-inverse transition-all duration-500 hover:-translate-y-1"
                radius="none"
              >
                COMBO TIẾT KIỆM
              </Button>
            </motion.div>

            {/* Editorial Stats */}
            <motion.div
              variants={itemVariants}
              className="mt-16 pt-8 border-t border-divider flex gap-12"
            >
              <div>
                <span className="block text-4xl font-heading font-extrabold text-green-700">2K+</span>
                <span className="text-sm text-muted tracking-wide">Sản phẩm</span>
              </div>
              <div>
                <span className="block text-4xl font-heading font-extrabold text-green-700">15K</span>
                <span className="text-sm text-muted tracking-wide">Sinh viên tin dùng</span>
              </div>
              <div>
                <span className="block text-4xl font-heading font-extrabold text-green-700">4.9★</span>
                <span className="text-sm text-muted tracking-wide">Đánh giá</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Editorial Image Composition */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="col-span-12 lg:col-span-6 xl:col-span-7 relative"
          >
            {/* Main Image */}
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden corner-decoration">
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1000&auto=format&fit=crop"
                alt="Không gian nội thất hiện đại"
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-main/40 via-transparent to-transparent" />

              {/* Floating Label */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-card/90 backdrop-blur-sm border border-divider">
                <span className="text-[10px] font-heading font-bold text-muted tracking-[0.2em] uppercase">Xu hướng</span>
                <h3 className="text-xl font-heading font-bold text-heading mt-1">Phong cách tối giản Bắc Âu</h3>
              </div>
            </div>

            {/* Offset Secondary Image */}
            <div className="hidden xl:block absolute -bottom-12 -left-16 w-[200px] aspect-square overflow-hidden border-4 border-card shadow-dramatic">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop"
                alt="Chi tiết nội thất"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-2 border-green-600/30" />
          </motion.div>

        </div>
      </div>

      {/* Editorial Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 flex items-center gap-4"
      >
        <div className="w-12 h-[1px] bg-heading/30" />
        <span className="text-[10px] font-heading font-bold text-muted tracking-[0.3em] uppercase">
          Cuộn xuống
        </span>
      </motion.div>
    </section>
  );
}
