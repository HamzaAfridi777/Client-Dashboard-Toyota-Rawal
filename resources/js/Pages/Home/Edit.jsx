import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";

const Edit = () => {
    const { props } = usePage();
    const { carBooking } = props;

    const [form, setForm] = useState({
        note1: "",
        note2: "",
        note3: "",
        note4: "",
        image1: null,
        image2: null,
    });

    useEffect(() => {
        // Initialize form with existing carBooking data
        if (carBooking) {
            setForm({
                note1: carBooking.note1 || "",
                note2: carBooking.note2 || "",
                note3: carBooking.note3 || "",
                note4: carBooking.note4 || "",
                image1: null, // You may want to handle existing images differently
                image2: null,
            });
        }
    }, [carBooking]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData();
    //     formData.append("note1", form.note1);
    //     formData.append("note2", form.note2);
    //     formData.append("note3", form.note3);
    //     formData.append("note4", form.note4);

    //     if (form.image1) {
    //         formData.append("image1", form.image1);
    //     }

    //     if (form.image2) {
    //         formData.append("image2", form.image2);
    //     }

    //     Inertia.put(route("car-bookings.update", carBooking.id), formData, {
    //         onError: (errors) => {
    //             console.log(errors);
    //         },
    //     });
    // };
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("note1", form.note1);
        formData.append("note2", form.note2);
        formData.append("note3", form.note3);
        formData.append("note4", form.note4);
    
        if (form.image1) {
            formData.append("image1", form.image1);
        }
    
        if (form.image2) {
            formData.append("image2", form.image2);
        }
    
        Inertia.post(route("car-bookings.update", carBooking.id), formData, {
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
                                Edit Car Booking
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
                                        Image 2
                                    </label>
                                    <input
                                        type="file"
                                        name="image2"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500 p-2"
                                    />
                                </div>
                            </div>
                            <div className="mb-4 md:col-span-12">
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
                                    Add Point 4
                                </label>
                                <textarea
                                    name="note4"
                                    value={form.note4}
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
