"use client";

import { useSessionStore } from "@/lib/stores/useSessionStore";
import { authService } from "@/lib/api/services/auth";
import { useRouter } from "next/navigation";
import { ArrowLeftOnRectangleIcon, BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";

export default function AdminHeader() {
    const user = useSessionStore((state) => state.user);
    const clearSession = useSessionStore((state) => state.clearSession);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await authService.logoutClient();
            await authService.logoutServer();
            clearSession();
            router.push("/login");
            router.refresh();
        } catch (error) {
            console.error("Logout error:", error);
            clearSession();
            router.push("/login");
        }
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="h-20 bg-white border-b border-divider fixed top-0 right-0 left-64 z-40 px-8 flex items-center justify-between shadow-sm">
            {/* Left: Search (Placeholder) */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 group-focus-within:text-green-700 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-green-700/50 focus:border-green-700/50 sm:text-sm transition-all duration-200"
                        placeholder="Search anything..."
                    />
                </div>
            </div>

            {/* Right: Actions & Profile */}
            <div className="flex items-center gap-6">
                {/* Notifications */}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors focus:outline-none">
                    <BellIcon className="w-6 h-6" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-[1px] bg-divider"></div>

                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-3 outline-none group cursor-pointer"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-heading leading-tight group-hover:text-green-800 transition-colors">
                                {user?.fullName || "Admin User"}
                            </p>
                            <p className="text-[10px] text-muted font-heading uppercase tracking-wider">
                                {user?.role || "Administrator"}
                            </p>
                        </div>
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt="Profile"
                                className="w-10 h-10 rounded-full object-cover border-2 border-transparent group-hover:border-green-100 transition-colors"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center border-2 border-transparent group-hover:border-green-200 transition-colors">
                                {user?.fullName?.charAt(0) || "A"}
                            </div>
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-divider py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="px-4 py-3 border-b border-divider">
                                <p className="text-xs text-muted font-semibold">Signed in as</p>
                                <p className="text-sm font-bold text-heading truncate">{user?.email}</p>
                            </div>
                            <div className="py-1">
                                <button
                                    onClick={() => router.push("/admin/settings")}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Settings
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                    Help & Feedback
                                </button>
                            </div>
                            <div className="py-1 border-t border-divider">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
