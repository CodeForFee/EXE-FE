"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
    SelectItem,
} from "@heroui/react";
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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
        // Khi mở modal, set form state đúng theo mode edit/create
        if (!isOpen) {
            setSelectedFile(null);
            return;
        }

        if (productToEdit) {
            reset({
                name: productToEdit.name ?? "",
                description: productToEdit.description ?? "",
                price: Number(productToEdit.price ?? 0),
                stock: Number(productToEdit.stock ?? 0),
                categoryId: String(productToEdit.categoryId ?? ""),
                images: [productToEdit.image ?? ""],
                status: (productToEdit as any).status ?? "AVAILABLE",
            });
        } else {
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
        setSelectedFile(null); // Reset file selection on open
    }, [productToEdit, reset, isOpen]);

    const createMutation = useMutation({
        mutationFn: (data: CreateFurnitureRequest) => furnitureService.createFurniture(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "furniture"] });
            toast.success("Product created successfully");
            onOpenChange();
            reset();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to create product");
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: UpdateFurnitureRequest) =>
            furnitureService.updateFurniture(productToEdit!.furnitureId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "furniture"] });
            toast.success("Product updated successfully");
            onOpenChange();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to update product");
        },
    });

    const onSubmit = async (data: CreateFurnitureRequest) => {
        try {
            setIsUploading(true);
            let imageUrl = productToEdit?.image || "";

            // If a new file is selected, upload it first
            if (selectedFile) {
                imageUrl = await uploadService.uploadImage(selectedFile);
            }

            const payload: CreateFurnitureRequest = {
                ...data,
                price: Number(data.price),
                stock: Number(data.stock),
                images: [imageUrl],
            };

            if (productToEdit) {
                updateMutation.mutate(payload as any);
            } else {
                createMutation.mutate(payload);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Failed to upload image or save product.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            placement="center"
            backdrop="blur"
            scrollBehavior="inside"
        >
            <ModalContent>
                {(onClose) => (
                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                        <ModalHeader className="flex flex-col gap-1 font-heading text-green-950">
                            {productToEdit ? "Edit Product" : "Add New Product"}
                        </ModalHeader>

                        <ModalBody>
                            <div className="space-y-8 border border-divider p-8 rounded-xl bg-gray-50/50">
                                {/* IMAGE UPLOAD SECTION */}
                                <div>
                                    <ImageUpload
                                        label="Product Image"
                                        value={productToEdit?.image || ""} // Initial value primarily
                                        onChange={() => { }} // Not used for manual, handled by onFileSelect
                                        onFileSelect={setSelectedFile}
                                        className="mb-2"
                                    />
                                    {/* Show validation error if needed? For now optional or checked at submit */}
                                </div>

                                {/* FORM FIELDS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                                        <Input
                                            {...register("name", { required: "Name is required" })}
                                            placeholder=""
                                            variant="bordered"
                                            isInvalid={!!errors.name}
                                            errorMessage={errors.name?.message}
                                            classNames={{
                                                inputWrapper: "bg-white shadow-sm",
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                        <Controller
                                            name="categoryId"
                                            control={control}
                                            rules={{ required: "Category is required" }}
                                            render={({ field }) => (
                                                <Select
                                                    placeholder="Select category"
                                                    variant="bordered"
                                                    isInvalid={!!errors.categoryId}
                                                    errorMessage={errors.categoryId?.message}
                                                    selectedKeys={field.value ? [String(field.value)] : []}
                                                    onSelectionChange={(keys) => {
                                                        const first = Array.from(keys)[0];
                                                        field.onChange(first ? String(first) : "");
                                                    }}
                                                    classNames={{
                                                        trigger: "bg-white shadow-sm",
                                                    }}
                                                    selectionMode="single"
                                                >
                                                    {(categories || []).map((cat: any) => (
                                                        <SelectItem key={String(cat.categoryId)}>
                                                            {cat.name}
                                                        </SelectItem>
                                                    ))}
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price (VND)</label>
                                        <Input
                                            {...register("price", {
                                                required: "Price is required",
                                                min: { value: 0, message: "Price must be >= 0" }
                                            })}
                                            placeholder=""
                                            type="number"
                                            variant="bordered"
                                            isInvalid={!!errors.price}
                                            errorMessage={errors.price?.message}
                                            classNames={{
                                                inputWrapper: "bg-white shadow-sm",
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
                                        <Input
                                            {...register("stock", {
                                                required: "Stock is required",
                                                min: { value: 0, message: "Stock must be >= 0" }
                                            })}
                                            placeholder=""
                                            type="number"
                                            variant="bordered"
                                            isInvalid={!!errors.stock}
                                            errorMessage={errors.stock?.message}
                                            classNames={{
                                                inputWrapper: "bg-white shadow-sm",
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                                    <Controller
                                        name="status"
                                        control={control}
                                        rules={{ required: "Status is required" }}
                                        render={({ field }) => (
                                            <Select
                                                placeholder="Select status"
                                                variant="bordered"
                                                selectedKeys={field.value ? [field.value] : ["AVAILABLE"]}
                                                onSelectionChange={(keys) => {
                                                    const first = Array.from(keys)[0] as string;
                                                    field.onChange(first);
                                                }}
                                                classNames={{
                                                    trigger: "bg-white shadow-sm",
                                                }}
                                                selectionMode="single"
                                                disallowEmptySelection
                                            >
                                                <SelectItem key="AVAILABLE">Available</SelectItem>
                                                <SelectItem key="OUT_OF_STOCK">Out of Stock</SelectItem>
                                                <SelectItem key="DISCONTINUED">Discontinued</SelectItem>
                                            </Select>
                                        )}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                                    <Textarea
                                        {...register("description", { required: "Description is required" })}
                                        placeholder=""
                                        variant="bordered"
                                        minRows={4}
                                        isInvalid={!!errors.description}
                                        errorMessage={errors.description?.message}
                                        classNames={{
                                            inputWrapper: "bg-white shadow-sm",
                                            input: "min-h-[120px]"
                                        }}
                                    />
                                </div>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose} disabled={isUploading}>
                                Cancel
                            </Button>
                            <Button
                                className="bg-green-900 text-white font-bold shadow-lg"
                                type="submit"
                                isLoading={isUploading || createMutation.isPending || updateMutation.isPending}
                            >
                                {productToEdit ? "Update Product" : "Create Product"}
                            </Button>
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
    );
}
