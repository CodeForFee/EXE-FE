"use client";

import { useSessionStore } from "@/lib/stores/useSessionStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useSessionStore((state) => state.user);
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Give time for auth context to initialize
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Wait for initial load
        if (isLoading) return;

        if (!user) {
            router.push("/login?redirect=/admin");
            return;
        }

        if (user.role !== "ADMIN" && user.role !== "STAFF") {
            router.push("/"); // Redirect unauthorized users to home
            return;
        }

        setIsAuthorized(true);
    }, [user, isLoading, router]);

    if (isLoading || !isAuthorized) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
                <p className="text-muted font-heading text-sm animate-pulse tracking-widest uppercase">Verifying Access...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex font-body">
            <AdminSidebar />
            <div className="flex-1 flex flex-col ml-64">
                <AdminHeader />
                <main className="flex-1 pt-20 p-8 overflow-y-auto min-h-screen">
                    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
