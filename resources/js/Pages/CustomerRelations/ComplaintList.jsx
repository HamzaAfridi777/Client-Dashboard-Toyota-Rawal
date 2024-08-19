import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
const ComplaintList = () => {
    const { complaints = [] } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this complaint")) {
            Inertia.delete(route("complaints.destroy", id), {
                onSuccess: () => {
                    Inertia.reload({ only: ['complaints'] });
                },
            });
        }
    };
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Complaint List
                    </h2>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {["#", "Name", "Email", "Phone", "Department", "Message", "Actions"].map((header) => (
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
                            {complaints.map((complaint) => (
                                <tr
                                    key={complaint.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {complaint.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {complaint.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {complaint.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {complaint.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {complaint.department}
                                    </td>
                                   
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {complaint.message}
                                   </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <button
                                              className="text-red-600 hover:text-red-900 inline-block py-1 "
                                            onClick={() =>
                                                handleDelete(complaint.id)
                                            }
                                        >
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-900" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {complaints.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No complaints found.
                        </div>
                    )}
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
};

export default ComplaintList;
