import { ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-32">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}
