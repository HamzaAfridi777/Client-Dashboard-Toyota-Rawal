import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ part }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('_method', 'PUT');
        Inertia.post(route('parts.update', part.id), formData);
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Edit Part
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Part Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={part.name}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Car Price
                                    </label>
                                    <input
                                        type="text"
                                        name="car_price"
                                        defaultValue={part.car_price}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                       Parts Image
                                    </label>
                                    <input
                                        type="file"
                                        name="part_image"
                                         className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                    />
                                    {part.car_card_image && (
                                        <div className="mt-2">
                                            <img src={`/storage/uploads/parts/${part.car_card_image}`} alt={part.name} className="w-24 h-24 rounded-md" />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <SecondaryButton type="submit"  className="px-6 py-3 bg-blue-600 text-black rounded-md hover:bg-blue-300">
                                    Update
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
};

export default Edit;
