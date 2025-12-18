"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                "animate-pulse bg-divider/50 rounded-md",
                className
            )}
        />
    );
}

export function ProductCardSkeleton() {
    return (
        <div className="flex flex-col gap-4 border border-divider p-4 h-full">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </div>
        </div>
    );
}

export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <div className="flex items-center gap-4 p-4 border-b border-divider">
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} className={cn("h-4 flex-1", i === 0 && "flex-[2]")} />
            ))}
        </div>
    );
}

export function StatsCardSkeleton() {
    return (
        <div className="p-6 border border-divider bg-card">
            <div className="flex justify-between items-start mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-10" />
            </div>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-16" />
        </div>
    );
}
