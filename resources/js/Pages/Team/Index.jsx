import React,{useState} from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const Index = () => {
    const { expert_teams = [] } = usePage().props; // Ensure toyotasures is an array
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
         // Handle cases where content is undefined
    if (!content) {
        return <div className="text-gray-500">No content available</div>;
    }

        const isExpanded = expandedRows[rowId]?.[field];
        const truncatedContent = content.split(' ').slice(0, 2).join(' ') + '...';
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
        if (confirm("Are you sure you want to delete this Data?")) {
            Inertia.delete(route("team.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                    expert_team List
                    </h2>
                    <Link
                        href={route("team.create")}
                        className="text-indigo-100 hover:text-indigo-100 mr-2 inline-block px-3 py-1 bg-blue-600 rounded-md"
                    >
                        Add Expert Team
                    </Link>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {["#","Role", "Image", "Actions"].map((header) => (
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
                            {expert_teams.map((expert_team) => (
                                <tr
                                    key={expert_team.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {expert_team.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {renderTruncatedContent(expert_team.role, expert_team.id, 'heading1')}                               
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <img
                                            src={`/storage/uploads/Team/${expert_team.image}`}
                                            alt="Image 1"
                                            className="w-20 h-20 rounded-md"
                                        />
                                    </td>
                                   
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <Link
                                        href={route("team.edit", expert_team.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                        >
                                            <PencilIcon className="h-5 w-8 text-indigo-600 hover:text-indigo-900" />
                                        </Link>
                                        <button
                                            className="text-red-600 hover:text-red-900 inline-block"
                                            onClick={() => handleDelete(expert_team.id)}
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
