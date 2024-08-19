import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
const Edit = () => {
    const { serviceCategory } = usePage().props;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        data.append('_method', 'PUT');
        Inertia.post(`/service-categories/${serviceCategory.id}`, data, { method: 'put' });
    };

    return (
        <AuthenticatedLayout>
        <section className="content p-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-blue-600">
                            Edit Service Category
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                           Service Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            defaultValue={serviceCategory.name}
                             required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />    
                    </div>
                    </div>
                    <div className="flex justify-end">
                    <SecondaryButton type="submit" className="px-6 py-3 bg-blue-600 text-black rounded-md hover:bg-blue-300">
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
