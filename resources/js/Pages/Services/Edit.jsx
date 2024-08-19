import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { usePage } from "@inertiajs/inertia-react";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
const Edit = () => {
    const { service, serviceCategories, errors } = usePage().props; // Make sure to include errors in usePage().props

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("name", event.target.name.value);
        formData.append("description", event.target.description.value);
        formData.append(
            "service_category_id",
            event.target.service_category_id.value
        );

        // Check if file is present and add it to formData
        if (event.target.image.files.length > 0) {
            formData.append("image", event.target.image.files[0]);
        }

        Inertia.post(route("services.update", service.id), formData);
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Edit Service
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
                                        defaultValue={service.name}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Select Category
                                    </label>
                                    <select
                                        name="service_category_id"
                                        defaultValue={
                                            service.service_category_id
                                        }
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        <option value="">
                                            Choose a category
                                        </option>
                                        {serviceCategories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category_id && (
                                        <div className="text-red-600">
                                            {errors.category_id}
                                        </div>
                                    )}
                                </div>
                                <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    defaultValue={service.description}
                                    required
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            </div>

                            <div className="flex justify-end">
                                <SecondaryButton type="submit"
                                className="px-6 py-3 bg-blue-600 text-black rounded-md hover:bg-blue-300">
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
