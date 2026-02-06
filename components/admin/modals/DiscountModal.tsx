"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { discountService } from "@/lib/api/services/discount";
import type { DiscountResponse, CreateDiscountRequest, UpdateDiscountRequest } from "@/lib/api/types";
import { toast } from "react-toastify";

interface DiscountModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    discountToEdit?: DiscountResponse | null;
    onSuccess?: () => void;
}

export default function DiscountModal({ isOpen, onOpenChange, discountToEdit, onSuccess }: DiscountModalProps) {
    
    const { 
        register, 
        handleSubmit, 
        setValue, 
        reset,
        formState: { errors } 
    } = useForm<CreateDiscountRequest>({
        defaultValues: {
            name: "",
            value: 0,
            startDate: "",
            endDate: "",
            furnitureIds: []
        }
    });

    // Reset form when modal opens with edit data
    useEffect(() => {
        if (isOpen && discountToEdit) {
            setValue("name", discountToEdit.name);
            setValue("value", discountToEdit.value);
            setValue("startDate", discountToEdit.startDate.split('T')[0]); // Extract date only
            setValue("endDate", discountToEdit.endDate.split('T')[0]);
        } else if (isOpen) {
            reset();
        }
    }, [isOpen, discountToEdit, setValue, reset]);

    // Create mutation
    const createMutation = useMutation({
        mutationFn: (data: CreateDiscountRequest) => discountService.createDiscount(data),
        onSuccess: () => {
            toast.success("Tạo giảm giá thành công!");
            reset();
            if (onSuccess) {
                onSuccess(); // Parent will handle invalidation and modal close
            } else {
                onOpenChange();
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Không thể tạo giảm giá");
        }
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: (data: UpdateDiscountRequest) => {
            if (!discountToEdit?.discountId) throw new Error("No discount ID");
            return discountService.updateDiscount(discountToEdit.discountId, data);
        },
        onSuccess: () => {
            toast.success("Cập nhật giảm giá thành công!");
            reset();
            if (onSuccess) {
                onSuccess(); // Parent will handle invalidation and modal close
            } else {
                onOpenChange();
            }
        },
        onError: (error: any) => {
            toast.error(error.message || "Không thể cập nhật giảm giá");
        }
    });

    const onSubmit = (data: CreateDiscountRequest) => {
        // Ensure timestamps for dates
        const ensureTime = (date: string) => date.includes('T') ? date : `${date}T00:00:00`;
        const payload = {
            ...data,
            value: Number(data.value),
            startDate: ensureTime(data.startDate),
            endDate: ensureTime(data.endDate)
        };

        if (discountToEdit) {
            updateMutation.mutate(payload);
        } else {
            createMutation.mutate(payload);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onOpenChange}
            title={discountToEdit ? "Chỉnh sửa giảm giá" : "Thêm giảm giá mới"}
            size="lg"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
                <div className="space-y-6 p-1">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-green-900">Tên chương trình giảm giá</label>
                        <input
                            {...register("name", { required: "Tên là bắt buộc" })}
                            placeholder="VD: Giảm giá mùa hè, Black Friday..."
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.name ? "border-red-500 focus:border-red-500" : "border-divider focus:border-green-700"}`}
                        />
                        {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-green-900">Giá trị giảm (%)</label>
                        <input
                            {...register("value", { 
                                required: "Giá trị giảm là bắt buộc", 
                                min: { value: 0, message: "Tối thiểu 0%" },
                                max: { value: 100, message: "Tối đa 100%" }
                            })}
                            placeholder="10"
                            type="number"
                            step="0.01"
                            className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.value ? "border-red-500 focus:border-red-500" : "border-divider focus:border-green-700"}`}
                        />
                        {errors.value && <p className="text-xs text-red-500">{errors.value.message}</p>}
                        <p className="text-xs text-muted">Nhập giá trị từ 0 đến 100</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-green-900">Ngày bắt đầu</label>
                            <input
                                {...register("startDate", { required: "Ngày bắt đầu là bắt buộc" })}
                                type="date"
                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.startDate ? "border-red-500 focus:border-red-500" : "border-divider focus:border-green-700"}`}
                            />
                            {errors.startDate && <p className="text-xs text-red-500">{errors.startDate.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-green-900">Ngày kết thúc</label>
                            <input
                                {...register("endDate", { required: "Ngày kết thúc là bắt buộc" })}
                                type="date"
                                className={`w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors ${errors.endDate ? "border-red-500 focus:border-red-500" : "border-divider focus:border-green-700"}`}
                            />
                            {errors.endDate && <p className="text-xs text-red-500">{errors.endDate.message}</p>}
                        </div>
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
                        {discountToEdit ? "Lưu thay đổi" : "Tạo giảm giá"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
