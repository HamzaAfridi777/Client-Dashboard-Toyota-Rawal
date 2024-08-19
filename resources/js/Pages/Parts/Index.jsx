// resources/js/Pages/Parts/Index.jsx

import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
const Index = () => {
    const { parts } = usePage().props;
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this item?")) {
            Inertia.delete(route("parts.destroy", id));
        }
    };

   // const baseUrl = process?.env.MIX_APP_URL || 'http://stage.khalidandkhalidgroup.com';

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8 ">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Parts List
                    </h2>
                    <Link
                        href={route("parts.create")}
                        className="text-indigo-100 hover:text-indigo-100 mr-2 inline-block px-3 py-1 bg-blue-600 rounded-md "
                    >
                        Add New Parts
                    </Link>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    "#",
                                    "Name",
                                    "car_price",
                                    "part_image",
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
                            {parts.map((part) => (
                                <tr
                                    key={part.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {part.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {part.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {part.car_price}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <img
                                            //src={`${baseUrl}/storage/uploads/parts/${part.part_image}`}
                                            src={`/storage/uploads/parts/${part.part_image}`}
                                            alt={part.name}
                                            className="w-20 h-20 rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <Link
                                            href={route("parts.edit", part.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                        >
                                            <PencilIcon className="h-5 w-8 text-indigo-600 hover:text-indigo-900" />
                                        </Link>
                                        <button
                                            className="text-red-600 hover:text-red-900 inline-block"
                                            onClick={() =>
                                                handleDelete(part.id)
                                            }
                                            method="delete"
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

export default Index;
