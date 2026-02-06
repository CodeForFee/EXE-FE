import { useState } from "react";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import ImageUpload from "@/components/common/ImageUpload";
import { ArrowRightIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { CategoryResponse, CreatePostRequest } from "@/lib/api/types";
import { postService } from "@/lib/api/services/post";
import { toast } from "react-toastify";

interface CreatePostWidgetProps {
    categories: CategoryResponse[];
    onPostCreated: (post: any) => void;
}

export default function CreatePostWidget({ categories, onPostCreated }: CreatePostWidgetProps) {
    const user = useSessionStore((state) => state.user);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [content, setContent] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [imageUrl, setImageUrl] = useState("");

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        const parsedPrice = Number(price);

        if (!title.trim() || !content.trim() || !selectedCategoryId) {
            toast.error("Vui lòng điền đầy đủ thông tin bắt buộc.");
            return;
        }

        if (price && (isNaN(parsedPrice) || parsedPrice < 0)) {
            toast.error("Giá không hợp lệ.");
            return;
        }

        try {
            setIsSubmitting(true);

            const requestData: CreatePostRequest = {
                title: title.trim(),
                price: parsedPrice || 0,
                categoryId: selectedCategoryId,
                status: 'ACTIVE',
                image: imageUrl,
                description: content.trim(),
            };

            const newPost = await postService.createPost(requestData);

            // Construct full post object for immediate UI update with manual postDetail
            // This is required because backend response might return postDetail: null
            // or an empty list immediately after creation.
            const optimisticPost = {
                ...newPost,
                postDetail: [
                    {
                        id: `temp-${Date.now()}`,
                        description: content.trim(),
                        image: imageUrl,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    }
                ]
            };

            onPostCreated(optimisticPost);

            // Reset and close
            setTitle("");
            setPrice("");
            setContent("");
            setSelectedCategoryId("");
            setImageUrl("");
            setIsExpanded(false);
            toast.success("Đăng bài thành công!");
        } catch (error) {
            console.error("Failed to create post", error);
            toast.error(error instanceof Error ? error.message : "Có lỗi xảy ra khi đăng bài.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!user) return null; // Don't show if not logged in? Or show login prompt? Plan says "Trigger: What's on your mind...".

    return (
        <div className="bg-white border border-divider rounded-xl shadow-sm p-4 mb-6">
            <div className="flex gap-3">
                {user.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.image}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border border-division"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold shrink-0">
                        {user.fullName?.[0] || "U"}
                    </div>
                )}

                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex-1 bg-secondary/30 hover:bg-secondary/50 text-left px-4 rounded-full text-muted text-sm font-body transition-colors py-2.5"
                >
                    {user.fullName ? `Ơi ${user.fullName}, bạn đang nghĩ gì thế?` : "Bạn đang nghĩ gì thế?"}
                </button>
            </div>

            <div className="mt-3 pt-3 border-t border-divider flex justify-between px-2">
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 text-muted hover:bg-secondary/50 px-4 py-2 rounded-lg transition-colors flex-1 justify-center"
                >
                    <PhotoIcon className="w-6 h-6 text-green-600" />
                    <span className="text-sm font-medium">Ảnh/Video</span>
                </button>
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 text-sm text-muted font-heading font-medium hover:bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors flex-1 justify-center"
                >
                    <span>🏷️ Đồ cũ</span>
                </button>
                <button
                    onClick={() => setIsExpanded(true)}
                    className="flex items-center gap-2 text-sm text-muted font-heading font-medium hover:bg-secondary/50 px-3 py-1.5 rounded-lg transition-colors flex-1 justify-center"
                >
                    <span>💬 Thảo luận</span>
                </button>
            </div>

            {/* Expansion Modal / Popover equivalent */}
            {isExpanded && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-divider flex items-center justify-between sticky top-0 bg-white z-10">
                            <h3 className="text-xl font-heading font-bold text-center flex-1">Tạo bài viết</h3>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="p-2 bg-secondary rounded-full hover:bg-secondary/80 transition-colors"
                            >
                                <XMarkIcon className="w-5 h-5 text-heading" />
                            </button>
                        </div>

                        <div className="p-5">
                            <div className="flex items-center gap-3 mb-4">
                                {user.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.image} alt="User" className="w-10 h-10 rounded-full object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold">
                                        {user.fullName?.[0] || "U"}
                                    </div>
                                )}
                                <div>
                                    <span className="font-heading font-bold block">{user.fullName || "Người dùng"}</span>
                                    <select
                                        className="text-xs bg-secondary px-2 py-0.5 rounded text-heading focus:outline-none cursor-pointer mt-0.5 border-none"
                                        value={selectedCategoryId}
                                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                                    >
                                        <option value="">Chọn danh mục...</option>
                                        {categories.map(cat => (
                                            <option key={cat.categoryId} value={cat.categoryId}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <form onSubmit={handleCreatePost} className="space-y-4">
                                <input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Tiêu đề bài viết..."
                                    className="w-full text-lg font-bold placeholder:text-muted/60 border-none focus:ring-0 p-0"
                                />

                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder={`Bạn đang nghĩ gì thế, ${user.fullName || "bạn"}?`}
                                    className="w-full min-h-[120px] resize-none border-none focus:ring-0 text-base placeholder:text-muted/60 p-0"
                                />

                                {imageUrl && (
                                    <div className="relative rounded-lg overflow-hidden border border-divider">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imageUrl} alt="Preview" className="w-full h-auto max-h-[300px] object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImageUrl("")}
                                            className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-black/70"
                                        >
                                            <XMarkIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}

                                <div className="border rounded-lg p-3 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted">Thêm vào bài viết</span>
                                        <div className="flex gap-2">
                                            {/* Image Upload Trigger - simplified */}
                                        </div>
                                    </div>

                                    <ImageUpload
                                        value={imageUrl}
                                        onChange={setImageUrl}
                                        label="Thêm ảnh"
                                    />
                                </div>

                                {/* Price */}
                                <div className="pt-2">
                                    <label className="text-xs font-bold text-muted uppercase block mb-1">Giá (nếu bán/pass đồ)</label>
                                    <input
                                        type="number"
                                        placeholder="Nhập giá (VND)"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full rounded-lg border-divider focus:border-green-600 focus:ring-green-600 sm:text-sm"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!title || !content || !selectedCategoryId || isSubmitting}
                                    className="w-full py-3 bg-green-900 text-cream font-heading font-bold rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Đang đăng..." : "Đăng bài"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
