"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { categoryService } from "@/lib/api/services/category";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Button,
    Spinner,
    Pagination,
    Tooltip,
    useDisclosure
} from "@heroui/react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import { Page, CategoryResponse } from "@/lib/api/types";
import CategoryModal from "@/components/admin/modals/CategoryModal";

export default function AdminCategoriesPage() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        onOpen();
    };

    const handleCreate = () => {
        setSelectedCategory(null);
        onOpen();
    };

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete category "${name}"?`)) {
            deleteMutation.mutate(id);
        }
    };

    const renderCell = (item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof typeof item];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: item.image }}
                        name={item.name}
                        description={item.description}
                    />
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit">
                            <span
                                className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-green-700 transition-colors"
                                onClick={() => handleEdit(item)}
                            >
                                <PencilIcon className="w-5 h-5" />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete">
                            <span
                                className="text-lg text-danger cursor-pointer active:opacity-50 hover:text-red-700 transition-colors"
                                onClick={() => handleDelete(item.id, item.name)}
                            >
                                <TrashIcon className="w-5 h-5" />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
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
                    color="success"
                    radius="sm"
                    className="bg-green-900 text-cream font-bold shadow-md"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={handleCreate}
                >
                    Add Category
                </Button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm min-h-[500px]">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Spinner size="lg" color="success" />
                    </div>
                ) : (
                    <>
                        <Table aria-label="Categories table" removeWrapper color="success" selectionMode="none">
                            <TableHeader>
                                <TableColumn key="name">CATEGORY</TableColumn>
                                <TableColumn key="actions" align="center">ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody items={data?.content || []} emptyContent="No categories found">
                                {(item: any) => (
                                    <TableRow key={item.id} className="border-b border-divider last:border-0 hover:bg-gray-50 transition-colors">
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex justify-center mt-6">
                            <Pagination
                                total={data?.totalPages || 1}
                                page={page}
                                onChange={setPage}
                                color="success"
                                variant="flat"
                            />
                        </div>
                    </>
                )}
            </div>

            <CategoryModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                categoryToEdit={selectedCategory}
            />
        </div>
    );
}
