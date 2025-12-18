"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoadingStore } from "@/lib/stores/useLoadingStore";

export default function RouteLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { setIsLoading } = useLoadingStore();

    useEffect(() => {
        // Trigger loading on route change
        setIsLoading(true);

        // Simulate a brief loading period to allow the animation to be seen
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [pathname, searchParams, setIsLoading]);

    return null;
}
