"use client";

import { motion } from "framer-motion";

const features = [
  {
    number: "01",
    title: "Giá cả phù hợp",
    description: "Nội thất giá rẻ, combo tiết kiệm, đồ second-hand có kiểm định chất lượng.",
    accent: "bg-terracotta",
  },
  {
    number: "02",
    title: "Marketplace đáng tin cậy",
    description: "Xác thực người bán, hệ thống đánh giá minh bạch và bảo vệ người mua.",
    accent: "bg-olive",
  },
  {
    number: "03",
    title: "Cộng đồng sinh viên",
    description: "Trao đổi, tặng/nhượng, chia sẻ mẹo bài trí và kết nối bạn bè.",
    accent: "bg-green-600",
  },
  {
    number: "04",
    title: "Tiêu dùng bền vững",
    description: "Khuyến khích tái sử dụng, tân trang đồ cũ, giảm lãng phí tài nguyên.",
    accent: "bg-wood-medium",
  },
];

export default function FeatureSection() {
  return (
    <section className="py-32 bg-secondary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-divider to-transparent" />
      <div className="absolute -top-40 -right-40 w-96 h-96 border border-green-600/10 rounded-full" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 border border-green-600/10 rounded-full" />

      <div className="container mx-auto px-4">
        {/* Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-20"
        >
          <span className="editorial-badge mb-6 inline-block">Tại sao chọn chúng tôi</span>
          <h2 className="text-4xl md:text-6xl font-heading font-extrabold text-heading leading-[0.95] tracking-tighter mb-6">
            Được thiết kế cho
            <br />
            <span className="text-green-700">cuộc sống sinh viên</span>
          </h2>
          <p className="text-xl text-body font-body italic max-w-xl">
            Chúng tôi hiểu nhu cầu và khả năng tài chính đặc thù của bạn —
            <span className="not-italic font-semibold"> vì chúng tôi cũng từng là sinh viên.</span>
          </p>
        </motion.div>

        {/* Asymmetric Feature Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`
                col-span-12 
                ${index === 0 ? 'md:col-span-7' : ''}
                ${index === 1 ? 'md:col-span-5' : ''}
                ${index === 2 ? 'md:col-span-5' : ''}
                ${index === 3 ? 'md:col-span-7' : ''}
              `}
            >
              <div className="group relative h-full p-8 md:p-12 bg-card border border-divider hover:border-green-600/30 transition-all duration-500 hover-lift">
                {/* Corner Decoration */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Number */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-6xl md:text-8xl font-heading font-extrabold text-divider/60 leading-none group-hover:text-green-600/20 transition-colors duration-500">
                    {feature.number}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${feature.accent} group-hover:scale-150 transition-transform duration-500`} />
                </div>

                {/* Content */}
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-heading mb-4 group-hover:text-green-800 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-body font-body leading-relaxed max-w-md">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0">
                  <div className="w-8 h-[1px] bg-green-600" />
                  <span className="text-sm font-heading font-bold text-green-600 tracking-wide">Tìm hiểu thêm</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
