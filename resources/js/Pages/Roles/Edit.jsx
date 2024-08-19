import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Edit = ({ role }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        formData.append('_method', 'PUT');
        Inertia.post(route('roles.update',role.id), formData);
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Edit Role
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Role Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={role.name}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            
                            </div>
                            <div className="flex justify-end">
                                <SecondaryButton type="submit"    className="text-indigo-600  py-2 px-4 rounded-md inline-block  bg-blue-600  hover:bg-indigo-700">
                                    Update Role
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
