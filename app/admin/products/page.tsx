"use client";

import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    keepPreviousData,
} from "@tanstack/react-query";
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
    Pagination,
    useDisclosure,
} from "@heroui/react";
import {
    TrashIcon,
    PencilIcon,
    PlusIcon,
} from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { Page, FurnitureResponse } from "@/lib/api/types";
import ProductModal from "@/components/admin/modals/ProductModal";

export default function AdminProductsPage() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedProduct, setSelectedProduct] =
        useState<FurnitureResponse | null>(null);

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
        onError: () => {
            toast.error("Failed to delete product");
        },
    });

    /* ================= HANDLERS ================= */
    const handleEdit = (product: FurnitureResponse) => {
        setSelectedProduct(product);
        onOpen();
    };

    const handleCreate = () => {
        setSelectedProduct(null);
        onOpen();
    };

    const handleDelete = (id: string, name: string) => {
        if (
            confirm(`Are you sure you want to delete "${name}"? This action is permanent.`)
        ) {
            deleteMutation.mutate(id);
        }
    };

    /* ================= CELL RENDER ================= */
    const renderCell = (item: FurnitureResponse, columnKey: React.Key) => {
        switch (columnKey) {
            case "name":
                return (
                    <div className="w-full min-w-0">
                        <User
                            avatarProps={{
                                radius: "lg",
                                src: item.image,
                            }}
                            name={item.name}
                            description={item.categoryName || "Uncategorized"}
                            classNames={{
                                name: "truncate",
                                description: "truncate",
                            }}
                        />
                    </div>
                );

            case "price":
                return (
                    <div className="flex flex-col w-full">
                        <span className="text-sm font-semibold text-gray-900">
                            {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(item.finalPrice)}
                        </span>

                        {item.discountPercentage > 0 && (
                            <span className="text-xs text-danger line-through">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(item.price)}
                            </span>
                        )}
                    </div>
                );

            case "stock":
                return (
                    <div className="flex w-full">
                        <Chip
                            size="sm"
                            variant="flat"
                            color={item.stock > 0 ? "success" : "danger"}
                        >
                            {item.stock > 0
                                ? `${item.stock} in stock`
                                : "Out of stock"}
                        </Chip>
                    </div>
                );

            case "actions":
                return (
                    <div className="flex justify-center items-center gap-3 w-full">
                        <Tooltip content="Edit">
                            <button
                                type="button"
                                onClick={() => handleEdit(item)}
                                className="text-default-400 hover:text-green-700 transition-colors"
                            >
                                <PencilIcon className="w-5 h-5" />
                            </button>
                        </Tooltip>

                        <Tooltip color="danger" content="Delete">
                            <button
                                type="button"
                                onClick={() =>
                                    handleDelete(item.furnitureId, item.name)
                                }
                                className="text-danger hover:text-red-700 transition-colors"
                            >
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </Tooltip>
                    </div>
                );

            default:
                return null;
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
                    <p className="text-muted mt-2">
                        Manage your inventory, prices, and product details.
                    </p>
                </div>

                <Button
                    color="success"
                    radius="sm"
                    className="bg-green-900 text-cream font-bold shadow-md"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={handleCreate}
                >
                    Add Product
                </Button>
            </div>

            {/* TABLE */}
            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm min-h-[500px]">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Spinner size="lg" color="success" />
                    </div>
                ) : (
                    <>
                        <Table
                            aria-label="Products table"
                            removeWrapper
                            selectionMode="none"
                            classNames={{
                                table: "table-fixed w-full",
                                th: "text-xs uppercase",
                                td: "py-4 align-middle",
                            }}
                        >
                            <TableHeader>
                                <TableColumn key="name">PRODUCT</TableColumn>
                                <TableColumn key="price">PRICE</TableColumn>
                                <TableColumn key="stock">STOCK</TableColumn>
                                <TableColumn key="actions" align="center">
                                    ACTIONS
                                </TableColumn>
                            </TableHeader>

                            <TableBody
                                items={data?.content ?? []}
                                emptyContent="No products found"
                            >
                                {(item) => (
                                    <TableRow
                                        key={item.furnitureId}
                                        className="border-b border-divider last:border-0 hover:bg-gray-50"
                                    >
                                        {(columnKey) => (
                                            <TableCell>
                                                {renderCell(item, columnKey)}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* PAGINATION */}
                        <div className="flex justify-center mt-6">
                            <Pagination
                                page={page}
                                total={data?.totalPages || 1}
                                onChange={setPage}
                                color="success"
                                variant="flat"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* MODAL */}
            <ProductModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                productToEdit={selectedProduct}
            />
        </div>
    );
}
