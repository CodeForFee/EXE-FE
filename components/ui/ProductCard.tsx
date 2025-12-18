"use client";

import { Image } from "@heroui/react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating?: number;
}

export default function ProductCard({
  id,
  title,
  price,
  originalPrice,
  image,
  badge,
  rating,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <Link href={`/products/${id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x500?text=UNIHOME";
            }}
          />

          {/* Editorial Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Corner Frame on Hover */}
          <div className="absolute inset-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cream/60" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cream/60" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cream/60" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cream/60" />
          </div>

          {/* Badge */}
          {badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className="editorial-badge">
                {badge}
              </span>
            </div>
          )}

          {/* Discount */}
          {discount > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-2 py-1 bg-terracotta text-cream text-xs font-heading font-bold">
                -{discount}%
              </span>
            </div>
          )}

          {/* Quick View on Hover */}
          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-cream text-green-900 font-heading font-bold text-sm tracking-wide">
              XEM CHI TIẾT →
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] font-heading font-bold text-muted tracking-[0.15em] uppercase">
            <span>Nội thất</span>
            {rating && (
              <span className="flex items-center gap-1">
                <span className="text-warning">★</span>
                {rating.toFixed(1)}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-heading font-bold text-heading leading-tight group-hover:text-green-700 transition-colors duration-300">
            {title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-2">
            <span className="text-2xl font-heading font-extrabold text-green-800">
              {price.toLocaleString("vi-VN")}₫
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted line-through font-body">
                {originalPrice.toLocaleString("vi-VN")}₫
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
