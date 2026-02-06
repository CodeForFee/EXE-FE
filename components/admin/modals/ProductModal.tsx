"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { furnitureService } from "@/lib/api/services/furniture";
import { categoryService } from "@/lib/api/services/category";
import { uploadService } from "@/lib/api/services/upload";
import { toast } from "react-toastify";
import {
    CreateFurnitureRequest,
    FurnitureResponse,
    UpdateFurnitureRequest,
} from "@/lib/api/types";
import ImageUpload from "@/components/common/ImageUpload";

interface ProductModalProps {
    isOpen: boolean;
    onOpenChange: () => void;
    productToEdit?: FurnitureResponse | null;
}

export default function ProductModal({
    isOpen,
    onOpenChange,
    productToEdit,
}: ProductModalProps) {
    const queryClient = useQueryClient();
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors },
    } = useForm<CreateFurnitureRequest>({
        defaultValues: {
            name: "",
            description: "",
            price: undefined,
            stock: undefined,
            categoryId: "",
            images: [""],
            status: "AVAILABLE",
        },
        mode: "onTouched",
    });

    const { data: categories } = useQuery({
        queryKey: ["categories", "all"],
        queryFn: () => categoryService.getAllCategoriesNoPaging(),
    });

    useEffect(() => {
        if (!isOpen) {
            setUploadedImageUrl("");
            return;
        }

        if (productToEdit) {
            setUploadedImageUrl(productToEdit.primaryImageUrl || productToEdit.image || "");
            reset({
                name: productToEdit.name ?? "",
                description: productToEdit.description ?? "",
                price: Number(productToEdit.price ?? 0),
                stock: Number(productToEdit.stock ?? 0),
                categoryId: String(productToEdit.categoryId ?? ""),
                images: [productToEdit.primaryImageUrl || productToEdit.image || ""],
                status: (productToEdit as any).status ?? "AVAILABLE",
            });
        } else {
            setUploadedImageUrl("");
            reset({
                name: "",
                description: "",
                price: undefined,
                stock: undefined,
                categoryId: "",
                images: [""],
                status: "AVAILABLE",
            });
        }
    }, [productToEdit, reset, isOpen]);

    const createMutation = useMutation({
        mutationFn: (data: CreateFurnitureRequest) => furnitureService.createFurniture(data),
    });

    const updateMutation = useMutation({
        mutationFn: (data: UpdateFurnitureRequest) =>
            furnitureService.updateFurniture(productToEdit!.furnitureId, data),
    });

    const onSubmit = async (data: CreateFurnitureRequest) => {
        try {
            setIsUploading(true);
            const finalImageUrl = uploadedImageUrl;

            // 1. Prepare base payload (exclude images from main payload if backend relies on separate EP, but keeping for safety if hybrid)
            const payload: CreateFurnitureRequest = {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
                categoryId: String(data.categoryId),
                images: [], // Clear images from payload as we use separate EP
                primaryImageUrl: undefined // Clear primaryImageUrl
            };

            let furnitureId: string | undefined;

            // 2. Perform Create or Update
            if (productToEdit) {
                furnitureId = productToEdit.furnitureId;
                await updateMutation.mutateAsync({ ...payload });
            } else {
                const newProduct = await createMutation.mutateAsync(payload);
                furnitureId = newProduct.furnitureId;
            }

            // 3. Handle Image via separate API if we have an image and a valid ID
            if (furnitureId && finalImageUrl) {
                // Check if image is new or changed. For simplicity, we can just add it as primary.
                // The new endpoint: addImages(id, [{ imageUrl, isPrimary: true, displayOrder: 0 }])
                // Only add if it's a new URL or we want to ensure it's primary.
                // For "Update", if the URL is the same as before, maybe we skip or still enforce it? 
                // Let's enforce it to ensure consistency.

                // Note: If updating, user might want to optimize to not re-upload/re-link if same.
                // But `addImages` might strictly append. 
                // If it's a new upload, `finalImageUrl` is definitely different (or at least valid).

                await furnitureService.addImages(furnitureId, [{
                    imageUrl: finalImageUrl,
                    isPrimary: true,
                    displayOrder: 0
                }]);
            }

            // 4. Success handling
            queryClient.invalidateQueries({ queryKey: ["admin", "furniture"] });
            toast.success(productToEdit ? "Product updated successfully" : "Product created successfully");
            onOpenChange();
            reset();

        } catch (error: any) {
            console.error("Error submitting form details:", error);
            const msg = error?.response?.data?.message || "Failed to save product.";
            toast.error(msg);
        } finally {
            setIsUploading(false);
        }
    };

    const inputClassName = (hasError: boolean) =>
        `w-full px-4 py-3 rounded-lg border focus:outline-none transition-colors bg-white shadow-sm ${hasError ? "border-red-500 focus:border-red-500" : "border-divider focus:border-green-700"}`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onOpenChange}
            title={productToEdit ? "Edit Product" : "Add New Product"}
            size="2xl"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col h-full">
                <div className="space-y-8 p-1">
                    {/* IMAGE UPLOAD SECTION */}
                    <div>
                        <ImageUpload
                            label="Product Image"
                            value={uploadedImageUrl}
                            onChange={(url) => setUploadedImageUrl(url)}
                            className="mb-2"
                        />
                    </div>

                    {/* FORM FIELDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Product Name</label>
                            <input
                                {...register("name", { required: "Name is required" })}
                                className={inputClassName(!!errors.name)}
                                placeholder="Enter product name"
                            />
                            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Category</label>
                            <select
                                {...register("categoryId", { required: "Category is required" })}
                                className={inputClassName(!!errors.categoryId)}
                            >
                                <option value="" disabled>Select category</option>
                                {(categories || []).map((cat: any) => (
                                    <option key={String(cat.categoryId)} value={String(cat.categoryId)}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryId && <p className="text-xs text-red-500">{errors.categoryId.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Price (VND)</label>
                            <input
                                {...register("price", {
                                    required: "Price is required",
                                    min: { value: 0, message: "Price must be >= 0" }
                                })}
                                type="number"
                                className={inputClassName(!!errors.price)}
                                placeholder="0"
                            />
                            {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">Stock Quantity</label>
                            <input
                                {...register("stock", {
                                    required: "Stock is required",
                                    min: { value: 0, message: "Stock must be >= 0" }
                                })}
                                type="number"
                                className={inputClassName(!!errors.stock)}
                                placeholder="0"
                            />
                            {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Status</label>
                        <select
                            {...register("status", { required: "Status is required" })}
                            className={inputClassName(!!errors.status)}
                        >
                            <option value="AVAILABLE">Available</option>
                            <option value="OUT_OF_STOCK">Out of Stock</option>
                            <option value="DISCONTINUED">Discontinued</option>
                        </select>
                        {errors.status && <p className="text-xs text-red-500">{errors.status.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            rows={4}
                            className={`${inputClassName(!!errors.description)} min-h-[120px]`}
                            placeholder="Enter product description"
                        />
                        {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-divider">
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={onOpenChange}
                        disabled={isUploading}
                        className="text-red-600 hover:bg-red-50"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        isLoading={isUploading || createMutation.isPending || updateMutation.isPending}
                        className="bg-green-900 shadow-lg"
                    >
                        {productToEdit ? "Update Product" : "Create Product"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
