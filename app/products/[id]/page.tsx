import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data/products";
import { getRecommendedProducts } from "@/lib/utils/recommendations";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        return {
            title: "Sản phẩm không tìm thấy | UNIHOME",
        };
    }

    return {
        title: `${product.title} | UNIHOME`,
        description: product.shortDescription || product.description,
        openGraph: {
            images: [product.image],
        },
    };
}

// SSG: Pre-render all product pages at build time
export async function generateStaticParams() {
    return products.map((product) => ({
        id: product.id,
    }));
}

// ISR: Revalidate every hour
export const revalidate = 3600;

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        notFound();
    }

    const recommendedProducts = getRecommendedProducts(product);

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
}

