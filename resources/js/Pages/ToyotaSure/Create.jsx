import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Create = () => {
    const [form, setForm] = useState({
        description:"",
        heading1:"",
        note1: "",
        heading2:"",
        note2: "",
        heading3:"",
        note3: "",
        image1: null,
        
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("description", form.description);
        formData.append("heading1", form.heading1);
        formData.append("note1", form.note1);
        formData.append("heading2", form.heading2);
        formData.append("note2", form.note2);
        formData.append("heading3", form.heading3);
        formData.append("note3", form.note3);

        if (form.image1) {
            formData.append("image1", form.image1);
        }

        Inertia.post(route("toyota_sure.store"), formData, {
            onError: (errors) => {
                console.log(errors);
            },
        });
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Create ToyotaSure
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 1
                                    </label>
                                    <input
                                        type="file"
                                        name="image1"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500 p-2"
                                    />
                                </div>    
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                       Heading1
                                    </label>
                                    <input
                                        type="text"
                                        name="heading1"
                                        value={form.heading1}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>                           
                            </div>
                            <div 
                            className="mb-4 md:col-span-12">
                                <label className="block text-sm font-medium text-gray-700">
                                    Add Point 1
                                </label>
                                <textarea
                                    name="note1"
                                    value={form.note1}
                                    onChange={handleChange}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                       Heading2
                                    </label>
                                    <input
                                        type="text"
                                        name="heading2"
                                        value={form.heading2}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>  
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Add Point 2
                                </label>
                                <textarea
                                    name="note2"
                                    value={form.note2}
                                    onChange={handleChange}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                       Heading3
                                    </label>
                                    <input
                                        type="text"
                                        name="heading3"
                                        value={form.heading3}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>  
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                Add Point 3
                                </label>
                                <textarea
                                    name="note3"
                                    value={form.note3}
                                    onChange={handleChange}
                                    rows="4"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                            <div className="flex justify-end">
                                <SecondaryButton
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-600 border-black"
                                >
                                    Save
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