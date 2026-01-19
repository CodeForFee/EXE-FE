"use client";

import React, { useEffect } from "react";
import {
    Button,
    Input,
    Avatar,
    Card,
    CardBody,
    Tabs,
    Tab,
    Spacer,
    Divider
} from "@heroui/react";
import { useUserStore } from "@/lib/stores/useUserStore";
import { UserRequest, UserResponse, ChangePasswordRequest } from "@/lib/api/types";
import { userService } from "@/lib/api/services/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, CameraIcon, UserIcon, ShieldCheckIcon, UploadCloud } from "lucide-react";
import Link from "next/link";
import Cookies from "js-cookie";
import axios from "axios";

export default function ProfilePage() {
    const { user, fetchUser } = useUserStore();
    const queryClient = useQueryClient();

    // Local state for form fields to handle inputs
    const [formData, setFormData] = React.useState<UserRequest>({
        fullName: "",
        phone: "",
        address: "",
        image: ""
    });

    const [isUploading, setIsUploading] = React.useState(false);

    const [passData, setPassData] = React.useState<ChangePasswordRequest>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Sync user data to form when user loads
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                phone: user.phone || "",
                address: user.address || "",
                image: user.image || ""
            });
        } else {
            fetchUser();
        }
    }, [user, fetchUser]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
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
            setMessage({ type: 'success', text: "Tải ảnh lên thành công!" });
        } catch (error) {
            console.error("Upload error:", error);
            setMessage({ type: 'error', text: error.response?.data?.message || "Lỗi tải ảnh. Vui lòng kiểm tra cấu hình Cloudinary." });
        } finally {
            setIsUploading(false);
        }
    };

    // Mutation for updating profile
    const updateProfileMutation = useMutation({
        mutationFn: async (data: UserRequest) => {
            if (!user?.id) throw new Error("No user ID");
            return await userService.updateUser(user.id, data);
        },
        onSuccess: async (updatedUser) => {
            setMessage({ type: 'success', text: "Cập nhật hồ sơ thành công!" });
            await fetchUser(); // Refresh store
        },
        onError: (error: any) => {
            setMessage({ type: 'error', text: error.response?.data?.message || "Cập nhật thất bại" });
        }
    });

    // Mutation for changing password
    const changePasswordMutation = useMutation({
        mutationFn: async (data: ChangePasswordRequest) => {
            if (!user?.id) throw new Error("No user ID");
            return await userService.changePassword(user.id, data);
        },
        onSuccess: () => {
            setMessage({ type: 'success', text: "Đổi mật khẩu thành công! Vui lòng đăng nhập lại." });
            setPassData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            // Optionally logout user
        },
        onError: (error: any) => {
            setMessage({ type: 'error', text: error.response?.data?.message || "Đổi mật khẩu thất bại" });
        }
    });

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfileMutation.mutate(formData);
    };

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passData.newPassword !== passData.confirmPassword) {
            setMessage({ type: 'error', text: "Mật khẩu xác nhận không khớp" });
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
                        <Card className="bg-white/80 backdrop-blur-md border border-divider shadow-medium sticky top-24">
                            <CardBody className="flex flex-col items-center py-8 text-center bg-wood-light/10">
                                <div className="relative group">
                                    {(formData.image || user.image) ? (
                                        <img
                                            src={formData.image || user.image}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4 bg-green-900"
                                        />
                                    ) : (
                                        <Avatar
                                            className="w-32 h-32 text-4xl font-bold bg-green-900 text-cream mb-4 border-4 border-white shadow-lg"
                                            name={user.fullName?.charAt(0)}
                                        />
                                    )}
                                    <label className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                        <CameraIcon className="text-white w-8 h-8" />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={isUploading}
                                        />
                                    </label>
                                    {isUploading && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                                        </div>
                                    )}
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
                            </CardBody>
                        </Card>
                    </div>

                    {/* Right Content: Tabs & Forms */}
                    <div className="md:col-span-8 lg:col-span-9">
                        <Card className="bg-white shadow-medium border border-divider min-h-[500px]">
                            <CardBody className="p-0">
                                <Tabs
                                    aria-label="Options"
                                    color="success"
                                    variant="underlined"
                                    classNames={{
                                        tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider px-6",
                                        cursor: "w-full bg-green-900",
                                        tab: "max-w-fit px-0 h-14",
                                        tabContent: "group-data-[selected=true]:text-green-900 font-heading font-semibold text-base"
                                    }}
                                >
                                    <Tab
                                        key="personal"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <UserIcon size={18} />
                                                <span>Thông tin cá nhân</span>
                                            </div>
                                        }
                                    >
                                        <form onSubmit={handleUpdateProfile} className="p-6 md:p-8 space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-green-900">Họ và tên</label>
                                                    <Input
                                                        aria-label="Full Name"
                                                        value={formData.fullName}
                                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                                        variant="bordered"
                                                        radius="sm"
                                                        classNames={{
                                                            inputWrapper: "border-divider focus-within:border-green-700 bg-main/30",
                                                        }}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-semibold text-green-900">Số điện thoại</label>
                                                    <Input
                                                        aria-label="Phone"
                                                        value={formData.phone}
                                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                        variant="bordered"
                                                        radius="sm"
                                                        placeholder="Chưa cập nhật"
                                                        classNames={{
                                                            inputWrapper: "border-divider focus-within:border-green-700 bg-main/30",
                                                        }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-green-900">Email (Không thể thay đổi)</label>
                                                <Input
                                                    aria-label="Email"
                                                    value={user.email}
                                                    readOnly
                                                    disabled
                                                    variant="flat"
                                                    radius="sm"
                                                    className="opacity-70"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-green-900">Địa chỉ giao hàng</label>
                                                <Input
                                                    aria-label="Address"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                    variant="bordered"
                                                    radius="sm"
                                                    placeholder="Nhập địa chỉ của bạn"
                                                    classNames={{
                                                        inputWrapper: "border-divider focus-within:border-green-700 bg-main/30",
                                                    }}
                                                />
                                            </div>

                                            {message && (
                                                <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {message.text}
                                                </div>
                                            )}

                                            <div className="flex justify-end pt-4">
                                                <Button
                                                    type="submit"
                                                    className="bg-green-900 text-cream font-heading font-bold shadow-soft hover:bg-green-700 transition-all"
                                                    isLoading={updateProfileMutation.isPending}
                                                    radius="sm"
                                                    size="lg"
                                                >
                                                    Lưu thay đổi
                                                </Button>
                                            </div>
                                        </form>
                                    </Tab>

                                    <Tab
                                        key="security"
                                        title={
                                            <div className="flex items-center space-x-2">
                                                <ShieldCheckIcon size={18} />
                                                <span>Bảo mật</span>
                                            </div>
                                        }
                                    >
                                        <form onSubmit={handleChangePassword} className="p-6 md:p-8 space-y-6 max-w-lg">
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-green-900">Mật khẩu hiện tại</label>
                                                <Input
                                                    type="password"
                                                    value={passData.currentPassword}
                                                    onChange={(e) => setPassData({ ...passData, currentPassword: e.target.value })}
                                                    variant="bordered"
                                                    radius="sm"
                                                    classNames={{
                                                        inputWrapper: "border-divider focus-within:border-green-700 bg-main/30",
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-green-900">Mật khẩu mới</label>
                                                <Input
                                                    type="password"
                                                    value={passData.newPassword}
                                                    onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                                                    variant="bordered"
                                                    radius="sm"
                                                    classNames={{
                                                        inputWrapper: "border-divider focus-within:border-green-700 bg-main/30",
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-semibold text-green-900">Xác nhận mật khẩu mới</label>
                                                <Input
                                                    type="password"
                                                    value={passData.confirmPassword}
                                                    onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                                                    variant="bordered"
                                                    radius="sm"
                                                    classNames={{
                                                        inputWrapper: "border-divider focus-within:border-green-700 bg-main/30",
                                                    }}
                                                />
                                            </div>

                                            {message && (
                                                <div className={`p-3 rounded-lg text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {message.text}
                                                </div>
                                            )}

                                            <div className="flex justify-start pt-4">
                                                <Button
                                                    type="submit"
                                                    className="bg-wood-medium text-white font-heading font-bold shadow-soft hover:bg-wood-dark transition-all"
                                                    isLoading={changePasswordMutation.isPending}
                                                    radius="sm"
                                                    size="lg"
                                                >
                                                    Đổi mật khẩu
                                                </Button>
                                            </div>
                                        </form>
                                    </Tab>
                                </Tabs>
                            </CardBody>
                        </Card>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
