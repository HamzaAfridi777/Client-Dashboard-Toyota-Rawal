import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";

const Edit = () => {
    const { props } = usePage();
    const { chooses } = props;

    const [form, setForm] = useState({
        heading:"",
        description:"",
        years:"",
        technicians:"",
        customer:"",
        employee:"",
    });

    useEffect(() => {
        // Initialize form with existing carBooking data
        if (chooses) {
            setForm({
                heading:chooses.heading || "",
                description:chooses.description || "",
                years:chooses.years || "",
                technicians:chooses.technicians || "",
                customer:chooses.customer || "",
                employee:chooses.employee || "",
            });
        }
    }, [chooses]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("heading", form.heading);
        formData.append("description", form.description);
        formData.append("years", form.years);
        formData.append("technicians", form.technicians);
        formData.append("customer", form.customer);
        formData.append("employee", form.employee);

        Inertia.post(route("choose.update", chooses.id), formData, {
            onError: (errors) => {
                console.log(errors);
            },
            onSuccess: () => {
                // Optionally handle success response
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
                                Edit ValueTime
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2"> 
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                       Heading
                                    </label>
                                    <input
                                        type="text"
                                        name="heading"
                                        value={form.heading}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>  
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                    Years of Presence
                                    </label>
                                    <input
                                        type="text"
                                        name="years"
                                        value={form.years}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div> 
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                    Certified Technicians
                                    </label>
                                    <input
                                        type="text"
                                        name="technicians"
                                        value={form.technicians}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div> 
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                    Customer Satisfation
                                    </label>
                                    <input
                                        type="text"
                                        name="customer"
                                        value={form.customer}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div> 
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                    Employee Satisfaction
                                    </label>
                                    <input
                                        type="text"
                                        name="employee"
                                        value={form.employee}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div> 
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

export default Edit;
