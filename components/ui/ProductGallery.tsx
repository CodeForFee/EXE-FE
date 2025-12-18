"use client";

import { useState } from "react";
import { Image } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductGalleryProps {
    images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState(images[0]);

    return (
        <div className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] bg-secondary shadow-soft">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeImage}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full"
                    >
                        <Image
                            src={activeImage}
                            alt="Product large view"
                            className="w-full h-full object-cover"
                            radius="none"
                            removeWrapper
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${activeImage === img ? "border-green-600 scale-95 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                            }`}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            radius="none"
                            removeWrapper
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
