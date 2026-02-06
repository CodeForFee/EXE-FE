"use client";

import { useState, useEffect } from "react";
import { commentService } from "@/lib/api/services/comment";
import { CommentResponse } from "@/lib/api/types";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface CommentSectionProps {
    postId: string;
    onCommentsCountChange?: (count: number) => void;
}

// Helper for date formatting
function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Vừa xong";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`;

    return date.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export default function CommentSection({ postId, onCommentsCountChange }: CommentSectionProps) {
    const user = useSessionStore((state) => state.user);
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newComment, setNewComment] = useState("");
    const [replyTo, setReplyTo] = useState<CommentResponse | null>(null);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        try {
            const page = await commentService.getCommentsByPostId(postId, {
                page: 0,
                size: 50, // Load reasonable amount
            });
            setComments(page.content);
            if (onCommentsCountChange) {
                onCommentsCountChange(page.totalElements || page.content.length);
            }
        } catch (error) {
            console.error("Failed to load comments", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !user) return;

        try {
            setIsSubmitting(true);
            const createdComment = await commentService.createComment(postId, {
                content: newComment.trim(),
                replyId: replyTo?.id
            });

            // Add new comment to list immediately
            setComments(prev => [createdComment, ...prev]);
            setNewComment("");
            setReplyTo(null);

            // Update parent count
            if (onCommentsCountChange) {
                onCommentsCountChange(comments.length + 1);
            }
        } catch (error) {
            console.error("Failed to post comment", error);
            toast.error("Không thể đăng bình luận.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;
        try {
            await commentService.deleteComment(commentId);
            setComments(prev => prev.filter(c => c.id !== commentId));
            if (onCommentsCountChange) {
                onCommentsCountChange(comments.length - 1);
            }
            toast.success("Đã xóa bình luận.");
        } catch (error) {
            console.error("Failed to delete comment", error);
            toast.error("Không thể xóa bình luận.");
        }
    };

    const startEdit = (comment: CommentResponse) => {
        setEditingCommentId(comment.id);
        setEditContent(comment.content);
    };

    const cancelEdit = () => {
        setEditingCommentId(null);
        setEditContent("");
    };

    const handleUpdate = async (commentId: string) => {
        if (!editContent.trim()) return;
        try {
            const updated = await commentService.updateComment(commentId, { content: editContent.trim() });
            setComments(prev => prev.map(c => c.id === commentId ? updated : c));
            setEditingCommentId(null);
            setEditContent("");
            toast.success("Đã chỉnh sửa bình luận.");
        } catch (error) {
            console.error("Failed to update comment", error);
            toast.error("Không thể chỉnh sửa bình luận.");
        }
    };

    return (
        <div className="bg-secondary/20 p-4 border-t border-divider">
            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
                {user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={user.image}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-heading font-bold text-xs shrink-0">
                        {user?.fullName?.[0] || "?"}
                    </div>
                )}

                <div className="flex-1 relative">
                    {replyTo && (
                        <div className="flex items-center gap-2 mb-1 px-3">
                            <span className="text-xs text-muted">Đang trả lời: <b>{replyTo.userName}</b></span>
                            <button
                                type="button"
                                onClick={() => setReplyTo(null)}
                                className="text-xs text-red-500 hover:underline"
                            >
                                Hủy
                            </button>
                        </div>
                    )}
                    <input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder={replyTo ? `Trả lời ${replyTo.userName}...` : "Viết bình luận..."}
                        disabled={!user}
                        className="w-full bg-white rounded-full border border-divider px-4 py-2 text-sm focus:outline-none focus:border-green-600 transition-colors disabled:bg-gray-100"
                    />
                    <button
                        type="submit"
                        disabled={!newComment.trim() || isSubmitting}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-green-700 font-bold text-xs disabled:opacity-50 hover:underline"
                    >
                        Gửi
                    </button>
                </div>
            </form>

            {/* List */}
            {isLoading ? (
                <div className="text-center text-xs text-muted py-4">Đang tải bình luận...</div>
            ) : comments.length === 0 ? (
                <div className="text-center text-xs text-muted py-4">Chưa có bình luận nào.</div>
            ) : (
                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-3">
                            {comment.userImage ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={comment.userImage}
                                    alt={comment.userName}
                                    className="w-8 h-8 rounded-full object-cover shrink-0"
                                />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-heading font-bold text-xs shrink-0">
                                    {comment.userName?.[0] || "?"}
                                </div>
                            )}

                            <div className="flex flex-col gap-1 max-w-[85%]">
                                {editingCommentId === comment.id ? (
                                    <div className="bg-white px-3 py-2 rounded-2xl border border-divider shadow-sm inline-block w-full min-w-[200px]">
                                        <input
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="w-full text-sm border-none focus:ring-0 p-0 mb-2"
                                            autoFocus
                                        />
                                        <div className="flex gap-2 justify-end">
                                            <button onClick={cancelEdit} className="text-xs text-muted hover:underline">Hủy</button>
                                            <button onClick={() => handleUpdate(comment.id)} className="text-xs text-green-700 font-bold hover:underline">Lưu</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white px-3 py-2 rounded-2xl border border-divider shadow-sm inline-block w-fit group relative">
                                        <span className="font-bold text-sm text-heading block">{comment.userName}</span>
                                        <p className="text-sm text-body break-words">{comment.content}</p>

                                        {/* Edit/Delete Actions for Owner */}
                                        {user && user.id === comment.userId && (
                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 bg-white/80 rounded px-1">
                                                <button onClick={() => startEdit(comment)} className="text-[10px] text-blue-600 hover:underline">Sửa</button>
                                                <button onClick={() => handleDelete(comment.id)} className="text-[10px] text-red-600 hover:underline">Xóa</button>
                                            </div>
                                        )}
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-[11px] text-muted px-2">
                                    <span>{formatTimeAgo(comment.createdAt)}</span>
                                    <button className="font-bold hover:underline">Thích</button>
                                    <button
                                        className="font-bold hover:underline"
                                        onClick={() => setReplyTo(comment)}
                                    >
                                        Phản hồi
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
