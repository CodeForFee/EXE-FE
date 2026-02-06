"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { postService } from "@/lib/api/services/post";
import { categoryService } from "@/lib/api/services/category";
import type { PostResponse, CategoryResponse } from "@/lib/api/types";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import CreatePostWidget from "@/components/community/CreatePostWidget";
import PostCard from "@/components/community/PostCard";
import Link from "next/link";

export default function CommunityPage() {
    const [posts, setPosts] = useState<PostResponse[]>([]);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSessionStore((state) => state.user);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [postsPage, categoryList] = await Promise.all([
                postService.getAllPosts({
                    page: 0,
                    size: 20, // Load more for feed
                    sort: "createdAt",
                    direction: "DESC",
                }),
                categoryService.getAllCategoriesNoPaging(),
            ]);

            setPosts(postsPage.content ?? []);
            setCategories(categoryList);
        } catch (error) {
            console.error("Failed to load community data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewPost = (newPost: any) => { // Using any to bypass potential type mismatch temporarily until strict alignment
        // Ideally strict typing: PostResponse
        // But the create response might differ slightly if I didn't update types perfectly. 
        // Assuming it returns a valid PostResponse compatible object.
        setPosts(prev => [newPost, ...prev]);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F0F2F5]"> {/* Facebook-like background color */}
            <Header />

            <main className="flex-grow pt-32 pb-10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-6 justify-center">

                        {/* Left Sidebar - Categories/Nav (Optional, hidden on mobile) */}
                        <div className="hidden lg:block w-64 shrink-0 sticky top-24 h-fit">
                            <h3 className="font-heading font-bold text-lg mb-4 px-2">Danh mục</h3>
                            <div className="space-y-1">
                                <button className="w-full text-left px-3 py-2 rounded-lg bg-green-100 text-green-800 font-semibold hover:bg-green-200 transition-colors">
                                    Tất cả bài viết
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.categoryId}
                                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-black/5 transition-colors font-medium text-body"
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-8 px-2">
                                <p className="text-xs text-muted leading-relaxed">
                                    © 2024 UniHome Community.<br />
                                    Chia sẻ không gian, kết nối đam mê.
                                </p>
                            </div>
                        </div>

                        {/* Center Feed */}
                        <div className="w-full max-w-[680px]"> {/* Standard FB feed width */}
                            {/* Create Post Widget */}
                            {isClient && (
                                <CreatePostWidget
                                    categories={categories}
                                    onPostCreated={handleNewPost}
                                />
                            )}

                            {/* Feed */}
                            {isLoading ? (
                                <div className="space-y-4">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="bg-white rounded-xl h-64 shadow-sm animate-pulse" />
                                    ))}
                                </div>
                            ) : posts.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                                    <p className="text-muted text-lg">Chưa có bài viết nào.</p>
                                    <p className="text-muted/60">Hãy là người đầu tiên chia sẻ!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {posts.map(post => (
                                        <PostCard key={post.id} post={post} />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Right Sidebar - Trending/Ads (Optional) */}
                        <div className="hidden xl:block w-80 shrink-0 sticky top-24 h-fit">
                            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                                <h3 className="font-heading font-bold text-base mb-3 text-muted-foreground uppercase tracking-wider">Được tài trợ</h3>
                                <div className="aspect-video bg-secondary rounded-lg mb-2 flex items-center justify-center text-muted">
                                    <span>Quảng cáo</span>
                                </div>
                                <p className="text-sm font-medium">Combo nội thất sinh viên giảm 20%</p>
                                <p className="text-xs text-muted">unihome.com</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-sm p-4">
                                <h3 className="font-heading font-bold text-base mb-3 border-b border-divider pb-2">Quy tắc cộng đồng</h3>
                                <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                                    <li>Tôn trọng lẫn nhau</li>
                                    <li>Không spam bán hàng</li>
                                    <li>Hình ảnh rõ nét, thực tế</li>
                                    <li>Chia sẻ giá công khai</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
