import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
// import { products } from "@/lib/data/products"; // Removing static data
// import { getRecommendedProducts } from "@/lib/utils/recommendations"; // Removing static logic
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { furnitureService } from "@/lib/api/services/furniture";
import { Product } from "@/lib/data/products";
import { FurnitureResponse } from "@/lib/api/types";

interface Props {
    params: Promise<{ id: string }>;
}

// Helper to map response to Product type
const mapToProduct = (p: FurnitureResponse): Product => ({
    id: p.furnitureId,
    title: p.name,
    price: p.finalPrice || p.price,
    originalPrice: p.price !== p.finalPrice ? p.price : undefined,
    discount: p.discountPercentage,
    image: p.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
    images: p.image ? [p.image] : ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"],
    rating: 5,
    reviews: 0,
    badge: p.discountPercentage ? "Giảm giá" : undefined,
    category: p.categoryName ? (p.categoryName.toLowerCase() === 'chair' ? 'chair' : 'furniture') : "furniture",
    tags: ["furniture"],
    shortDescription: p.description ? p.description.substring(0, 100) + "..." : "Mô tả sản phẩm",
    description: p.description || "Chi tiết sản phẩm đang được cập nhật.",
    specifications: [],
    features: []
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    try {
        const productData = await furnitureService.getFurnitureById(id);
        const product = mapToProduct(productData);

        return {
            title: `${product.title} | UNIHOME`,
            description: product.shortDescription || product.description,
            openGraph: {
                images: [product.image],
            },
        };
    } catch (error) {
        return {
            title: "Sản phẩm không tìm thấy | UNIHOME",
        };
    }
}

// Removing generateStaticParams for dynamic API content
// export async function generateStaticParams() { ... }

// ISR: Revalidate every hour
// export const revalidate = 3600; // Keeping ISR if desired, or remove for fully dynamic. 
// With Axios/Service, Next.js 'revalidate' export might not affect custom fetch calls unless configured.
// For now, let's keep it simple (dynamic).

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;

    try {
        const productData = await furnitureService.getFurnitureById(id);
        const product = mapToProduct(productData);

        // Fetch related products (same category)
        let recommendedProducts: Product[] = [];
        try {
            if (productData.categoryId) {
                const relatedData = await furnitureService.getFurnitureByCategory(productData.categoryId);
                // Filter out current product and map
                recommendedProducts = relatedData
                    .filter(p => p.furnitureId !== productData.furnitureId)
                    .slice(0, 5)
                    .map(mapToProduct);
            }
        } catch (err) {
            console.error("Failed to fetch related products", err);
            // Default to empty recommendation
        }

        return (
            <div className="flex flex-col min-h-screen bg-main">
                <Header />
                <main className="flex-grow pt-32 pb-20">
                    <ProductDetailClient
                        product={product}
                        recommendedProducts={recommendedProducts}
                    />
                </main>
                <Footer />
            </div>
        );
    } catch (error) {
        notFound();
    }
}

