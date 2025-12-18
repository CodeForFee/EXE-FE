"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/stores/useCartStore";
import { ShoppingBagIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const menuItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/products" },
    { name: "Combo", href: "/combos" },
    { name: "Cộng đồng", href: "/community" },
    { name: "Về chúng tôi", href: "/about" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Editorial Bar */}
      <div className="bg-green-950 text-cream/70 text-[11px] font-heading font-medium tracking-[0.1em] uppercase py-2 text-center hidden md:block">
        <span className="opacity-60">✦</span>
        <span className="mx-4">Miễn phí vận chuyển cho đơn từ 500K</span>
        <span className="opacity-60">✦</span>
      </div>

      {/* Main Navigation */}
      <nav className="bg-main/95 backdrop-blur-md border-b border-divider">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-green-900 flex items-center justify-center text-cream font-heading font-extrabold text-lg group-hover:bg-green-700 transition-colors duration-300">
                U
              </div>
              <div className="flex flex-col">
                <span className="text-heading font-heading font-extrabold text-xl tracking-tight leading-none">
                  UNIHOME
                </span>
                <span className="text-[9px] font-heading text-muted tracking-[0.2em] uppercase">
                  Living Space
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-12">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative text-body font-heading font-semibold text-[13px] tracking-[0.05em] uppercase hover:text-green-700 transition-colors duration-300 py-2 group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-700 transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Messages */}
              <Link
                href="/messages"
                className="relative p-2 hover:bg-secondary transition-colors"
              >
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-heading" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 hover:bg-secondary transition-colors"
              >
                <ShoppingBagIcon className="w-6 h-6 text-heading" />
                {isClient && getTotalItems() > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-terracotta text-white text-[10px] font-heading font-bold flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </span>
                )}
              </Link>

              <Link
                href="/login"
                className="hidden md:block text-body font-heading font-semibold text-[13px] tracking-wide hover:text-green-700 transition-colors"
              >
                Đăng nhập
              </Link>
              <Button
                as={Link}
                href="/register"
                className="px-6 py-5 bg-green-900 text-cream font-heading font-bold text-[12px] tracking-[0.1em] uppercase hover:bg-green-700 transition-all duration-300"
                radius="none"
              >
                Đăng ký
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
                aria-label="Toggle menu"
              >
                <span className={`w-6 h-0.5 bg-heading transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-6 h-0.5 bg-heading transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-6 h-0.5 bg-heading transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 top-[calc(2.5rem+5rem)] bg-main z-40 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-6">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-2xl font-heading font-bold text-heading hover:text-green-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-muted/40 text-sm mr-4">0{index + 1}</span>
                {item.name}
              </Link>
            ))}
            <div className="pt-6 border-t border-divider">
              <Link
                href="/login"
                className="text-lg font-heading font-semibold text-muted hover:text-green-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Đăng nhập →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
