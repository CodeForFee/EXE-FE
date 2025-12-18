"use client";

import { useLoadingStore } from "@/lib/stores/useLoadingStore";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function PageLoader() {
    const { isLoading, message } = useLoadingStore();

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md"
                >
                    <div className="relative w-24 h-24">
                        <Image
                            src="/loading.svg"
                            alt="Loading..."
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    {message && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-4 text-sm font-heading font-medium text-heading tracking-widest uppercase"
                        >
                            {message}
                        </motion.p>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
