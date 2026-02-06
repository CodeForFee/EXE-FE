"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import { authService } from "@/lib/api/services/auth";
import { toast } from "react-toastify";
import { useLoadingStore } from "@/lib/stores/useLoadingStore";

function CallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const setSession = useSessionStore((state) => state.setSession);
    const { setIsLoading } = useLoadingStore();

    useEffect(() => {
        const token = searchParams.get("token");
        const error = searchParams.get("error");
        const userId = searchParams.get("userId"); // Optional if backend sends it

        const handleCallback = async () => {
            if (error) {
                toast.error("Đăng nhập Google thất bại: " + error);
                router.push("/login");
                return;
            }

            if (token) {
                try {
                    setIsLoading(true, "Đang xử lý đăng nhập Google...");

                    // 1. Set server cookies
                    await authService.loginServer({
                        accessToken: token,
                        refreshToken: token // Assuming same token for now if not provided separate
                    });

                    // 2. Set client session
                    setSession({
                        accessToken: token,
                        refreshToken: token
                    });

                    toast.success("Đăng nhập thành công!");

                    // 3. Redirect to home
                    router.push("/");
                    router.refresh();
                } catch (err) {
                    console.error("Callback processing error:", err);
                    toast.error("Lỗi xác thực phiên đăng nhập");
                    router.push("/login");
                } finally {
                    setIsLoading(false);
                }
            } else {
                // If no token and no error, maybe just entered URL manually
                // router.push("/login");
            }
        };

        handleCallback();
    }, [searchParams, router, setSession, setIsLoading]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-main">
            <div className="w-16 h-16 border-4 border-green-900 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-heading font-heading text-lg animate-pulse">Đang xác thực với Google...</p>
        </div>
    );
}

export default function GoogleCallbackPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
