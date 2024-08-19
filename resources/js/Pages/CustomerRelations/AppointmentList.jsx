
import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import EmailModal from '@/Components/EmailModal'; // Import the EmailModal component
import { Link, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { EnvelopeIcon, TrashIcon } from '@heroicons/react/24/outline';
const AppointmentList = () => {
    const { appointments = [] } = usePage().props;
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this appointment?')) {
            Inertia.delete(route('appointments.destroy', id), {
                onSuccess: () => {
                    Inertia.reload({ only: ['appointments'] });
                },
            });
        }
    };

    const openModal = (appointment) => {
        setSelectedAppointment(appointment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedAppointment(null);
    };

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Online Appointment List
                    </h2>
                </div>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {['#', 'Name', 'Email', 'Phone', 'Subject', 'Date', 'Reg No', 'Message', 'Actions'].map((header) => (
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
                            {appointments.map((appointment) => (
                                <tr
                                    key={appointment.id}
                                    className="hover:bg-gray-50 transition"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.subject}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.appointment_date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.registration_number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {appointment.message}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <button
                                             className="text-indigo-600 hover:text-indigo-900 mr-2 inline-block"
                                            onClick={() => openModal(appointment)}
                                        >
                                        <EnvelopeIcon className="h-5 w-5 text-indigo-600 hover:text-indigo-900" />
                                        </button>
                                        <button
                                             className="text-red-600 hover:text-red-900 inline-block py-1 "
                                            onClick={() =>
                                                handleDelete(appointment.id)
                                            }
                                        >
                                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-900" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {appointments.length === 0 && (
                        <div className="text-center py-4 text-gray-500">
                            No appointments found.
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && selectedAppointment && (
                <EmailModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    appointment={selectedAppointment}
                    emailRoute={route('appointment.sendEmail')}
                />
            )}
        </AuthenticatedLayout>
    );
};

export default AppointmentList;
