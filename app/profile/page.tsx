"use client";

import React, { useEffect } from "react";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import { useLoadingStore } from "@/lib/stores/useLoadingStore";
import { UserRequest, UserResponse, ChangePasswordRequest } from "@/lib/api/types";
import { userService } from "@/lib/api/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, CameraIcon, UserIcon, ShieldCheckIcon, UploadCloud } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProfilePage() {
    const user = useSessionStore((state) => state.user);
    const setSession = useSessionStore((state) => state.setSession);
    const accessToken = useSessionStore((state) => state.accessToken);
    const { setIsLoading } = useLoadingStore();
    const queryClient = useQueryClient();

    // Local state for form fields to handle inputs
    const [formData, setFormData] = React.useState<UserRequest>({
        fullName: "",
        phone: "",
        address: "",
        image: ""
    });

    const [passData, setPassData] = React.useState<ChangePasswordRequest>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [activeTab, setActiveTab] = React.useState<"personal" | "security">("personal");

    // Sync user data to form when user loads
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                phone: user.phone || "",
                address: user.address || "",
                image: user.image || ""
            });
        }
    }, [user]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true, "Đang tải ảnh lên...");
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        formDataUpload.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "your_unsigned_preset");
        // Note: You need to set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env

        try {
            const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "your_cloud_name";
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                formDataUpload
            );

            const imageUrl = res.data.secure_url;
            setFormData(prev => ({ ...prev, image: imageUrl }));
            toast.success("Tải ảnh lên thành công!");
        } catch (error: any) {
            console.error("Upload error:", error);
            toast.error(error.response?.data?.message || "Lỗi tải ảnh. Vui lòng kiểm tra cấu hình Cloudinary.");
        } finally {
            setIsLoading(false);
        }
    };

    // Mutation for updating profile
    const updateProfileMutation = useMutation({
        mutationFn: async (data: UserRequest) => {
            if (!user?.id) throw new Error("No user ID");
            return await userService.updateUser(user.id, data);
        },
        onMutate: () => {
            setIsLoading(true, "Đang cập nhật hồ sơ...");
        },
        onSuccess: async (updatedUser) => {
            toast.success("Cập nhật hồ sơ thành công!");
            // Refresh user data by fetching full profile
            if (user?.id && accessToken) {
                try {
                    const fullUser = await userService.getUserById(user.id);
                    // Note: User data in session is from JWT, can't update directly
                    // User will see updates on next login or page refresh
                    queryClient.invalidateQueries({ queryKey: ['user', user.id] });
                } catch (error) {
                    console.error("Failed to refresh user:", error);
                }
            }
            setIsLoading(false);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Cập nhật thất bại");
            setIsLoading(false);
        }
    });

    // Mutation for changing password
    const changePasswordMutation = useMutation({
        mutationFn: async (data: ChangePasswordRequest) => {
            if (!user?.id) throw new Error("No user ID");
            return await userService.changePassword(user.id, data);
        },
        onMutate: () => {
            setIsLoading(true, "Đang đổi mật khẩu...");
        },
        onSuccess: () => {
            toast.success("Đổi mật khẩu thành công! Vui lòng đăng nhập lại.");
            setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            setIsLoading(false);
            // Optionally logout user
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Đổi mật khẩu thất bại");
            setIsLoading(false);
        }
    });

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfileMutation.mutate(formData);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            toast.error("Mật khẩu xác nhận không khớp");
            return;
        }
        changePasswordMutation.mutate(passData);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-main">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-12 w-12 bg-wood-light/50 rounded-full mb-4"></div>
                    <div className="h-4 w-32 bg-wood-light/50 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-main pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center text-green-900 hover:text-green-700 transition-colors font-semibold">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Về trang chủ
                    </Link>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-8"
                >
                    {/* Left Sidebar: User Card */}
                    <div className="md:col-span-4 lg:col-span-3">
                        <div className="bg-white/80 backdrop-blur-md border border-divider shadow-medium sticky top-24 rounded-2xl overflow-hidden">
                            <div className="flex flex-col items-center py-8 text-center bg-wood-light/10">
                                <div className="relative group">
                                    {(formData.image || user.image) ? (
                                        <img
                                            src={formData.image || user.image}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4 bg-green-900"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full text-4xl font-bold bg-green-900 text-cream mb-4 border-4 border-white shadow-lg flex items-center justify-center">
                                            {user.fullName?.charAt(0)}
                                        </div>
                                    )}
                                    <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <CameraIcon className="text-white w-8 h-8" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                </div>

                                <h2 className="text-2xl font-heading font-bold text-green-900 mt-2">{user.fullName}</h2>
                                <p className="text-muted text-sm mb-4 font-body">{user.email}</p>

                                <div className="w-full px-4 mt-2 mb-6">
                                    <div className="bg-green-900/5 rounded-lg p-3 text-sm">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-muted font-medium">Vai trò</span>
                                            <span className="font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs">{user.role}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-muted font-medium">Trạng thái</span>
                                            <span className="font-bold text-green-700">{user.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-8 lg:col-span-9 bg-white shadow-medium border border-divider min-h-[500px] rounded-2xl overflow-hidden flex flex-col">
                        {/* Tabs Header */}
                        <div className="flex w-full border-b border-divider">
                            <button
                                onClick={() => setActiveTab("personal")}
                                className={`flex-1 py-4 text-center font-heading font-semibold text-base transition-colors relative flex items-center justify-center gap-2 ${activeTab === "personal" ? "text-green-900 bg-green-50" : "text-muted hover:text-green-900 hover:bg-gray-50"
                                    }`}
                            >
                                <UserIcon size={18} />
                                <span>Thông tin cá nhân</span>
                                {activeTab === "personal" && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-green-900" />
                                )}
                            </button>
                            <button
                                onClick={() => setActiveTab("security")}
                                className={`flex-1 py-4 text-center font-heading font-semibold text-base transition-colors relative flex items-center justify-center gap-2 ${activeTab === "security" ? "text-green-900 bg-green-50" : "text-muted hover:text-green-900 hover:bg-gray-50"
                                    }`}
                            >
                                <ShieldCheckIcon size={18} />
                                <span>Bảo mật</span>
                                {activeTab === "security" && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-green-900" />
                                )}
                            </button>
                        </div>

                        {/* Tabs Content */}
                        <div className="p-6 md:p-8">
                            {activeTab === "personal" ? (
                                <form onSubmit={handleUpdateProfile} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-green-900">Họ và tên</label>
                                            <input
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-700 focus:outline-none transition-colors bg-main/30"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-green-900">Số điện thoại</label>
                                            <input
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="Chưa cập nhật"
                                                className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-700 focus:outline-none transition-colors bg-main/30"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-green-900">Email (Không thể thay đổi)</label>
                                        <input
                                            value={user.email}
                                            readOnly
                                            disabled
                                            className="w-full px-4 py-3 rounded-lg border border-divider bg-gray-100 opacity-70 cursor-not-allowed"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-green-900">Địa chỉ giao hàng</label>
                                        <input
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Nhập địa chỉ của bạn"
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-700 focus:outline-none transition-colors bg-main/30"
                                        />
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            disabled={updateProfileMutation.isPending}
                                            className="px-8 py-3 bg-green-900 text-cream font-heading font-bold rounded-lg shadow-soft hover:bg-green-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {updateProfileMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={handleChangePassword} className="space-y-6 max-w-lg mx-auto">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-green-900">Mật khẩu hiện tại</label>
                                        <input
                                            type="password"
                                            value={passData.currentPassword}
                                            onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-700 focus:outline-none transition-colors bg-main/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-green-900">Mật khẩu mới</label>
                                        <input
                                            type="password"
                                            value={passData.newPassword}
                                            onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-700 focus:outline-none transition-colors bg-main/30"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-green-900">Xác nhận mật khẩu mới</label>
                                        <input
                                            type="password"
                                            value={passData.confirmPassword}
                                            onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-700 focus:outline-none transition-colors bg-main/30"
                                        />
                                    </div>

                                    <div className="flex justify-start pt-4">
                                        <button
                                            type="submit"
                                            disabled={changePasswordMutation.isPending}
                                            className="px-8 py-3 bg-wood-medium text-white font-heading font-bold rounded-lg shadow-soft hover:bg-wood-dark transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {changePasswordMutation.isPending ? "Đang xử lý..." : "Đổi mật khẩu"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
