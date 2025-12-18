"use client";

import { StatsCardSkeleton, TableRowSkeleton, Skeleton } from "@/components/ui/Skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen bg-main">
            <Header />
            <main className="flex-grow pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Skeleton */}
                        <aside className="w-full lg:w-64 space-y-2">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <Skeleton key={i} className="h-12 w-full" />
                            ))}
                        </aside>

                        {/* Main Content Skeleton */}
                        <div className="flex-1 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <StatsCardSkeleton key={i} />
                                ))}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-4">
                                    <Skeleton className="h-8 w-48" />
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <TableRowSkeleton key={i} columns={6} />
                                    ))}
                                </div>
                                <div className="space-y-4">
                                    <Skeleton className="h-8 w-48" />
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <Skeleton className="w-12 h-12 rounded-full" />
                                            <div className="space-y-2 flex-1">
                                                <Skeleton className="h-4 w-full" />
                                                <Skeleton className="h-3 w-2/3" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
