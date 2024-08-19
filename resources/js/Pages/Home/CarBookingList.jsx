import React,{useState} from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const CarBookingList = () => {
    const { bookings = [] } = usePage().props; // Ensure bookings is an array
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
        if (confirm("Are you sure you want to delete this booking?")) {
            Inertia.delete(route("car-bookings.destroy", id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Car Booking List
                    </h2>
                    <Link
                        href={route("car-bookings.create")}
                        className="text-indigo-100 hover:text-indigo-100 mr-2 inline-block px-3 py-1 bg-blue-600 rounded-md"
                    >
                        Add New Booking
                    </Link>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {["#", "Note 1", "Note 2", "Note 3","Note 4",  "Image 1", "Image 2", "Actions"].map((header) => (
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
                            {bookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {booking.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {renderTruncatedContent(booking.note1, booking.id, 'note1')}                               
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {renderTruncatedContent(booking.note2, booking.id, 'note2')}                                
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {renderTruncatedContent(booking.note3, booking.id, 'note3')}                                    
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {renderTruncatedContent(booking.note4, booking.id, 'note4')}                                    
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <img
                                            src={`/storage/uploads/car_booking/${booking.image1}`}
                                            alt="Image 1"
                                            className="w-20 h-20 rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <img
                                            src={`/storage/uploads/car_booking/${booking.image2}`}
                                            alt="Image 2"
                                            className="w-20 h-20 rounded-md"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <Link
                                        href={route("car-bookings.edit", booking.id)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                        >
                                            <PencilIcon className="h-5 w-8 text-indigo-600 hover:text-indigo-900" />
                                        </Link>
                                        <button
                                            className="text-red-600 hover:text-red-900 inline-block"
                                            onClick={() => handleDelete(booking.id)}
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

export default CarBookingList;
