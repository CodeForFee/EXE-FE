import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import HomeHero from "@/components/home/HomeHero";
import AnimatedFeatures from "@/components/home/AnimatedFeatures";
import HomeBanner from "@/components/home/HomeBanner";
import HomeTestimonials from "@/components/home/HomeTestimonials";
import HomeCTA from "@/components/home/HomeCTA";
import { furnitureService } from "@/lib/api/services/furniture";
import { FurnitureResponse } from "@/lib/api/types";

type HomeProduct = {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  rating?: number;
  shortDescription?: string;
};

const mapFurnitureToHomeProduct = (p: FurnitureResponse): HomeProduct => ({
  id: p.furnitureId,
  title: p.name,
  price: p.finalPrice ?? p.price,
  originalPrice: p.finalPrice && p.finalPrice !== p.price ? p.price : undefined,
  image: p.primaryImageUrl || p.image || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
  badge: p.discountPercentage ? "Giảm giá" : undefined,
  rating: 5,
  shortDescription: p.description ? `${p.description.substring(0, 80)}...` : undefined,
});

export default async function Home() {
  const page = await furnitureService.getAllFurniture(0, 6, "createdAt", "DESC");
  const featuredProducts = page.content.map(mapFurnitureToHomeProduct);
  const heroProduct = featuredProducts[0] ?? null;

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Header />
      <main className="flex-grow">
        <HomeHero featuredProduct={heroProduct} />

        <AnimatedFeatures />

        {/* ===== FEATURED PRODUCTS ===== */}
        <section className="py-24 bg-main relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div>
                <span className="editorial-badge mb-4 inline-block">Bộ sưu tập nổi bật</span>
                <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-heading leading-tight tracking-tighter">
                  Được chọn lọc
                  <span className="text-green-700"> cho bạn</span>
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 px-8 py-4 border-2 border-heading/20 text-heading font-heading font-bold text-sm tracking-wide hover:bg-heading hover:text-inverse transition-all group"
              >
                XEM TẤT CẢ <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </section>

        <HomeBanner />

        <HomeTestimonials />

        <HomeCTA />
      </main>
      <Footer />
    </div>
  );
}

