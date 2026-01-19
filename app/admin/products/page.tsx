"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { furnitureService } from "@/lib/api/services/furniture";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    Button,
    Spinner,
    Pagination
} from "@heroui/react";
import { EyeIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import { Page, FurnitureResponse } from "@/lib/api/types";

export default function AdminProductsPage() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<Page<FurnitureResponse>>({
        queryKey: ['admin', 'furniture', page],
        queryFn: () => furnitureService.getAllFurniture(page - 1, 10),
        placeholderData: keepPreviousData
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => furnitureService.deleteFurniture(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'furniture'] });
            toast.success("Product deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete product");
        }
    });

    const handleDelete = (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) {
            deleteMutation.mutate(id);
        }
    };

    const renderCell = (item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof typeof item];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: item.image }} // Assuming item.image is URL
                        description={item.categoryName || "Uncategorized"}
                        name={item.name}
                    >
                        {item.name}
                    </User>
                );
            case "price":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.finalPrice)}
                        </p>
                        {item.discountPercentage > 0 && <span className="text-xs text-danger strikethrough">-{item.discountPercentage}%</span>}
                    </div>
                );
            case "stock":
                return (
                    <Chip className="capitalize" color={item.stock > 0 ? "success" : "danger"} size="sm" variant="flat">
                        {item.stock > 0 ? `${item.stock} in stock` : "Out of stock"}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Edit">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <PencilIcon className="w-5 h-5" />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete">
                            <span
                                className="text-lg text-danger cursor-pointer active:opacity-50"
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
                    <h1 className="text-3xl font-heading font-bold text-heading text-green-950">Product Management</h1>
                    <p className="text-muted mt-2">Manage your inventory, prices, and product details.</p>
                </div>
                <Button
                    color="success"
                    radius="sm"
                    className="bg-green-900 text-cream font-bold"
                // Add functionality later
                >
                    Add Product
                </Button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Spinner size="lg" color="success" />
                    </div>
                ) : (
                    <>
                        <Table aria-label="Products table">
                            <TableHeader>
                                <TableColumn key="name">PRODUCT</TableColumn>
                                <TableColumn key="price">PRICE</TableColumn>
                                <TableColumn key="stock">STOCK</TableColumn>
                                <TableColumn key="actions">ACTIONS</TableColumn>
                            </TableHeader>
                            <TableBody items={data?.content || []}>
                                {(item: any) => (
                                    <TableRow key={item.id}>
                                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        <div className="flex justify-center mt-4">
                            <Pagination
                                total={data?.totalPages || 1}
                                page={page}
                                onChange={setPage}
                                color="success"
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
