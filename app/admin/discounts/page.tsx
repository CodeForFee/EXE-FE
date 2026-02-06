"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { discountService } from "@/lib/api/services/discount";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { DiscountResponse } from "@/lib/api/types";
import { useState } from "react";
import DiscountModal from "@/components/admin/modals/DiscountModal";
import Button from "@/components/ui/Button";

export default function AdminDiscountsPage() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setSelectedDiscount(null);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm(`Are you sure you want to delete this discount?`)) {
            deleteMutation.mutate(id);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedDiscount(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-heading text-green-950">Discounts</h1>
                    <p className="text-muted mt-2">Manage promotional discounts.</p>
                </div>
                <Button
                    variant="primary"
                    startContent={<PlusIcon className="w-5 h-5" />}
                    onClick={handleCreate}
                >
                    Add Discount
                </Button>
            </div>

            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm min-h-[500px]">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <div className="w-10 h-10 border-4 border-green-200 border-t-green-700 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-divider">
                                    <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">DESCRIPTION</th>
                                    <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">VALUE</th>
                                    <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">DURATION</th>
                                    <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">STATUS</th>
                                    <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm text-center">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-8 text-center text-muted">No discounts found</td>
                                    </tr>
                                ) : (
                                    data?.map((item) => (
                                        <tr key={item.discountId} className="border-b border-divider last:border-0 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-4 font-semibold text-heading text-sm max-w-xs truncate" title={item.name || ''}>
                                                {item.name}
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="font-bold text-green-700">
                                                    {item.value.toFixed(0)}%
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex flex-col text-xs text-muted">
                                                    <span>Start: {new Date(item.startDate).toLocaleDateString("vi-VN")}</span>
                                                    <span>End: {new Date(item.endDate).toLocaleDateString("vi-VN")}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${item.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                                                    {item.isActive ? "Active" : "Inactive"}
                                                </span>
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
                                                        onClick={() => handleDelete(item.discountId)}
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
                )}
            </div>

            <DiscountModal
                isOpen={isModalOpen}
                onOpenChange={handleModalClose}
                discountToEdit={selectedDiscount}
                onSuccess={() => {
                    queryClient.invalidateQueries({ queryKey: ['admin', 'discounts'] });
                    handleModalClose();
                }}
            />
        </div>
    );
}
