import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";

const Edit = () => {
    const { props } = usePage();
    const { clientreviews } = props;

    const [form, setForm] = useState({
        // heading:"",
        // description:"",
        name:"",
        service:"",
        servicedescription:"",
        image1: null,
      
    });

    useEffect(() => {
        // Initialize form with existing carBooking data
        if (clientreviews) {
            setForm({
                // heading:clientreviews.heading || "",
                // description:clientreviews.description || "",
                name:clientreviews.name || "",
                service:clientreviews.service || "",
                servicedescription:clientreviews.servicedescription || "",
                image1: null, // You may want to handle existing images differently
                image2: null,
            });
        }
    }, [clientreviews]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        // formData.append("heading", form.heading);
        // formData.append("description", form.description);
        formData.append("name", form.name);
        formData.append("service", form.service);
        formData.append("servicedescription", form.servicedescription);
    
        if (form.image1) {
            formData.append("image1", form.image1);
        }
    
        Inertia.post(route("client_review.update", clientreviews.id), formData, {
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
                                      Client Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div> 
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                       Service
                                    </label>
                                    <input
                                        type="text"
                                        name="service"
                                        value={form.service}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>  
                               { /*<div>
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
                                </div>  */}
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
                            </div>
                           {/* <div>
                            <label className="block text-sm font-medium text-gray-700">
                            Head Description
                            </label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows="4"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>*/}     
                        <div>
                        <label className="block text-sm font-medium text-gray-700">
                        Service Description
                        </label>
                        <textarea
                            name="servicedescription"
                            value={form.servicedescription}
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
