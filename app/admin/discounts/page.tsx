"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { discountService } from "@/lib/api/services/discount";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Spinner,
    Chip,
    Tooltip,
    useDisclosure
} from "@heroui/react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { DiscountResponse } from "@/lib/api/types";
import { useState } from "react";
import DiscountModal from "@/components/admin/modals/DiscountModal";

export default function AdminDiscountsPage() {
    const queryClient = useQueryClient();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedDiscount, setSelectedDiscount] = useState<DiscountResponse | null>(null);

    const { data, isLoading } = useQuery<DiscountResponse[]>({
        queryKey: ['admin', 'discounts'],
        queryFn: () => discountService.getAllDiscounts(),
        placeholderData: keepPreviousData
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => discountService.deleteDiscount(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'discounts'] });
            toast.success("Discount deleted successfully");
        },
        onError: () => {
            toast.error("Failed to delete discount");
        }
    });

    const handleEdit = (discount: DiscountResponse) => {
        setSelectedDiscount(discount);
        onOpen();
    };

    const handleCreate = () => {
        setSelectedDiscount(null);
        onOpen();
    };

    const handleDelete = (id: string) => {
        if (confirm(`Are you sure you want to delete this discount?`)) {
            deleteMutation.mutate(id);
        }
    };

    const renderCell = (item: any, columnKey: React.Key) => {
        const cellValue = item[columnKey as keyof typeof item];

        switch (columnKey) {
            case "percentage":
                return (
                    <span className="font-bold text-green-700">
                        {(item.percentage * 100).toFixed(0)}%
                    </span>
                );
            case "dates":
                return (
                    <div className="flex flex-col text-xs">
                        <span>Start: {new Date(item.startDate).toLocaleDateString("vi-VN")}</span>
                        <span>End: {new Date(item.endDate).toLocaleDateString("vi-VN")}</span>
                    </div>
                );
            case "isActive":
                return (
                    <Chip color={item.isActive ? "success" : "default"} size="sm" variant="flat">
                        {item.isActive ? "Active" : "Inactive"}
                    </Chip>
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
                                onClick={() => handleDelete(item.id)}
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
                    <h1 className="text-3xl font-heading font-bold text-heading text-green-950">Discounts</h1>
                    <p className="text-muted mt-2">Manage promotional discounts.</p>
                </div>
                <Button
                    color="success"
                    radius="sm"
                    className="bg-green-900 text-cream font-bold shadow-md"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onPress={handleCreate}
                >
                    Add Discount
                </Button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm min-h-[500px]">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Spinner size="lg" color="success" />
                    </div>
                ) : (
                    <Table aria-label="Discounts table" removeWrapper color="success" selectionMode="none">
                        <TableHeader>
                            <TableColumn key="description">DESCRIPTION</TableColumn>
                            <TableColumn key="percentage">VALUE</TableColumn>
                            <TableColumn key="dates">DURATION</TableColumn>
                            <TableColumn key="isActive">STATUS</TableColumn>
                            <TableColumn key="actions" align="center">ACTIONS</TableColumn>
                        </TableHeader>
                        <TableBody items={data || []} emptyContent="No discounts found">
                            {(item: any) => (
                                <TableRow key={item.id} className="border-b border-divider last:border-0 hover:bg-gray-50 transition-colors">
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </div>

            <DiscountModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                discountToEdit={selectedDiscount}
            />
        </div>
    );
}
