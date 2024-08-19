import React, { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";

const Edit = () => {
    const { props } = usePage();
    const { expert_teams } = props;

    const [form, setForm] = useState({
        role: "",
        image: null,
    });

    useEffect(() => {
        // Initialize form with existing expert_team data
        if (expert_teams) {
            setForm({
                role: expert_teams.role || "",
                image: null, // Handle existing images as needed
            });
        }
    }, [expert_teams]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("role", form.role);
        if (form.image) {
            formData.append("image", form.image);
        }
        Inertia.post(route("team.update", expert_teams.id), formData, {
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
                                Edit Expert Teams
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Team Role
                                    </label>
                                    <input
                                        type="text"
                                        name="role"
                                        value={form.role}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>  
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Team Image 
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-blue-500 p-2"
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
