import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";

const Edit = () => {
    const { props } = usePage();
    const { calculators } = props;

    const [form, setForm] = useState({
        service: "",
        description: "",
        history: "",
        calculatorservice: "",
        image: null,
    });

    useEffect(() => {
        // Initialize form with existing carBooking data
        if (calculators) {
            setForm({
                service: calculators.service || "",
                description: calculators.description || "",
                history: calculators.history || "",
                calculatorservice: calculators.calculatorservice || "",
                image: null, // You may want to handle existing images differently
            });
        }
    }, [calculators]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("service", form.service);
        formData.append("description", form.description);
        formData.append("history", form.history);
        formData.append("calculatorservice", form.calculatorservice);

        if (form.image) {
            formData.append("image", form.image);
        }

        Inertia.post(route("calculator.update", calculators.id), formData, {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                // Optionally handle success response
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
                                Edit Calculator Service
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
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <input
                                        type="text"
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500 p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Histroy
                                    </label>
                                    <input
                                        type="text"
                                        name="history"
                                        value={form.history}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Calculator Service
                                    </label>
                                    <input
                                        type="text"
                                        name="calculatorservice"
                                        value={form.calculatorservice}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>
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

export default Edit;
