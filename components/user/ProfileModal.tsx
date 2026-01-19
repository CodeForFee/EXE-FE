"use client";

import React, { useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Avatar,
    Tabs,
    Tab
} from "@heroui/react";
import { useUserStore } from "@/lib/stores/useUserStore";
import { UserRequest, UserResponse, ChangePasswordRequest } from "@/lib/api/types";
import { userService } from "@/lib/api/services/user";
import { useMutation } from "@tanstack/react-query";
import { UserIcon, ShieldCheckIcon, CameraIcon } from "lucide-react";

interface ProfileModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
}

export default function ProfileModal({ isOpen, onOpenChange }: ProfileModalProps) {
    const { user, fetchUser } = useUserStore();

    // Local state
    const [formData, setFormData] = React.useState<UserRequest>({
        fullName: "",
        phone: "",
        address: "",
        image: ""
    });

    const [passData, setPassData] = React.useState<ChangePasswordRequest>({
        oldPassword: "",
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
            await fetchUser();
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
            setPassData({ oldPassword: "", newPassword: "", confirmPassword: "" });
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

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            scrollBehavior="inside"
            classNames={{
                base: "bg-main",
                header: "border-b border-divider",
                footer: "border-t border-divider",
                closeButton: "hover:bg-black/5 active:bg-black/10 transition-colors"
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            <h3 className="font-heading text-xl font-bold text-green-900">Hồ sơ người dùng</h3>
                            <p className="text-small text-muted font-normal">Quản lý thông tin cá nhân và bảo mật</p>
                        </ModalHeader>
                        <ModalBody className="p-0">
                            <div className="flex flex-col md:flex-row h-full min-h-[400px]">
                                {/* Sidebar (Visual) */}
                                <div className="md:w-1/3 bg-wood-light/10 p-6 flex flex-col items-center border-r border-divider">
                                    <div className="relative group mb-4">
                                        <Avatar
                                            src={user.image}
                                            className="w-24 h-24 text-2xl font-bold bg-green-900 text-cream border-4 border-white shadow-md"
                                            name={user.fullName?.charAt(0)}
                                        />
                                    </div>
                                    <h4 className="font-bold text-lg text-center text-green-900">{user.fullName}</h4>
                                    <p className="text-xs text-muted mb-4">{user.email}</p>

                                    <div className="w-full flex flex-col gap-2 mt-2">
                                        <Button
                                            variant={activeTab === "personal" ? "flat" : "light"}
                                            color={activeTab === "personal" ? "success" : "default"}
                                            className="justify-start font-medium"
                                            startContent={<UserIcon size={18} />}
                                            onPress={() => { setActiveTab("personal"); setMessage(null); }}
                                        >
                                            Thông tin cá nhân
                                        </Button>
                                        <Button
                                            variant={activeTab === "security" ? "flat" : "light"}
                                            color={activeTab === "security" ? "warning" : "default"}
                                            className="justify-start font-medium"
                                            startContent={<ShieldCheckIcon size={18} />}
                                            onPress={() => { setActiveTab("security"); setMessage(null); }}
                                        >
                                            Bảo mật
                                        </Button>
                                    </div>
                                </div>

                                {/* Main Content */}
                                <div className="md:w-2/3 p-6 bg-white">
                                    {activeTab === "personal" ? (
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-lg mb-4 text-green-900">Chỉnh sửa thông tin</h4>

                                            <Input
                                                label="Họ và tên"
                                                variant="bordered"
                                                value={formData.fullName}
                                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            />
                                            <Input
                                                label="Số điện thoại"
                                                variant="bordered"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            />
                                            <Input
                                                label="Địa chỉ"
                                                variant="bordered"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            />
                                            <Input
                                                label="URL Ảnh đại diện"
                                                variant="bordered"
                                                value={formData.image}
                                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                            />
                                            <Input
                                                label="Email"
                                                variant="flat"
                                                value={user.email}
                                                isReadOnly
                                                className="opacity-60"
                                            />
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            <h4 className="font-bold text-lg mb-4 text-warning-600">Đổi mật khẩu</h4>
                                            <Input
                                                label="Mật khẩu cũ"
                                                type="password"
                                                variant="bordered"
                                                value={passData.oldPassword}
                                                onChange={(e) => setPassData({ ...passData, oldPassword: e.target.value })}
                                            />
                                            <Input
                                                label="Mật khẩu mới"
                                                type="password"
                                                variant="bordered"
                                                value={passData.newPassword}
                                                onChange={(e) => setPassData({ ...passData, newPassword: e.target.value })}
                                            />
                                            <Input
                                                label="Xác nhận mật khẩu"
                                                type="password"
                                                variant="bordered"
                                                value={passData.confirmPassword}
                                                onChange={(e) => setPassData({ ...passData, confirmPassword: e.target.value })}
                                            />
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
                        </ModalBody>
                        <ModalFooter className="bg-white">
                            <Button variant="light" onPress={onClose}>
                                Đóng
                            </Button>
                            <Button
                                color={activeTab === "personal" ? "success" : "warning"}
                                className={activeTab === "personal" ? "bg-green-900 text-cream" : ""}
                                onPress={activeTab === "personal" ? handleUpdateProfile : handleChangePassword}
                                isLoading={activeTab === "personal" ? updateProfileMutation.isPending : changePasswordMutation.isPending}
                            >
                                {activeTab === "personal" ? "Lưu thay đổi" : "Đổi mật khẩu"}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
