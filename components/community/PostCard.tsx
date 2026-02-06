"use client";

import { PostResponse } from "@/lib/api/types";
import { ChatBubbleLeftIcon, HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

interface PostCardProps {
    post: PostResponse;
}

function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Vừa xong";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`;

    return date.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
}

import CommentSection from "./CommentSection";

export default function PostCard({ post }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(false); // Placeholder state
    const [commentCount, setCommentCount] = useState((post as any).totalComments || 0);
    const [showComments, setShowComments] = useState(false);

    // Determine content to show
    // API returns `postDetail` array. We will collect all images.

    // First detail is usually main content
    const detail = post.postDetail && post.postDetail.length > 0 ? post.postDetail[0] : null;
    const description = detail ? detail.description : "Không có nội dung";

    // Collect all images
    const images = post.postDetail
        ? post.postDetail.map(d => d.image).filter(img => img)
        : [];

    // Price formatting
    const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(post.price);

    // Image Grid Logic
    const renderImages = () => {
        if (images.length === 0) return null;

        if (images.length === 1) {
            return (
                <div className="w-full bg-black/5 cursor-pointer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={images[0]}
                        alt="Post content"
                        className="w-full h-auto max-h-[600px] object-contain"
                        loading="lazy"
                    />
                </div>
            );
        }

        if (images.length === 2) {
            return (
                <div className="grid grid-cols-2 gap-0.5 h-[300px]">
                    {images.map((img, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={img} alt={`Image ${i}`} className="w-full h-full object-cover cursor-pointer" />
                    ))}
                </div>
            );
        }

        if (images.length === 3) {
            return (
                <div className="grid grid-cols-2 gap-0.5 h-[300px]">
                    <div className="h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[0]} alt="Image 0" className="w-full h-full object-cover cursor-pointer" />
                    </div>
                    <div className="grid grid-rows-2 gap-0.5 h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[1]} alt="Image 1" className="w-full h-full object-cover cursor-pointer" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[2]} alt="Image 2" className="w-full h-full object-cover cursor-pointer" />
                    </div>
                </div>
            );
        }

        // 4 or more
        return (
            <div className="grid grid-cols-2 gap-0.5 h-[300px]">
                {images.slice(0, 3).map((img, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={img} alt={`Image ${i}`} className={`w-full h-full object-cover cursor-pointer ${i === 0 ? 'col-span-2 row-span-1 h-[200px]' : 'h-[100px]'}`} />
                    // Simplified: just show 4 grid if 4? Facebook logic is complex. Let's do a simple 2x2 grid for 4+
                ))}
                <div className="grid grid-rows-2 gap-0.5 h-full">
                    {images.slice(0, 2).map((img, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img key={i} src={img} alt={`Image ${i}`} className="w-full h-full object-cover cursor-pointer" />
                    ))}
                </div>
                <div className="grid grid-rows-2 gap-0.5 h-full">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={images[2]} alt="Image 2" className="w-full h-full object-cover cursor-pointer" />
                    <div className="relative w-full h-full bg-black/50 overflow-hidden cursor-pointer">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={images[3]} alt="Image 3" className="w-full h-full object-cover opacity-60" />
                        {images.length > 4 && (
                            <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                                +{images.length - 3}
                            </div>
                        )}
                    </div>
                </div>
                {/* Wait, the slice logic above was inconsistent. Re-doing 4+ logic below clearly. */}
            </div>
        );
    };

    // Correcting 4+ Logic separately to avoid confusion in replacement
    const renderImagesGrid = () => {
        if (images.length === 0) return null;

        if (images.length === 1) {
            return (
                <div className="w-full bg-black/5 cursor-pointer">
                    <img src={images[0]} alt="Content" className="w-full h-auto max-h-[600px] object-contain" />
                </div>
            );
        }

        // Simple 2-col grid for everything else for now to be safe, or 2x2
        const displayCount = Math.min(images.length, 4);
        const hasMore = images.length > 4;

        return (
            <div className={`grid gap-0.5 h-[350px] ${displayCount >= 3 ? 'grid-cols-2' : 'grid-cols-' + displayCount}`}>
                {images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className={`relative overflow-hidden cursor-pointer w-full h-full ${displayCount === 3 && idx === 0 ? "row-span-2" : ""
                        }`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={img} alt={`Img ${idx}`} className="w-full h-full object-cover" />
                        {idx === 3 && hasMore && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
                                +{images.length - 4}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    }


    return (
        <div className="bg-white border border-divider rounded-xl shadow-sm mb-4 overflow-hidden">
            {/* Header */}
            <div className="p-4 flex items-center gap-3">
                {post.userImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={post.userImage}
                        alt={post.userName}
                        className="w-10 h-10 rounded-full object-cover border border-divider"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-heading font-bold text-sm">
                        {post.userName?.[0] || "?"}
                    </div>
                )}

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-heading font-bold text-heading text-[15px] hover:underline cursor-pointer">
                            {post.userName}
                        </span>
                        {post.price > 0 && (
                            <span className="text-secondary-foreground text-xs font-medium px-2 py-0.5 bg-secondary rounded-full">
                                bán {post.title} - <span className="text-red-600 font-bold">{formattedPrice}</span>
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <Link href={`/community/posts/${post.id}`} className="hover:underline">
                            {formatTimeAgo(post.createdAt)}
                        </Link>
                        <span>•</span>
                        <span className="bg-secondary/50 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                            {post.categoryName}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
                <h3 className="font-bold text-lg mb-2 hidden">{post.title}</h3>
                {post.title && <div className="font-bold mb-1">{post.title}</div>}

                <p className="text-[15px] text-body whitespace-pre-line leading-relaxed">
                    {description}
                </p>
            </div>

            {/* Image Grid */}
            {renderImagesGrid()}

            {/* Stats (Likes/Comments) - Placeholder */}
            <div className="px-4 py-2 flex justify-between text-xs text-muted border-b border-divider">
                <span>0 lượt thích</span>
                <button onClick={() => setShowComments(!showComments)} className="hover:underline">
                    Bình luận
                </button>
            </div>

            {/* Actions */}
            <div className="px-2 py-1 flex items-center justify-between">
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors hover:bg-secondary ${isLiked ? 'text-red-600' : 'text-muted-foreground'}`}
                >
                    {isLiked ? <HeartIconSolid className="w-6 h-6" /> : <HeartIcon className="w-6 h-6" />}
                    <span className="font-medium text-sm">Thích</span>
                </button>
                <button
                    onClick={() => setShowComments(!showComments)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors hover:bg-secondary ${showComments ? 'text-green-700 bg-green-50' : 'text-muted-foreground'}`}
                >
                    <ChatBubbleLeftIcon className="w-6 h-6" />
                    <span className="font-medium text-sm">Bình luận</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors hover:bg-secondary text-muted-foreground">
                    <ShareIcon className="w-6 h-6" />
                    <span className="font-medium text-sm">Chia sẻ</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && <CommentSection postId={post.id} />}
        </div>
    );
}
