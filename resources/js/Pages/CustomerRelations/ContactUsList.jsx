import React,{useState} from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Inertia } from "@inertiajs/inertia";
import EmailModal from "@/Components/EmailModal";
import { EnvelopeIcon, TrashIcon } from '@heroicons/react/24/outline';
const ContactUsList = () => {
    const { contactUsEntries = [] } = usePage().props;
    const [selectedContact, setSelectedContact] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this contact entry?")) {
            Inertia.delete(route("contactUs.destroy", id), {
                onSuccess: () => {
                    Inertia.reload({ only: ["contactUsEntries"] });
                },
            });
        }
    };
    const openModal = (contact) => {
        setSelectedContact(contact);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedContact(null);
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Contact Us List
                    </h2>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    "#",
                                    "Name",
                                    "Email",
                                    "Phone",
                                    "Query Type",
                                    "Message",
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
                            {contactUsEntries.map((contact) => (
                                <tr
                                    key={contact.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {contact.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {contact.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {contact.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {contact.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {contact.query_type}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {contact.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <button
                                            className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                            onClick={() => openModal(contact)}
                                        >
                                        <EnvelopeIcon className="h-5 w-5 text-indigo-600 hover:text-indigo-900" />
                                        </button>
                                        <button
                                              className="text-red-600 hover:text-red-900 inline-block py-1 "
                                            onClick={() =>
                                                handleDelete(contact.id)
                                            }
                                        >
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-900" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {contactUsEntries.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No contact entries found.
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && selectedContact && (
                <EmailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    appointment={selectedContact}
                    emailRoute={route('contactUs.sendEmail')}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default ContactUsList;
