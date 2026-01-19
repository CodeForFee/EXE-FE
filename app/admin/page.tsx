"use client";

import {
    BanknotesIcon,
    UserGroupIcon,
    ShoppingBagIcon,
    TagIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon
} from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { userService } from "@/lib/api/services/user";
import { furnitureService } from "@/lib/api/services/furniture";
import { categoryService } from "@/lib/api/services/category";
import { Spinner } from "@heroui/react";

export default function AdminDashboard() {
    // Fetch Stats
    const { data: usersData, isLoading: isLoadingUsers } = useQuery({
        queryKey: ['admin', 'stats', 'users'],
        queryFn: () => userService.getAllUsers(0, 1) // Just need count
    });

    const { data: productsData, isLoading: isLoadingProducts } = useQuery({
        queryKey: ['admin', 'stats', 'products'],
        queryFn: () => furnitureService.getAllFurniture(0, 1)
    });

    const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
        queryKey: ['admin', 'stats', 'categories'],
        queryFn: () => categoryService.getAllCategories(0, 1)
    });

    const isLoading = isLoadingUsers || isLoadingProducts || isLoadingCategories;

    const stats = [
        {
            name: "Total Users",
            value: usersData?.totalElements || 0,
            change: "Active",
            trend: "up",
            icon: UserGroupIcon,
            color: "bg-blue-100 text-blue-700"
        },
        {
            name: "Total Products",
            value: productsData?.totalElements || 0,
            change: "In Stock",
            trend: "up",
            icon: ShoppingBagIcon,
            color: "bg-orange-100 text-orange-700"
        },
        {
            name: "Categories",
            value: categoriesData?.totalElements || 0,
            change: "Types",
            trend: "flat",
            icon: TagIcon,
            color: "bg-purple-100 text-purple-700"
        },
        {
            name: "Est. Revenue",
            value: "---",
            change: "Coming Soon",
            trend: "flat",
            icon: BanknotesIcon,
            color: "bg-green-100 text-green-700"
        },
    ];

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Spinner size="lg" color="success" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-heading font-bold text-heading text-green-950">Dashboard Overview</h1>
                <p className="text-muted mt-2">Welcome back! Here's what's happening with your store today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-xl border border-divider shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted uppercase tracking-wider">{stat.name}</p>
                                <p className="text-3xl font-bold text-heading mt-2">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2">
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                {stat.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity (Placeholder) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Placeholder */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-divider shadow-sm min-h-[400px]">
                    <h3 className="text-lg font-heading font-bold text-heading mb-6">System Analytics</h3>
                    <div className="flex flex-col items-center justify-center h-full text-muted bg-gray-50 rounded-lg border border-dashed border-gray-200 p-8 text-center">
                        <p className="font-semibold mb-2">Detailed Analytics Coming Soon</p>
                        <p className="text-sm">Revenue charts and order trends will appear here once the Order module is integrated.</p>
                    </div>
                </div>

                {/* Quick Actions (Replaces Recent Orders for now) */}
                <div className="bg-white p-6 rounded-xl border border-divider shadow-sm">
                    <h3 className="text-lg font-heading font-bold text-heading mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                        <button className="w-full p-3 text-left rounded-lg hover:bg-green-50 text-sm font-medium text-green-800 transition-colors border border-transparent hover:border-green-100 flex items-center justify-between group">
                            Add New Product
                            <span className="text-green-600 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <button className="w-full p-3 text-left rounded-lg hover:bg-green-50 text-sm font-medium text-green-800 transition-colors border border-transparent hover:border-green-100 flex items-center justify-between group">
                            Manage Users
                            <span className="text-green-600 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                        <button className="w-full p-3 text-left rounded-lg hover:bg-green-50 text-sm font-medium text-green-800 transition-colors border border-transparent hover:border-green-100 flex items-center justify-between group">
                            Update Settings
                            <span className="text-green-600 group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
