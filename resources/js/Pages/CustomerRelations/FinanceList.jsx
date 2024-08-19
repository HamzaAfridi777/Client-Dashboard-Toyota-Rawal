import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { EnvelopeIcon, TrashIcon } from '@heroicons/react/24/outline';
const FinanceList = () => {
    const { autoFinances = [] } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this autoFinance")) {
            Inertia.delete(route("autoFinances.destroy", id), {
                onSuccess: () => {
                    Inertia.reload({ only: ['autoFinances'] });
                },
            });
        }
    };
    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                   Finance List
                    </h2>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {["#","car", "Name", "Email", "Phone","Landline", "Income", "Bank","Comment", "Actions"].map((header) => (
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
                            {autoFinances.map((autoFinance) => (
                                <tr
                                    key={autoFinance.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {autoFinance.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                       {autoFinance.car}
                                </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {autoFinance.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {autoFinance.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {autoFinance.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {autoFinance.landline}
                                    </td>
                                   
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {autoFinance.income}
                                   </td>
                                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                   {autoFinance.bank}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {autoFinance.comment}
                                 </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <button
                                             className="text-red-600 hover:text-red-900 inline-block py-1 "
                                            onClick={() =>
                                                handleDelete(autoFinance.id)
                                            }
                                        >
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-900" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {autoFinances.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No autoFinances found.
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default FinanceList;
