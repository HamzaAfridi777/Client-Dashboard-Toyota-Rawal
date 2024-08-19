import React,{useState} from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage,Link } from '@inertiajs/inertia-react';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
const Index = () => {
    const { services } = usePage().props;
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
      const truncatedContent = content.split(' ').slice(0, 3).join(' ') + '...';
        return (
            <div>
                <div
                    className={`overflow-x-auto ${isExpanded ? 'max-w-none' : 'max-w-xs'}`}
                    style={{ whiteSpace: 'nowrap' }}
                >
                     {isExpanded ? content : truncatedContent}
                </div>
                <button
                    onClick={() => toggleExpand(rowId, field)}
                    className="text-blue-500 hover:text-blue-700 text-xs ml-2"
                >
                    {isExpanded ? 'Show less' : 'Show more'}
                </button>
            </div>
        );
    };

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this service?')) {
            Inertia.delete(`/services/${id}`);
           // Inertia.delete(route("services", id));
        }
    };
   

    return (
        <AuthenticatedLayout>
        <div className="container mx-auto px-4 py-8 ">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                    Services List
                </h2>
                <Link
                    href="/services/create"
                   
                    className="text-indigo-100 hover:text-indigo-100 mr-2 inline-block px-3 py-1 bg-blue-600 rounded-md "
                >
                    Add New Service
                </Link>
            </div>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {["#", "Name","Category","Image","Description","Actions"].map((header) => (
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
                        {services.map((service) => (
                            <tr
                                key={service.id}
                                className="hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {service.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {service.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                   {service.service_category.name}
                                 </td>
                                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                 {service.image}
                               </td>
                               <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                               {renderTruncatedContent(service.description, service.id, 'description')}   
                              
                                 </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <Link
                                  
                                        href={`/services/${service.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                    >
                                    <PencilIcon className="h-5 w-8 text-indigo-600 hover:text-indigo-900" />
                                    </Link>
                                    <button
                                         className="text-red-600 hover:text-red-900 inline-block py-1 "
                                        onClick={() =>
                                            handleDelete(service.id)
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
