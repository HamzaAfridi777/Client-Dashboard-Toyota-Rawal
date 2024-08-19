import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
const UsersList = () => {
    const { users = [] } = usePage().props;
    const [expandedRows, setExpandedRows] = useState({});

    const toggleExpand = (rowId, field) => {
        setExpandedRows((prevState) => ({
            ...prevState,
            [rowId]: {
                ...prevState[rowId],
                [field]: !prevState[rowId]?.[field],
            },
        }));
    };

    const renderTruncatedContent = (content, rowId, field) => {
        const isExpanded = expandedRows[rowId]?.[field];
        const truncatedContent =
            content.split(" ").slice(0, 2).join(" ") + "...";

        return (
            <div>
                <div
                    className={`overflow-x-auto ${
                        isExpanded ? "max-w-none" : "max-w-xs"
                    }`}
                    style={{ whiteSpace: "nowrap" }}
                >
                    {isExpanded ? content : truncatedContent}
                </div>
                <button
                    onClick={() => toggleExpand(rowId, field)}
                    className="text-blue-500 hover:text-blue-700 text-xs ml-2"
                >
                    {isExpanded ? "Show less" : "Show more"}
                </button>
            </div>
        );
    };
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(route("users.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Users List
                    </h2>
                    <Link
                        href={route("users.create")}
                        className="text-indigo-100 hover:text-indigo-100 mr-2 inline-block px-3 py-1 bg-blue-600 rounded-md"
                    >
                        Add New User
                    </Link>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    "#",
                                    "Name",
                                    "Email",
                                    "Roles",
                                    "Permissions",
                                    "Actions",
                                ].map((header) => (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {(user.roles || [])
                                                .map((role) => role.name)
                                                .join(", ")}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {renderTruncatedContent(
                                                (
                                                    user.roles.flatMap(
                                                        (role) =>
                                                            role.permissions ||
                                                            []
                                                    ) || []
                                                )
                                                    .map(
                                                        (permission) =>
                                                            permission.name
                                                    )
                                                    .join(", ")
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <Link
                                                href={route(
                                                    "users.edit",
                                                    user.id
                                                )}
                                                className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                            >
                                               <PencilIcon className="h-5 w-8 text-indigo-600 hover:text-indigo-900" />
                                            </Link>
                                            <button
                                                 className="text-red-600 hover:text-red-900 inline-block py-1 "
                                                onClick={() =>
                                                    handleDelete(user.id)
                                                }
                                            >
                                            <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-900" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No users found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UsersList;
