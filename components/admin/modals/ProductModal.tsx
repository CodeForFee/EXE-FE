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
    Textarea,
    Select,
    SelectItem
} from "@heroui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { furnitureService } from "@/lib/api/services/furniture";
import { categoryService } from "@/lib/api/services/category";
import { toast } from "react-toastify";
import { CreateFurnitureRequest, FurnitureResponse, UpdateFurnitureRequest } from "@/lib/api/types";

interface ProductModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    productToEdit?: FurnitureResponse | null;
}

export default function ProductModal({ isOpen, onOpenChange, productToEdit }: ProductModalProps) {
    const queryClient = useQueryClient();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<CreateFurnitureRequest>();

    // Fetch categories for the select input
    const { data: categories } = useQuery({
        queryKey: ['categories', 'all'],
        queryFn: () => categoryService.getAllCategoriesNoPaging()
    });

    useEffect(() => {
        if (productToEdit) {
            setValue("name", productToEdit.name);
            setValue("description", productToEdit.description);
            setValue("price", productToEdit.price);
            setValue("stock", productToEdit.stock);
            setValue("categoryId", productToEdit.categoryId);
            setValue("images", [productToEdit.image]); // Simplified for now, backend expects array
        } else {
            reset({
                name: "",
                description: "",
                price: 0,
                stock: 0,
                categoryId: "",
                images: [""]
            });
        }
    }, [productToEdit, setValue, reset, isOpen]);

    const createMutation = useMutation({
        mutationFn: (data: CreateFurnitureRequest) => furnitureService.createFurniture(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'furniture'] });
            toast.success("Product created successfully");
            onOpenChange();
            reset();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create product");
        }
    });

    const updateMutation = useMutation({
        mutationFn: (data: UpdateFurnitureRequest) => furnitureService.updateFurniture(productToEdit!.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'furniture'] });
            toast.success("Product updated successfully");
            onOpenChange();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update product");
        }
    });

    const onSubmit = (data: CreateFurnitureRequest) => {
        // Ensure numbers are numbers
        const payload = {
            ...data,
            price: Number(data.price),
            stock: Number(data.stock),
            // Handle images -> single string input to array for now
            images: Array.isArray(data.images) ? data.images : [data.images]
        };

        if (productToEdit) {
            updateMutation.mutate(payload);
        } else {
            createMutation.mutate(payload);
        }
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl">
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalHeader className="flex flex-col gap-1 font-heading text-green-950">
                            {productToEdit ? "Edit Product" : "Add New Product"}
                        </ModalHeader>
                        <ModalBody>
                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    {...register("name", { required: "Name is required" })}
                                    label="Product Name"
                                    placeholder="Enter product name"
                                    variant="bordered"
                                    errorMessage={errors.name?.message}
                                    isInvalid={!!errors.name}
                                    classNames={{ inputWrapper: "bg-white" }}
                                />
                                <Select
                                    {...register("categoryId", { required: "Category is required" })}
                                    label="Category"
                                    placeholder="Select a category"
                                    variant="bordered"
                                    errorMessage={errors.categoryId?.message}
                                    isInvalid={!!errors.categoryId}
                                    defaultSelectedKeys={productToEdit?.categoryId ? [productToEdit.categoryId.toString()] : []} // Fix potential issue
                                    classNames={{ trigger: "bg-white" }}
                                >
                                    {(categories || []).map((cat) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    {...register("price", { required: "Price is required", min: 0 })}
                                    label="Price (VND)"
                                    placeholder="0"
                                    type="number"
                                    variant="bordered"
                                    errorMessage={errors.price?.message}
                                    isInvalid={!!errors.price}
                                    classNames={{ inputWrapper: "bg-white" }}
                                />
                                <Input
                                    {...register("stock", { required: "Stock is required", min: 0 })}
                                    label="Stock Quantity"
                                    placeholder="0"
                                    type="number"
                                    variant="bordered"
                                    errorMessage={errors.stock?.message}
                                    isInvalid={!!errors.stock}
                                    classNames={{ inputWrapper: "bg-white" }}
                                />
                            </div>

                            <Textarea
                                {...register("description", { required: "Description is required" })}
                                label="Description"
                                placeholder="Product description..."
                                variant="bordered"
                                errorMessage={errors.description?.message}
                                isInvalid={!!errors.description}
                                classNames={{ inputWrapper: "bg-white" }}
                            />

                            <Input
                                {...register("images.0")}
                                label="Image URL"
                                placeholder="https://example.com/image.jpg"
                                variant="bordered"
                                description="Enter the direct URL of the product image."
                                classNames={{ inputWrapper: "bg-white" }}
                            />

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
                                {productToEdit ? "Save Changes" : "Create Product"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
