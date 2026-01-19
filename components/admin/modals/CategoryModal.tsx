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
import { categoryService } from "@/lib/api/services/category";
import { toast } from "react-toastify";
import { CreateCategoryRequest, CategoryResponse, UpdateCategoryRequest } from "@/lib/api/types";
import ImageUpload from "@/components/common/ImageUpload";

interface CategoryModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    categoryToEdit?: CategoryResponse | null;
}

export default function CategoryModal({ isOpen, onOpenChange, categoryToEdit }: CategoryModalProps) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateCategoryRequest>();

    useEffect(() => {
        if (categoryToEdit) {
            setValue("name", categoryToEdit.name);
            setValue("description", categoryToEdit.description || "");
            setValue("image", categoryToEdit.image || "");
        } else {
            reset({
                name: "",
                description: "",
                image: ""
            });
        }
    }, [categoryToEdit, setValue, reset, isOpen]);

    const createMutation = useMutation({
        mutationFn: (data: CreateCategoryRequest) => categoryService.createCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
            toast.success("Category created successfully");
            onOpenChange();
            reset();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create category");
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: UpdateCategoryRequest) => categoryService.updateCategory(categoryToEdit!.categoryId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
            toast.success("Category updated successfully");
            onOpenChange();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update category");
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
                            {categoryToEdit ? "Edit Category" : "Add New Category"}
                        </ModalHeader>
                        <ModalBody>
                            <div className="space-y-6 border border-divider p-6 rounded-lg bg-gray-50/30">
                                <div className="p-2 border border-dashed border-divider rounded-lg bg-white">
                                    <ImageUpload
                                        label="Category Image"
                                        value={categoryToEdit?.image || ""}
                                        onChange={(url) => setValue("image", url)}
                                    />
                                </div>

                                <Input
                                    {...register("name", { required: "Name is required" })}
                                    label="Category Name"
                                    placeholder="e.g., Living Room"
                                    variant="bordered"
                                    errorMessage={errors.name?.message}
                                    isInvalid={!!errors.name}
                                    labelPlacement="outside"
                                    classNames={{ inputWrapper: "bg-white" }}
                                />

                                <Textarea
                                    {...register("description", { required: "Description is required" })}
                                    label="Description"
                                    placeholder="Category description..."
                                    variant="bordered"
                                    errorMessage={errors.description?.message}
                                    isInvalid={!!errors.description}
                                    labelPlacement="outside"
                                    classNames={{ inputWrapper: "bg-white" }}
                                />
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
                                {categoryToEdit ? "Save Changes" : "Create Category"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
