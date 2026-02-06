"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { userService } from "@/lib/api/services/user";
import { EyeIcon, NoSymbolIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "react-toastify";
import { Page, UserResponse } from "@/lib/api/types";

const statusColorMap: Record<string, "success" | "danger" | "warning"> = {
    ACTIVE: "success",
    BANNED: "danger",
    UNVERIFIED: "warning",
};

export default function AdminUsersPage() {
    const [page, setPage] = useState(1);
    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery<Page<UserResponse>>({
        queryKey: ['admin', 'users', page],
        queryFn: () => userService.getAllUsers(page - 1, 10), // Backend is 0-indexed
        placeholderData: keepPreviousData
    });

    const banMutation = useMutation({
        mutationFn: ({ id, status }: { id: string, status: 'BANNED' | 'ACTIVE' }) =>
            userService.updateUserStatus(id, status),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
            toast.success("User status updated successfully");
        },
        onError: () => {
            toast.error("Failed to update user status");
        }
    });

    const handleStatusChange = (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'ACTIVE' ? 'BANNED' : 'ACTIVE';
        if (confirm(`Are you sure you want to change user status to ${newStatus}?`)) {
            banMutation.mutate({ id, status: newStatus as 'BANNED' | 'ACTIVE' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-heading font-bold text-heading text-green-950">User Management</h1>
                    <p className="text-muted mt-2">Manage all registered users and their roles.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm">
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
                                        <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">USER</th>
                                        <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">ROLE</th>
                                        <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm">STATUS</th>
                                        <th className="py-4 px-4 font-heading font-bold text-green-900 text-sm text-center">ACTIONS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.content?.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-8 text-center text-muted">No users found</td>
                                        </tr>
                                    ) : (
                                        data?.content?.map((item) => (
                                            <tr key={item.id} className="border-b border-divider last:border-0 hover:bg-gray-50 transition-colors">
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.fullName} className="w-10 h-10 rounded-lg object-cover" />
                                                        ) : (
                                                            <div className="w-10 h-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center font-bold text-sm">
                                                                {item.fullName?.charAt(0) || "U"}
                                                            </div>
                                                        )}
                                                        <div>
                                                            <p className="font-semibold text-heading text-sm">{item.fullName}</p>
                                                            <p className="text-xs text-muted">{item.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-sm font-medium capitalize text-gray-700">{item.role}</span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold ${item.status === 'ACTIVE' ? "bg-green-100 text-green-800" :
                                                        item.status === 'BANNED' ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center justify-center gap-3">
                                                        <button
                                                            title="Details"
                                                            className="text-gray-400 hover:text-green-700 transition-colors"
                                                        >
                                                            <EyeIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            title={item.status === 'ACTIVE' ? "Ban user" : "Unban user"}
                                                            className={`transition-colors ${item.status === 'ACTIVE' ? 'text-red-400 hover:text-red-700' : 'text-green-400 hover:text-green-700'}`}
                                                            onClick={() => handleStatusChange(item.id, item.status)}
                                                        >
                                                            {item.status === 'ACTIVE' ? <NoSymbolIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
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
        </div>
    );
}
