"use client";

import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    keepPreviousData,
} from "@tanstack/react-query";
import { furnitureService } from "@/lib/api/services/furniture";
import { Page, FurnitureResponse } from "@/lib/api/types";
import { toast } from "react-toastify";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/react/24/outline";
import ProductModal from "@/components/admin/modals/ProductModal";

export default function AdminProductsPage() {
    const [page, setPage] = useState(1);
    const [selectedProduct, setSelectedProduct] =
        useState<FurnitureResponse | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();

    /* ================= QUERY ================= */
    const { data, isLoading } = useQuery<Page<FurnitureResponse>>({
        queryKey: ["admin", "furniture", page],
        queryFn: () => furnitureService.getAllFurniture(page - 1, 10),
        placeholderData: keepPreviousData,
    });

    /* ================= MUTATION ================= */
    const deleteMutation = useMutation({
        mutationFn: (id: string) => furnitureService.deleteFurniture(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin", "furniture"] });
            toast.success("Product deleted successfully");
        },
        onError: () => toast.error("Delete failed"),
    });

    /* ================= HANDLERS ================= */
    const handleEdit = (product: FurnitureResponse) => {
        setSelectedProduct(product);
        setIsOpen(true);
    };

    const handleCreate = () => {
        setSelectedProduct(null);
        setIsOpen(true);
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Delete "${name}" permanently?`)) {
            deleteMutation.mutate(id);
        }
    };

    /* ================= RENDER ================= */
    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-green-950">
                        Product Management
                    </h1>
                    <p className="text-gray-500 mt-1">
                        Manage your inventory, prices, and product details.
                    </p>
                </div>

                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded-md shadow hover:bg-green-800"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add Product
                </button>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full table-fixed border-collapse">
                    {/* ===== HEADER ===== */}
                    <thead className="bg-gray-50 border-b">
                        <tr className="text-xs uppercase text-gray-600">
                            <th className="w-[40%] px-6 py-4 text-left">Product</th>
                            <th className="w-[20%] px-6 py-4 text-left">Price</th>
                            <th className="w-[20%] px-6 py-4 text-left">Stock</th>
                            <th className="w-[20%] px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    {/* ===== BODY ===== */}
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-12">
                                    Loading...
                                </td>
                            </tr>
                        ) : data?.content.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-12 text-gray-400">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            data?.content.map((item) => (
                                <tr
                                    key={item.furnitureId}
                                    className="border-b last:border-0 hover:bg-gray-50"
                                >
                                    {/* PRODUCT */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-full object-cover bg-gray-200"
                                            />
                                            <div className="min-w-0">
                                                <p className="font-medium truncate">
                                                    {item.name}
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    {item.categoryName || "Uncategorized"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* PRICE */}
                                    <td className="px-6 py-4">
                                        <p className="font-semibold">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(item.finalPrice)}
                                        </p>
                                        {(item.discountPercentage ?? 0) > 0 && (
                                            <p className="text-xs text-red-500 line-through">
                                                {new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND",
                                                }).format(item.price)}
                                            </p>
                                        )}
                                    </td>

                                    {/* STOCK */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${item.stock > 0
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {item.stock > 0
                                                ? `${item.stock} in stock`
                                                : "Out of stock"}
                                        </span>
                                    </td>

                                    {/* ACTIONS */}
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-4">
                                            <button
                                                onClick={() => handleEdit(item)}
                                                className="text-gray-500 hover:text-green-700"
                                            >
                                                <PencilIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(item.furnitureId, item.name)
                                                }
                                                className="text-gray-500 hover:text-red-600"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            <ProductModal
                isOpen={isOpen}
                onOpenChange={() => setIsOpen(false)}
                productToEdit={selectedProduct}
            />
        </div>
    );
}
