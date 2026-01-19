"use client";

import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";
import {
    Squares2X2Icon,
    UsersIcon,
    ShoppingBagIcon,
    ClipboardDocumentListIcon,
    Cog6ToothIcon,
    TagIcon,
    TicketIcon
} from "@heroicons/react/24/outline";

export default function AdminSidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: "Overview", href: "/admin", icon: Squares2X2Icon },
        { name: "Users", href: "/admin/users", icon: UsersIcon },
        { name: "Products", href: "/admin/products", icon: ShoppingBagIcon },
        { name: "Categories", href: "/admin/categories", icon: TagIcon },
        { name: "Discounts", href: "/admin/discounts", icon: TicketIcon },
        { name: "Orders", href: "/admin/orders", icon: ClipboardDocumentListIcon },
        { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
    ];

    return (
        <aside className="w-64 bg-green-950 text-cream h-screen fixed left-0 top-0 overflow-y-auto flex flex-col border-r border-green-900/50 shadow-xl z-50">
            {/* Logo Area */}
            <div className="h-20 flex items-center gap-3 px-6 border-b border-green-900/50 bg-green-950 sticky top-0 z-10">
                <div className="w-8 h-8 bg-cream text-green-950 rounded flex items-center justify-center font-heading font-extrabold text-lg">
                    U
                </div>
                <div className="flex flex-col">
                    <span className="font-heading font-extrabold text-lg tracking-tight leading-none text-cream">
                        UNIHOME
                    </span>
                    <span className="text-[10px] font-heading text-cream/60 tracking-[0.2em] uppercase">
                        Admin Panel
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                ? "bg-green-900/50 text-cream shadow-sm border border-green-800/50"
                                : "text-cream/70 hover:bg-green-900/30 hover:text-cream"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-cream" : "text-cream/70 group-hover:text-cream"}`} />
                            <span className={`font-heading font-medium text-sm tracking-wide ${isActive ? "font-semibold" : ""}`}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / Version */}
            <div className="p-6 border-t border-green-900/50">
                <div className="bg-green-900/30 rounded-lg p-3">
                    <p className="text-[10px] text-cream/50 uppercase tracking-widest font-heading mb-1">System Status</p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-medium text-green-400">Online</span>
                    </div>
                </div>
                <p className="text-[10px] text-cream/30 text-center mt-4 font-mono">v1.0.0 (Admin)</p>
            </div>
        </aside>
    );
}
