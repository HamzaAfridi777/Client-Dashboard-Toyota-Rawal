import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import SecondaryButton from "@/Components/SecondaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/inertia-react";
const Edit = () => {
    const { props } = usePage();
    const { car_care_tips } = props;
    const [form, setForm] = useState({
        heading: car_care_tips.heading || "",
        description: car_care_tips.description || "",
        imagetitle1: car_care_tips.imagetitle1 || "",
        imagedescription1: car_care_tips.imagedescription1 || "",
        imageshare1: car_care_tips.imageshare1 || "",
        imagecomment1: car_care_tips.imagecomment1 || "",
        imagetitle2: car_care_tips.imagetitle2 || "",
        imagedescription2: car_care_tips.imagedescription2 || "",
        imageshare2: car_care_tips.imageshare2 || "",
        imagecomment2: car_care_tips.imagecomment2 || "",
        image1: null, // File inputs are set to null to avoid pre-filling
        image2: null,
        tips: car_care_tips.tips || [{ heading: "", addpoint: "" }], // Pre-fill with existing tips
    });

    useEffect(() => {
        // You can perform any additional setup here if needed
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({ ...form, [name]: files ? files[0] : value });
    };

    const handleTipChange = (e, index) => {
        const { name, value } = e.target;
        const tips = [...form.tips];
        tips[index][name] = value;
        setForm({ ...form, tips });
    };

    const addTip = () => {
        setForm({ ...form, tips: [...form.tips, { heading: "", addpoint: "" }] });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Append all form fields to formData
        for (const key in form) {
            if (key === "tips") {
                form.tips.forEach((tip, index) => {
                    formData.append(`tips[${index}][heading]`, tip.heading);
                    formData.append(`tips[${index}][addpoint]`, tip.addpoint);
                });
            } else {
                formData.append(key, form[key]);
            }
        }

        Inertia.post(route("car_care.update", car_care_tips.id), formData, {
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
                                Edit Car Care Tip
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* General Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Heading
                                    </label>
                                    <input
                                        type="text"
                                        name="heading"
                                        value={form.heading}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
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

                                {/* Image 1 Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 1 Title
                                    </label>
                                    <input
                                        type="text"
                                        name="imagetitle1"
                                        value={form.imagetitle1}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 1 Description
                                    </label>
                                    <textarea
                                        name="imagedescription1"
                                        value={form.imagedescription1}
                                        onChange={handleChange}
                                        rows="2"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 1 Share
                                    </label>
                                    <input
                                        type="text"
                                        name="imageshare1"
                                        value={form.imageshare1}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 1 Comment
                                    </label>
                                    <input
                                        type="text"
                                        name="imagecomment1"
                                        value={form.imagecomment1}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 1 Upload
                                    </label>
                                    <input
                                        type="file"
                                        name="image1"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                                    />
                                </div>

                                {/* Image 2 Information */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 2 Title
                                    </label>
                                    <input
                                        type="text"
                                        name="imagetitle2"
                                        value={form.imagetitle2}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 2 Description
                                    </label>
                                    <textarea
                                        name="imagedescription2"
                                        value={form.imagedescription2}
                                        onChange={handleChange}
                                        rows="2"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 2 Share
                                    </label>
                                    <input
                                        type="text"
                                        name="imageshare2"
                                        value={form.imageshare2}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 2 Comment
                                    </label>
                                    <input
                                        type="text"
                                        name="imagecomment2"
                                        value={form.imagecomment2}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Image 2 Upload
                                    </label>
                                    <input
                                        type="file"
                                        name="image2"
                                        onChange={handleChange}
                                        className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
                                    />
                                </div>
                            </div>

                            {/* Dynamic Tips Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Tips
                                </label>
                                {form.tips.map((tip, index) => (
                                    <div key={index} className="mb-4 grid grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="heading"
                                            value={tip.heading}
                                            onChange={(e) => handleTipChange(e, index)}
                                            placeholder="Tip Heading"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                        />
                                        <input
                                            type="text"
                                            name="addpoint"
                                            value={tip.addpoint}
                                            onChange={(e) => handleTipChange(e, index)}
                                            placeholder="Tip Add Point"
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                        />
                                    </div>
                                ))}
                                <SecondaryButton onClick={addTip} className="mt-2">
                                    Add Another Tip
                                </SecondaryButton>
                            </div>

                            <div className="mt-6">
                                <SecondaryButton type="submit">Update</SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
};

export default Edit;
