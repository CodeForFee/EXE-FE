"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Textarea
} from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { discountService } from "@/lib/api/services/discount";
import { toast } from "react-toastify";
import { CreateDiscountRequest, DiscountResponse, UpdateDiscountRequest } from "@/lib/api/types";

interface DiscountModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    discountToEdit?: DiscountResponse | null;
}

export default function DiscountModal({ isOpen, onOpenChange, discountToEdit }: DiscountModalProps) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateDiscountRequest>();

    useEffect(() => {
        if (discountToEdit) {
            setValue("description", discountToEdit.description);
            setValue("percentage", discountToEdit.percentage);
            // Format dates for input type="date" (YYYY-MM-DD) or "datetime-local"
            const formatDate = (dateString: string) => {
                if (!dateString) return "";
                return dateString.split('T')[0];
            };

            setValue("startDate", formatDate(discountToEdit.startDate));
            setValue("endDate", formatDate(discountToEdit.endDate));
        } else {
            reset({
                description: "",
                percentage: 0,
                startDate: "",
                endDate: ""
            });
        }
    }, [discountToEdit, setValue, reset, isOpen]);

    const createMutation = useMutation({
        mutationFn: (data: CreateDiscountRequest) => {
            // Append time to date to satisfy backend ISO format expectation if needed, or rely on simple date
            // Assuming backend handles "2023-10-10" as start of day.
            // Actually types.ts says string. Let's send what input gives (YYYY-MM-DD) + Time if needed.
            // Let's assume input type="datetime-local" for precision or just date.
            // Let's use datetime-local to be safe if backend uses LocalDateTime
            return discountService.createDiscount(data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'discounts'] });
            toast.success("Discount created successfully");
            onOpenChange();
            reset();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create discount");
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: UpdateDiscountRequest) => discountService.updateDiscount(discountToEdit!.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'discounts'] });
            toast.success("Discount updated successfully");
            onOpenChange();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update discount");
        }
    });

    const onSubmit = (data: CreateDiscountRequest) => {
        // Ensure percentage is 0-1 if backend expects decimal, or 0-100 if percent.
        // DTO says "0.01-100" in controller comment, but field is `percentage`.
        // Let's assume user inputs 10 for 10%.
        // Actually standard is usually 0.1 for 10%. Let's check Controller comment: "percentage value (0.01-100)".
        // It likely expects 10 for 10%.

        // Need to ensure dates are in correct format.
        // If input type="date", we get "YYYY-MM-DD".
        // Backend LocalDateTime might expect "YYYY-MM-DDTHH:mm:ss".
        const ensureTime = (date: string) => date.includes('T') ? date : `${date}T00:00:00`;

        const payload = {
            ...data,
            percentage: Number(data.percentage),
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
            onOpenChange={onOpenChange}
            placement="center"
            backdrop="blur"
            size="lg"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1 font-heading text-green-950">
                            {discountToEdit ? "Edit Discount" : "Add New Discount"}
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-6 border border-divider p-6 rounded-lg bg-gray-50/30">
                                <Textarea
                                    {...register("description", { required: "Description is required" })}
                                    label="Description"
                                    placeholder="Discount description (e.g., Summer Sale)"
                                    variant="bordered"
                                    errorMessage={errors.description?.message}
                                    isInvalid={!!errors.description}
                                    labelPlacement="outside"
                                    classNames={{ inputWrapper: "bg-white" }}
                                />

                                <Input
                                    {...register("percentage", { required: "Percentage is required", min: 0, max: 100 })}
                                    label="Percentage (%)"
                                    placeholder="10"
                                    type="number"
                                    step="0.01"
                                    variant="bordered"
                                    errorMessage={errors.percentage?.message}
                                    isInvalid={!!errors.percentage}
                                    description="Enter value between 0 and 100"
                                    labelPlacement="outside"
                                    classNames={{ inputWrapper: "bg-white" }}
                                />

                                <div className="grid grid-cols-2 gap-6">
                                    <Input
                                        {...register("startDate", { required: "Start Date is required" })}
                                        label="Start Date"
                                        type="date"
                                        variant="bordered"
                                        errorMessage={errors.startDate?.message}
                                        isInvalid={!!errors.startDate}
                                        labelPlacement="outside"
                                        placeholder=" "
                                        classNames={{ inputWrapper: "bg-white" }}
                                    />
                                    <Input
                                        {...register("endDate", { required: "End Date is required" })}
                                        label="End Date"
                                        type="date"
                                        variant="bordered"
                                        errorMessage={errors.endDate?.message}
                                        isInvalid={!!errors.endDate}
                                        labelPlacement="outside"
                                        placeholder=" "
                                        classNames={{ inputWrapper: "bg-white" }}
                                    />
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                Cancel
                            </Button>
                            <Button
                                color="success"
                                type="submit"
                                className="bg-green-900 text-cream font-bold"
                                isLoading={createMutation.isPending || updateMutation.isPending}
                            >
                                {discountToEdit ? "Save Changes" : "Create Discount"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
