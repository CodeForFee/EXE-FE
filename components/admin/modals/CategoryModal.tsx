"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/common/ImageUpload";
import { categoryService } from "@/lib/api/services/category";
import type { CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest } from "@/lib/api/types";
import { toast } from "react-toastify";

interface CategoryModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    categoryToEdit?: CategoryResponse | null;
}

export default function CategoryModal({ isOpen, onOpenChange, categoryToEdit }: CategoryModalProps) {
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors }
    } = useForm<CreateCategoryRequest>({
        defaultValues: {
            name: "",
            description: "",
            image: ""
        }
    });

    // Reset form when modal opens with edit data
    useEffect(() => {
        if (isOpen && categoryToEdit) {
            setValue("name", categoryToEdit.name);
            setValue("description", categoryToEdit.description || "");
            setValue("image", categoryToEdit.image || "");
        } else if (isOpen) {
            reset();
        }
    }, [isOpen, categoryToEdit, setValue, reset]);

    // Create mutation
    const createMutation = useMutation({
        mutationFn: (data: CreateCategoryRequest) => categoryService.createCategory(data),
        onSuccess: () => {
            toast.success("Tạo danh mục thành công!");
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            reset();
            onOpenChange();
        },
        onError: (error: any) => {
            toast.error(error.message || "Không thể tạo danh mục");
        }
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: (data: UpdateCategoryRequest) => {
            if (!categoryToEdit?.categoryId) throw new Error("No category ID");
            return categoryService.updateCategory(categoryToEdit.categoryId, data);
        },
        onSuccess: () => {
            toast.success("Cập nhật danh mục thành công!");
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            reset();
            onOpenChange();
        },
        onError: (error: Error) => {
            toast.error(error.message || "Không thể cập nhật danh mục");
        }
    });

    const onSubmit = (data: CreateCategoryRequest) => {
        if (categoryToEdit) {
            updateMutation.mutate(data);
        } else {
            createMutation.mutate(data);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onOpenChange}
            title={categoryToEdit ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="space-y-6 p-1">
                    <div className="p-2 border border-dashed border-divider rounded-lg bg-white">
                        <ImageUpload
                            label="Ảnh danh mục"
                            value={categoryToEdit?.image || ""}
                            onChange={(url) => setValue("image", url)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-green-900">Tên danh mục</label>
                        <input
                            {...register("name", { required: "Tên danh mục là bắt buộc" })}
                            placeholder="VD: Living Room, Bedroom..."
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.name ? "border-red-500 focus:border-red-500" : "border-divider focus:border-green-700"}`}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-green-900">Mô tả</label>
                        <textarea
                            {...register("description", { required: "Mô tả là bắt buộc" })}
                            placeholder="Mô tả về danh mục..."
                            rows={3}
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.description ? "border-red-500 focus:border-red-500" : "border-divider focus:border-green-700"}`}
                        />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-divider">
                    <Button variant="danger" type="button" onClick={onOpenChange}>
                        Hủy
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        isLoading={createMutation.isPending || updateMutation.isPending}
                    >
                        {categoryToEdit ? "Lưu thay đổi" : "Tạo danh mục"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
