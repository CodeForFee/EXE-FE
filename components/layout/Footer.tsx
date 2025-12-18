"use client";

import { Link } from "@heroui/react";
import { Facebook, Instagram, Twitter, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-green-950 text-cream mt-auto border-t border-white/10">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2 space-y-5">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-cream flex items-center justify-center text-green-950 font-heading font-extrabold text-xl group-hover:bg-white transition-colors duration-300">
                U
              </div>
              <div className="flex flex-col text-cream">
                <span className="text-xl font-heading font-extrabold tracking-tight leading-none group-hover:text-white transition-colors">
                  UNIHOME
                </span>
                <span className="text-[9px] font-heading text-cream/40 tracking-[0.2em] uppercase">
                  Living Space
                </span>
              </div>
            </Link>
            <p className="text-cream font-body text-sm leading-relaxed max-w-sm opacity-90">
              Nền tảng mua bán nội thất giá rẻ cho sinh viên.
              Trao quyền cho bạn tạo ra không gian sống thoải mái,
              phong cách và tiết kiệm nhất.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <Link href="#" className="p-2 bg-white/10 rounded-full text-cream hover:text-white hover:bg-white/20 transition-all">
                <Facebook className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full text-cream hover:text-white hover:bg-white/20 transition-all">
                <Instagram className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full text-cream hover:text-white hover:bg-white/20 transition-all">
                <MessageCircle className="w-4 h-4" />
              </Link>
              <Link href="#" className="p-2 bg-white/10 rounded-full text-cream hover:text-white hover:bg-white/20 transition-all">
                <Twitter className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white">Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/combos" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Combo tiết kiệm
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Cộng đồng
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Về chúng tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white">Hỗ trợ</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/help" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Đổi trả & Hoàn tiền
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Đánh giá khách hàng
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-cream/80 font-body text-sm hover:text-white transition-colors">
                  Câu hỏi thường gặp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-heading font-medium tracking-widest uppercase text-cream/60">
          <p>&copy; {new Date().getFullYear()} UNIHOME. TRANG TRÍ CUỘC SỐNG SINH VIÊN.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-cream/60 hover:text-white transition-colors text-[11px]">Bảo mật</Link>
            <Link href="/terms" className="text-cream/60 hover:text-white transition-colors text-[11px]">Điều khoản</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

