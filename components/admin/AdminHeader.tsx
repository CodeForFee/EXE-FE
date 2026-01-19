"use client";

import { useUserStore } from "@/lib/stores/useUserStore";
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { useRouter } from "next/navigation";
import { ArrowLeftOnRectangleIcon, BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function AdminHeader() {
    const { user, logout } = useUserStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

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
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <div className="flex items-center gap-3 outline-none group cursor-pointer">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-heading leading-tight group-hover:text-green-800 transition-colors">
                                    {user?.fullName || "Admin User"}
                                </p>
                                <p className="text-[10px] text-muted font-heading uppercase tracking-wider">
                                    {user?.role || "Administrator"}
                                </p>
                            </div>
                            <Avatar
                                isBordered
                                className="transition-transform group-hover:scale-105 ring-2 ring-offset-2 ring-transparent group-hover:ring-green-100"
                                color="success"
                                name={user?.fullName?.charAt(0) || "A"}
                                size="sm"
                                src={user?.image}
                            />
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat" className="p-2">
                        <DropdownItem key="profile" className="h-14 gap-2" textValue="Signed in as">
                            <p className="font-semibold text-xs text-muted">Signed in as</p>
                            <p className="font-semibold text-heading">{user?.email}</p>
                        </DropdownItem>
                        <DropdownItem key="settings" href="/admin/settings" textValue="Settings">
                            Settings
                        </DropdownItem>
                        <DropdownItem key="help_and_feedback" textValue="Help & Feedback">
                            Help & Feedback
                        </DropdownItem>
                        <DropdownItem key="logout" color="danger" onPress={handleLogout} textValue="Log Out">
                            <div className="flex items-center gap-2">
                                <ArrowLeftOnRectangleIcon className="w-4 h-4" />
                                Log Out
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    );
}
