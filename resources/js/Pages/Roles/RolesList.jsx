// resources/js/Pages/Roles/Index.jsx

import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Inertia } from '@inertiajs/inertia';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
const RolesList = () => {
    const { roles } = usePage().props;
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this item?')) {
            Inertia.delete(route('roles.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Roles List</h2>
                    <Link
                        href={route('roles.create')}
                        className="text-indigo-100 hover:text-indigo-100 mr-2 inline-block px-3 py-1 bg-blue-600 rounded-md"
                    >
                        Add New Role
                    </Link>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['#', 'Name', 'Actions'].map((header) => (
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
                            {roles.map((role) => (
                                <tr key={role.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{role.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <Link
                                            href={route('roles.edit', role.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                        >
                                        <PencilIcon className="h-5 w-8 text-indigo-600 hover:text-indigo-900" />
                                        </Link>
                                        <button
                                             className="text-red-600 hover:text-red-900 inline-block py-1 "
                                            onClick={() => handleDelete(role.id)}
                                        >
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-900" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default RolesList;
