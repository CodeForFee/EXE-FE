"use client";

import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { userService } from "@/lib/api/services/user";
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

    const renderCell = (user: any, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof typeof user];

        switch (columnKey) {
            case "name":
                return (
                    <User
                        avatarProps={{ radius: "lg", src: user.image }}
                        description={user.email}
                        name={user.fullName}
                    >
                        {user.email}
                    </User>
                );
            case "role":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">{cellValue}</p>
                    </div>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeIcon className="w-5 h-5" />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content={user.status === 'ACTIVE' ? "Ban user" : "Unban user"}>
                            <span
                                className={`text-lg cursor-pointer active:opacity-50 ${user.status === 'ACTIVE' ? 'text-danger' : 'text-success'}`}
                                onClick={() => handleStatusChange(user.id, user.status)}
                            >
                                {user.status === 'ACTIVE' ? <NoSymbolIcon className="w-5 h-5" /> : <CheckCircleIcon className="w-5 h-5" />}
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
                    <h1 className="text-3xl font-heading font-bold text-heading text-green-950">User Management</h1>
                    <p className="text-muted mt-2">Manage all registered users and their roles.</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-divider shadow-sm">
                {isLoading ? (
                    <div className="flex justify-center p-12">
                        <Spinner size="lg" color="success" />
                    </div>
                ) : (
                    <>
                        <Table aria-label="Users table">
                            <TableHeader>
                                <TableColumn key="name">USER</TableColumn>
                                <TableColumn key="role">ROLE</TableColumn>
                                <TableColumn key="status">STATUS</TableColumn>
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
