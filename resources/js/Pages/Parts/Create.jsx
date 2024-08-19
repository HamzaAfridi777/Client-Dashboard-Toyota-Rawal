import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Create = () => {
    const [form, setForm] = useState({ name: '', car_price: '', part_image: null });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'car_price') {
            // Format price input with commas and two decimal places
            const formattedPrice = parseFloat(value.replace(/[^\d.-]/g, '')).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            setForm({ ...form, [name]: formattedPrice });
        } else {
            setForm({ ...form, [name]: files ? files[0] : value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', form.name);
        // Remove commas from formatted price for backend submission
        formData.append('car_price', form.car_price.replace(/[^\d.-]/g, ''));
        if (form.part_image) {
            formData.append('part_image', form.part_image);
        }

        Inertia.post(route('parts.store'), formData, {
            onError: (errors) => {
                console.log(errors);
            }
        });
    };


    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Create Part
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
                                        value={form.name}
                                        onChange={handleChange}
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
                                        value={form.car_price}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Part Image
                                    </label>
                                    <input
                                        type="file"
                                        name="part_image"
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <SecondaryButton type="submit"  className="px-6 py-3 bg-blue-600 text-black rounded-md hover:bg-blue-300">
                                    Submit
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
};

export default Create;
