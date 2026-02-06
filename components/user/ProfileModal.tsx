"use client";

import React, { useEffect } from "react";
import { useSessionStore } from "@/lib/stores/useSessionStore";
import { UserRequest, UserResponse, ChangePasswordRequest } from "@/lib/api/types";
import { userService } from "@/lib/api/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserIcon, ShieldCheckIcon, CameraIcon } from "lucide-react";

interface ProfileModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function ProfileModal({ isOpen, onOpenChange }: ProfileModalProps) {
    const user = useSessionStore((state) => state.user);
    const queryClient = useQueryClient();

    // Local state
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

    const [activeTab, setActiveTab] = React.useState<string>("personal");
    const [message, setMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Sync user data
    useEffect(() => {
        if (user && isOpen) {
            setFormData({
                fullName: user.fullName || "",
                phone: user.phone || "",
                address: user.address || "",
                image: user.image || ""
            });
            setMessage(null);
        }
    }, [user, isOpen]);

    const updateProfileMutation = useMutation({
        mutationFn: async (data: UserRequest) => {
            if (!user?.id) throw new Error("No user ID");
            return await userService.updateUser(user.id, data);
        },
        onSuccess: async () => {
            setMessage({ type: 'success', text: "Đã cập nhật hồ sơ" });
            // Invalidate user queries to refresh data
            if (user?.id) {
                queryClient.invalidateQueries({ queryKey: ['user', user.id] });
            }
        },
        onError: (error: any) => {
            setMessage({ type: 'error', text: error.response?.data?.message || "Lỗi cập nhật" });
        }
    });

    const changePasswordMutation = useMutation({
        mutationFn: async (data: ChangePasswordRequest) => {
            if (!user?.id) throw new Error("No user ID");
            return await userService.changePassword(user.id, data);
        },
        onSuccess: () => {
            setMessage({ type: 'success', text: "Đổi mật khẩu thành công" });
            setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        },
        onError: (error: any) => {
            setMessage({ type: 'error', text: error.response?.data?.message || "Lỗi đổi mật khẩu" });
        }
    });

    const handleUpdateProfile = () => {
        updateProfileMutation.mutate(formData);
    };

    const handleChangePassword = () => {
        if (passData.newPassword !== passData.confirmPassword) {
            setMessage({ type: 'error', text: "Mật khẩu không khớp" });
            return;
        }
        changePasswordMutation.mutate(passData);
    };

    if (!user) return null;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-main rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-divider bg-white">
                    <div>
                        <h3 className="font-heading text-xl font-bold text-green-900">Hồ sơ người dùng</h3>
                        <p className="text-sm text-muted">Quản lý thông tin cá nhân và bảo mật</p>
                    </div>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-auto">
                    <div className="flex flex-col md:flex-row h-full min-h-[400px]">
                        {/* Sidebar */}
                        <div className="md:w-1/3 bg-wood-light/10 p-6 flex flex-col items-center border-r border-divider">
                            <div className="relative group mb-4">
                                {user.image ? (
                                    <img
                                        src={user.image}
                                        alt={user.fullName}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-green-900"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-green-900 text-cream flex items-center justify-center text-3xl font-bold border-4 border-white shadow-md">
                                        {user.fullName?.charAt(0)}
                                    </div>
                                )}
                            </div>
                            <h4 className="font-bold text-lg text-center text-green-900">{user.fullName}</h4>
                            <p className="text-xs text-muted mb-6">{user.email}</p>

                            <div className="w-full flex flex-col gap-2">
                                <button
                                    onClick={() => { setActiveTab("personal"); setMessage(null); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === "personal"
                                        ? "bg-green-100 text-green-800"
                                        : "text-muted hover:bg-black/5"
                                        }`}
                                >
                                    <UserIcon size={18} />
                                    Thông tin cá nhân
                                </button>
                                <button
                                    onClick={() => { setActiveTab("security"); setMessage(null); }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeTab === "security"
                                        ? "bg-orange-100 text-orange-800"
                                        : "text-muted hover:bg-black/5"
                                        }`}
                                >
                                    <ShieldCheckIcon size={18} />
                                    Bảo mật
                                </button>
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="md:w-2/3 p-6 bg-white">
                            {activeTab === "personal" ? (
                                <div className="space-y-4">
                                    <h4 className="font-bold text-lg mb-4 text-green-900">Chỉnh sửa thông tin</h4>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Họ và tên</label>
                                        <input
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-600 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Số điện thoại</label>
                                        <input
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-600 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Địa chỉ</label>
                                        <input
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-600 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">URL Ảnh đại diện</label>
                                        <input
                                            value={formData.image}
                                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-green-600 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Email</label>
                                        <input
                                            value={user.email}
                                            readOnly
                                            className="w-full px-4 py-3 rounded-lg border border-divider bg-gray-50 opacity-60 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <h4 className="font-bold text-lg mb-4 text-orange-600">Đổi mật khẩu</h4>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Mật khẩu cũ</label>
                                        <input
                                            type="password"
                                            value={passData.currentPassword}
                                            onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-orange-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Mật khẩu mới</label>
                                        <input
                                            type="password"
                                            value={passData.newPassword}
                                            onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-orange-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-muted uppercase tracking-wider">Xác nhận mật khẩu</label>
                                        <input
                                            type="password"
                                            value={passData.confirmPassword}
                                            onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                                            className="w-full px-4 py-3 rounded-lg border border-divider focus:border-orange-500 focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Feedback Message */}
                            {message && (
                                <div className={`mt-4 p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {message.text}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-divider bg-white flex justify-end gap-2">
                    <button
                        onClick={onOpenChange}
                        className="px-6 py-2 rounded-lg font-bold text-muted hover:bg-gray-100 transition-colors"
                    >
                        Đóng
                    </button>
                    <button
                        onClick={activeTab === "personal" ? handleUpdateProfile : handleChangePassword}
                        disabled={activeTab === "personal" ? updateProfileMutation.isPending : changePasswordMutation.isPending}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-all shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed ${activeTab === "personal" ? "bg-green-900 hover:bg-green-800" : "bg-orange-600 hover:bg-orange-700"
                            }`}
                    >
                        {activeTab === "personal"
                            ? (updateProfileMutation.isPending ? "Đang lưu..." : "Lưu thay đổi")
                            : (changePasswordMutation.isPending ? "Đang xử lý..." : "Đổi mật khẩu")
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}
