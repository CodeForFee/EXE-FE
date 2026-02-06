"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { categoryService } from "@/lib/api/services/category";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import { Page, CategoryResponse } from "@/lib/api/types";
import CategoryModal from "@/components/admin/modals/CategoryModal";
import Button from "@/components/ui/Button";

export default function AdminCategoriesPage() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryResponse | null>(null);

    const { data, isLoading } = useQuery<Page<CategoryResponse>>({
        queryKey: ['admin', 'categories', page],
        queryFn: () => categoryService.getAllCategories(page - 1, 10),
        placeholderData: keepPreviousData
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => categoryService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
            toast.success("Category deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete category");
        }
    });

    const handleEdit = (category: CategoryResponse) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete category "${name}"?`)) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-heading text-green-950">Categories</h1>
                    <p className="text-muted mt-2">Manage product categories.</p>
                </div>
                <Button
                    variant="primary"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onClick={handleCreate}
                >
                    Add Category
                </Button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm min-h-[500px]">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-divider">
                                        <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">CATEGORY</th>
                                        <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm text-center">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.content?.length === 0 ? (
                                        <tr>
                                            <td colSpan={2} className="py-8 text-center text-muted">No categories found</td>
                                        </tr>
                                    ) : (
                                        data?.content?.map((item) => (
                                            <tr key={item.categoryId} className="border-b border-divider last:border-0 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-muted">N/A</div>
                                                        )}
                                                        <div>
                                                            <p className="font-semibold text-heading text-sm">{item.name}</p>
                                                            <p className="text-xs text-muted">{item.description || "No description"}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            title="Edit"
                                                            className="text-gray-400 hover:text-green-700 transition-colors"
                                                            onClick={() => handleEdit(item)}
                                                        >
                                                            <PencilIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            title="Delete"
                                                            className="text-red-400 hover:text-red-700 transition-colors"
                                                            onClick={() => handleDelete(item.categoryId, item.name)}
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

                        {data && data.totalPages > 1 && (
                            <div className="flex justify-center mt-6 gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50 hover:bg-gray-200 text-sm transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="px-3 py-1 text-sm font-medium text-gray-700 flex items-center">
                                    Page {page} of {data.totalPages}
                                </span>
                                <button
                                    onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                                    disabled={page === data.totalPages}
                                    className="px-3 py-1 rounded bg-gray-100 text-gray-600 disabled:opacity-50 hover:bg-gray-200 text-sm transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <CategoryModal
                isOpen={isModalOpen}
                onOpenChange={() => setIsModalOpen(false)}
                categoryToEdit={selectedCategory}
            />
        </div>
    );
}
