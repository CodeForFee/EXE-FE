"use client";

import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import { Product } from "@/lib/data/products";

interface ProductTabsProps {
    product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
    return (
        <div className="w-full mt-20">
            <Tabs
                aria-label="Product Details"
                variant="underlined"
                classNames={{
                    base: "w-full",
                    tabList: "gap-12 w-full relative rounded-none p-0 border-b border-divider",
                    cursor: "w-full bg-green-600 h-1",
                    tab: "max-w-fit px-0 h-16",
                    tabContent: "group-data-[selected=true]:text-green-600 font-black text-lg uppercase tracking-widest"
                }}
            >
                <Tab key="description" title="Mô tả">
                    <Card className="border-none bg-transparent shadow-none mt-8">
                        <CardBody className="px-0 py-4">
                            <p className="text-xl text-body leading-[1.8] font-medium max-w-4xl">
                                {product.description}
                            </p>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="specs" title="Thông số">
                    <Card className="border-none bg-transparent shadow-none mt-8">
                        <CardBody className="px-0 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-divider rounded-3xl overflow-hidden border border-divider shadow-soft">
                                {product.specifications.map((spec) => (
                                    <div key={spec.key} className="flex flex-col gap-1 p-8 bg-white hover:bg-secondary/30 transition-colors">
                                        <span className="text-[10px] font-black text-muted uppercase tracking-widest">{spec.key}</span>
                                        <span className="text-lg font-bold text-heading">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
                <Tab key="reviews" title={`Đánh giá (${product.reviews})`}>
                    <Card className="border-none bg-transparent shadow-none mt-8">
                        <CardBody className="px-0 py-4">
                            <div className="flex flex-col items-center justify-center p-20 bg-secondary/30 rounded-[3rem] text-center">
                                <span className="text-6xl mb-4">🌟</span>
                                <h3 className="text-2xl font-black text-heading mb-2">Chưa có đánh giá thực tế</h3>
                                <p className="text-muted font-medium">Hãy là người đầu tiên trải nghiệm và chia sẻ cảm nghĩ của bạn về sản phẩm này!</p>
                            </div>
                        </CardBody>
                    </Card>
                </Tab>
            </Tabs>
        </div>
    );
}
