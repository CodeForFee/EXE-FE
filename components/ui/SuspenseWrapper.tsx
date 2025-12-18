"use client";

import { Suspense, ReactNode } from "react";
import { Skeleton } from "./Skeleton";

interface SuspenseWrapperProps {
    children: ReactNode;
    fallback?: ReactNode;
    type?: "card" | "table" | "stats" | "list";
    count?: number;
}

export default function SuspenseWrapper({
    children,
    fallback,
    type = "card",
    count = 3
}: SuspenseWrapperProps) {
    const getFallback = () => {
        if (fallback) return fallback;

        switch (type) {
            case "card":
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: count }).map((_, i) => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="aspect-[4/3] w-full" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                );
            case "table":
                return (
                    <div className="space-y-4">
                        {Array.from({ length: count }).map((_, i) => (
                            <Skeleton key={i} className="h-12 w-full" />
                        ))}
                    </div>
                );
            default:
                return <Skeleton className="h-20 w-full" />;
        }
    };

    return <Suspense fallback={getFallback()}>{children}</Suspense>;
}
