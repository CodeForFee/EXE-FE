"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { postService } from "@/lib/api/services/post";
import { commentService } from "@/lib/api/services/comment";
import type { PostResponse, CommentResponse } from "@/lib/api/types";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import { toast } from "react-toastify";

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CommunityPostDetailPage() {
  const params = useParams<{ id: string }>();
  const postId = params?.id;

  const [post, setPost] = useState<PostResponse | null>(null);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const user = useSessionStore((state) => state.user);

  useEffect(() => {
    if (!postId) return;

    const load = async () => {
      try {
        const [postData, commentsPage] = await Promise.all([
          postService.getPostById(postId),
          commentService.getCommentsByPostId(postId, { page: 0, size: 20 }),
        ]);
        setPost(postData);
        setComments(commentsPage.content ?? []);
      } catch (error) {
        console.error("Failed to load post detail", error);
        toast.error("Không thể tải chi tiết bài viết.");
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [postId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postId || !commentContent.trim()) return;
    if (!user) {
      toast.error("Bạn cần đăng nhập để bình luận.");
      return;
    }

    try {
      setIsSubmittingComment(true);
      const newComment = await commentService.createComment(postId, {
        content: commentContent.trim(),
      });
      setComments((prev) => [newComment, ...prev]);
      setCommentContent("");
    } catch (error) {
      console.error("Failed to create comment", error);
      toast.error("Không thể gửi bình luận. Vui lòng thử lại.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (id: string) => {
    if (!confirm("Xoá bình luận này?")) return;
    try {
      await commentService.deleteComment(id);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete comment", error);
      toast.error("Không thể xoá bình luận.");
    }
  };

  const firstDetail = post?.postDetail?.[0];

  return (
    <div className="flex flex-col min-h-screen bg-main">
      <Header />
      <main className="flex-grow pt-32">
        <div className="container mx-auto px-4 py-10">
          <nav className="text-sm font-heading text-muted mb-4">
            <Link href="/" className="hover:text-green-700">
              Trang chủ
            </Link>
            <span className="mx-2 text-divider">/</span>
            <Link href="/community" className="hover:text-green-700">
              Cộng đồng
            </Link>
            <span className="mx-2 text-divider">/</span>
            <span className="text-heading font-semibold">
              {post?.title ?? "Chi tiết bài viết"}
            </span>
          </nav>

          {isLoading || !post ? (
            <div className="py-20 text-center text-muted">Đang tải bài viết...</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Post content */}
              <article className="lg:col-span-2 bg-white border border-divider rounded-2xl overflow-hidden">
                {firstDetail?.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={firstDetail.image}
                    alt={post.title}
                    className="w-full h-72 object-cover"
                  />
                )}
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs text-muted font-heading uppercase tracking-[0.15em]">
                    <span className="px-2 py-1 rounded-full bg-secondary text-muted">
                      {post.categoryName}
                    </span>
                    <span>{formatDateTime(post.createdAt)}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-heading">
                    {post.title}
                  </h1>
                  <p className="text-lg font-heading text-green-800">
                    {post.price.toLocaleString("vi-VN")}₫
                  </p>
                  {firstDetail?.description && (
                    <p className="text-sm md:text-base text-body whitespace-pre-line">
                      {firstDetail.description}
                    </p>
                  )}
                </div>
              </article>

              {/* Sidebar: author + comments */}
              <aside className="space-y-6">
                <div className="bg-white border border-divider rounded-2xl p-5 space-y-3">
                  <p className="text-[11px] font-heading uppercase tracking-[0.15em] text-muted">
                    Người đăng
                  </p>
                  <div className="flex items-center gap-3">
                    {post.userImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.userImage}
                        alt={post.userName}
                        className="w-10 h-10 rounded-full object-cover border border-divider"
                      />
                    )}
                    <div>
                      <p className="font-heading font-semibold text-heading">
                        {post.userName}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-divider rounded-2xl p-5">
                  <p className="text-[11px] font-heading uppercase tracking-[0.15em] text-muted mb-3">
                    Bình luận ({comments.length})
                  </p>

                  {/* Add comment */}
                  <form onSubmit={handleSubmitComment} className="space-y-2 mb-4">
                    <textarea
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      rows={3}
                      placeholder={
                        user
                          ? "Chia sẻ suy nghĩ của bạn về bài viết này..."
                          : "Đăng nhập để bình luận..."
                      }
                      className="w-full px-3 py-2 border border-divider rounded-md bg-white text-sm focus:outline-none focus:border-green-700 resize-vertical"
                      disabled={!user || isSubmittingComment}
                    />
                    <button
                      type="submit"
                      disabled={!user || isSubmittingComment || !commentContent.trim()}
                      className="w-full px-4 py-2 bg-green-900 text-cream font-heading font-semibold text-xs tracking-[0.15em] uppercase rounded-md hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmittingComment ? "ĐANG GỬI..." : "GỬI BÌNH LUẬN"}
                    </button>
                  </form>

                  {/* Comments list */}
                  {isLoadingComments ? (
                    <p className="text-xs text-muted">Đang tải bình luận...</p>
                  ) : comments.length === 0 ? (
                    <p className="text-xs text-muted italic">
                      Chưa có bình luận nào. Hãy là người đầu tiên!
                    </p>
                  ) : (
                    <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
                      {comments.map((c) => (
                        <div key={c.id} className="border-b border-divider/60 pb-3 last:border-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              { }
                              {c.userImage && (
                                <img
                                  src={c.userImage}
                                  alt={c.userName}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                              )}
                              <span className="text-xs font-heading font-semibold text-heading">
                                {c.userName}
                              </span>
                            </div>
                            <span className="text-[10px] text-muted">
                              {formatDateTime(c.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-body mb-1">{c.content}</p>
                          {user && c.userId === user.id && (
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(c.id)}
                              className="text-[10px] text-red-500 hover:underline"
                            >
                              Xoá
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

