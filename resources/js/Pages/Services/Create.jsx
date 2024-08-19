import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
const Create = () => {
    const { serviceCategories, errors } = usePage().props;

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        Inertia.post(route("services.store"), data);
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Add New Service
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
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="block text-sm font-medium text-gray-700">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Select Category
                                        </label>
                                        <select
                                            name="service_category_id"
                                            required
                                            id="service_category_id"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                                        >
                                            <option value="">
                                                Choose a category
                                            </option>
                                            {serviceCategories.map(
                                                (category) => (
                                                    <option
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Service Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        required
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                    />
                                    {errors.image && (
                                        <div className="text-red-600">
                                            {errors.image}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        type="text"
                                        name="description"
                                        required
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <SecondaryButton
                                    type="submit"
                                    className="px-6 py-3 bg-blue-600 text-black rounded-md hover:bg-blue-300"
                                >
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
