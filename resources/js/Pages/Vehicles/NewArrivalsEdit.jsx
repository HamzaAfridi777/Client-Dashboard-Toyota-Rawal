import React, { useState } from "react";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const NewArrivalsEdit = () => {
    const [activeTab, setActiveTab] = useState("RANGE");
    const { props } = usePage();
    const { newArrival, categories, errors } = props;

    const [formData, setFormData, patch] = useState({
        id: newArrival.id,
        car_name: newArrival.car_name || "",
        category_id: newArrival.category_id.toString() || "",
        car_price: newArrival.car_price || "",
        car_type: newArrival.car_type || "",
        car_type_description: newArrival.car_type_description || "",
        car_card_image: null,
        car_hero_image: null,
        categories_car_images: [],
        interior_details: newArrival.interior_details || [],
        exterior_details: newArrival.exterior_details || [],
        performance_details: newArrival.performance_details || [],
        safety_details: newArrival.safety_details || [],
    });

    const handleAddDetail = (tab) => {
        setFormData({
            ...formData,
            [tab]: [...formData[tab], { title: "", details: "", image: null }],
        });
    };
    const handleDetailsChange = (section, index, e) => {
        const { name, value, files } = e.target;
        const updatedDetails = formData[section].map((detail, i) =>
            i === index
                ? { ...detail, [name]: files ? files[0] : value }
                : detail
        );
        setFormData({ ...formData, [section]: updatedDetails });
    };

    const handleRemoveDetail = (tab, index) => {
        const newDetails = formData[tab].filter((_, i) => i !== index);
        setFormData({ ...formData, [tab]: newDetails });
    };

    // const validateForm = () => {
    //     const errors = {};
    //     if (!formData.car_name) errors.car_name = "The car name field is required.";
    //     if (!formData.category_id) errors.category_id = "The category id field is required.";
    //     if (!formData.car_price) errors.car_price = "The car price field is required.";
    //     if (!formData.car_type) errors.car_type = "The car type field is required.";
    //     if (!formData.car_type_description) errors.car_type_description = "The car type description field is required.";

    //     const detailsValidation = (details, tabName) => {
    //         details.forEach((detail, index) => {
    //             if (!detail.title) errors[`${tabName}_title_${index}`] = "Title is required.";
    //             if (!detail.details) errors[`${tabName}_details_${index}`] = "Details are required.";
    //         });
    //     };

    //     detailsValidation(formData.interior_details, "interior");
    //     detailsValidation(formData.exterior_details, "exterior");
    //     detailsValidation(formData.performance_details, "performance");
    //     detailsValidation(formData.safety_details, "safety");

    //     return errors;
    // };

  //  const clientErrors = validateForm();
    //         if (Object.keys(clientErrors).length > 0) {
    //             console.error("Client-side validation errors:", clientErrors);
    //             alert("Please fill all required fields.");
    //             return;
    //         }
    const handleSubmit = (e) => {
        e.preventDefault();

        const submissionData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((item, index) => {
                    if (key === "categories_car_images") {
                        // Only append the image files for categories_car_images
                        if (item instanceof File) {
                            submissionData.append(
                                `${key}[${index}]`,
                                item,
                                item.name
                            );
                        }
                    } else {
                        // Generic handling for other array fields like interior_details, exterior_details, etc.
                        if (item.image instanceof File) {
                            submissionData.append(
                                `${key}[${index}][image]`,
                                item.image,
                                item.image.name
                            );
                        }
                        submissionData.append(
                            `${key}[${index}][title]`,
                            item.title || ""
                        );
                        submissionData.append(
                            `${key}[${index}][details]`,
                            item.details || ""
                        );
                    }
                });
            } else if (formData[key] instanceof File) {
                submissionData.append(key, formData[key], formData[key].name);
            } else if (formData[key] !== null && formData[key] !== undefined) {
                submissionData.append(key, formData[key].toString());
            }
        });

        Inertia.post(route("new-arrival"), submissionData, {
            onSuccess: () => console.log("Update successful"),
            onError: (errors) => {
                console.error("Update errors:", errors);
                return false;
            },
        });
    };

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            console.log(e);
            if (name === "categories_car_images") {
                setFormData((prevData) => ({
                    ...prevData,
                    //[name]: files,
                    [name]: Array.from(files), // Ensure files are stored as an array
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: files[0],
                }));
            }
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleTabChange = (tab) => {
        const validations = {
            RANGE: () =>
                formData.car_name &&
                formData.category_id &&
                formData.car_price &&
                formData.car_type &&
                formData.car_type_description,
            INTERIOR: () =>
                formData.interior_details.every(
                    (detail) => detail.title && detail.details
                ),
            EXTERIOR: () =>
                formData.exterior_details.every(
                    (detail) => detail.title && detail.details
                ),
            PERFORMANCE: () =>
                formData.performance_details.every(
                    (detail) => detail.title && detail.details
                ),
            SAFETY: () =>
                formData.safety_details.every(
                    (detail) => detail.title && detail.details
                ),
        };

        if (activeTab !== tab && !validations[activeTab]()) {
            alert(`Please fill all fields in the ${activeTab} tab.`);
            return;
        }

        setActiveTab(tab);
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Edit New Arrivals
                            </h3>
                        </div>
                        <div className="mb-4">
                            <nav className="flex space-x-8">
                                {[
                                    "RANGE",
                                    "INTERIOR",
                                    "EXTERIOR",
                                    "PERFORMANCE",
                                    "SAFETY",
                                ].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => handleTabChange(tab)}
                                        className={`px-8 py-4 font-medium text-sm rounded-md ${
                                            activeTab === tab
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-700"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <form
                            method="post"
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {activeTab === "RANGE" && (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
                                    <div className="mb-4 md:col-span-6">
                                        <label
                                            htmlFor="car_name"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Car Name
                                        </label>
                                        <input
                                            type="text"
                                            name="car_name"
                                            id="car_name"
                                            value={formData.car_name}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                        />
                                        {errors.car_name && (
                                            <div className="text-red-600">
                                                {errors.car_name}
                                            </div>
                                        )}
                                    </div>
                                    <input
                                        type="hidden"
                                        name="id"
                                        id="id"
                                        value={formData.car_name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    />
                                    <div className="md:col-span-6 mb-4">
                                        <label
                                            htmlFor="category_id"
                                            className="block text-gray-700"
                                        >
                                            Category
                                        </label>
                                        <select
                                            name="category_id"
                                            id="category_id"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        >
                                            {categories.map((category) => (
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
                                    <div className="mb-4 md:col-span-6">
                                        <label
                                            htmlFor="car_price"
                                            className="block text-gray-700"
                                        >
                                            Car Price
                                        </label>
                                        <input
                                            type="text"
                                            name="car_price"
                                            id="car_price"
                                            value={formData.car_price}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                        {errors.car_price && (
                                            <div className="text-red-600">
                                                {errors.car_price}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-6">
                                        <label
                                            htmlFor="car_type"
                                            className="block text-gray-700"
                                        >
                                            Car Type
                                        </label>
                                        <input
                                            type="text"
                                            name="car_type"
                                            id="car_type"
                                            value={formData.car_type}
                                            onChange={handleChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                        {errors.car_type && (
                                            <div className="text-red-600">
                                                {errors.car_type}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-4">
                                        <label
                                            htmlFor="car_card_image"
                                            className="block text-gray-700"
                                        >
                                            Card Image
                                        </label>
                                        <input
                                            type="file"
                                            name="car_card_image"
                                            id="car_card_image"
                                            onChange={handleChange}
                                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                        />
                                        {errors.car_card_image && (
                                            <div className="text-red-600">
                                                {errors.car_card_image}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-4">
                                        <label
                                            htmlFor="car_hero_image"
                                            className="block text-gray-700"
                                        >
                                            Hero Image
                                        </label>
                                        <input
                                            type="file"
                                            name="car_hero_image"
                                            id="car_hero_image"
                                            onChange={handleChange}
                                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent p-2.5"
                                        />
                                        {errors.car_hero_image && (
                                            <div className="text-red-600">
                                                {errors.car_hero_image}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-4">
                                        <label
                                            htmlFor="categories_car_images"
                                            className="block text-gray-700"
                                        >
                                            Car Images
                                        </label>
                                        <input
                                            type="file"
                                            name="categories_car_images"
                                            id="categories_car_images"
                                            onChange={handleChange}
                                            multiple
                                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent p-2.5"
                                        />
                                        {errors.categories_car_images && (
                                            <div className="text-red-600">
                                                {errors.categories_car_images}
                                            </div>
                                        )}
                                    </div>
                                  
                                    <div className="mb-4 md:col-span-12">
                                        <label
                                            htmlFor="car_type_description"
                                            className="block text-gray-700"
                                        >
                                            Car Type Description
                                        </label>
                                        <textarea
                                            name="car_type_description"
                                            id="car_type_description"
                                            value={
                                                formData.car_type_description
                                            }
                                            onChange={handleChange}
                                            rows="4"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        />
                                        {errors.car_type_description && (
                                            <div className="text-red-600">
                                                {errors.car_type_description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {[
                                "INTERIOR",
                                "EXTERIOR",
                                "PERFORMANCE",
                                "SAFETY",
                            ].map(
                                (tab) =>
                                    activeTab === tab && (
                                        <div key={tab} className="space-y-4">
                                            {formData[
                                                `${tab.toLowerCase()}_details`
                                            ].map((detail, index) => (
                                                <div
                                                    key={index}
                                                    className="grid grid-cols-1 md:grid-cols-2 gap-1"
                                                >
                                                    <div >
                                                        <label
                                                            htmlFor={`${tab.toLowerCase()}_title_${index}`}
                                                            className="block text-gray-700"
                                                        >
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="title"
                                                            id={`${tab.toLowerCase()}_title_${index}`}
                                                            value={detail.title}
                                                            onChange={(e) =>
                                                                handleDetailsChange(
                                                                    `${tab.toLowerCase()}_details`,
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        />
                                                        {errors[
                                                            `${tab.toLowerCase()}_title_${index}`
                                                        ] && (
                                                            <div className="text-red-600">
                                                                {
                                                                    errors[
                                                                        `${tab.toLowerCase()}_title_${index}`
                                                                    ]
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="md:col-span-6">
                                                        <label
                                                            htmlFor={`${tab.toLowerCase()}_image_${index}`}
                                                            className="block text-gray-700"
                                                        >
                                                            Image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            name="image"
                                                            id={`${tab.toLowerCase()}_image_${index}`}
                                                            onChange={(e) =>
                                                                handleDetailsChange(
                                                                    `${tab.toLowerCase()}_details`,
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        />
                                                        {errors[
                                                            `${tab.toLowerCase()}_image_${index}`
                                                        ] && (
                                                            <div className="text-red-600">
                                                                {
                                                                    errors[
                                                                        `${tab.toLowerCase()}_image_${index}`
                                                                    ]
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="mb-4 md:col-span-10">
                                                        <label
                                                            htmlFor={`${tab.toLowerCase()}_details_${index}`}
                                                            className="block text-gray-700"
                                                        >
                                                            Details
                                                        </label>
                                                        <textarea
                                                            name="details"
                                                            id={`${tab.toLowerCase()}_details_${index}`}
                                                            value={
                                                                detail.details
                                                            }
                                                            onChange={(e) =>
                                                                handleDetailsChange(
                                                                    `${tab.toLowerCase()}_details`,
                                                                    index,
                                                                    e
                                                                )
                                                            }
                                                            rows="4"
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                        />
                                                        {errors[
                                                            `${tab.toLowerCase()}_details_${index}`
                                                        ] && (
                                                            <div className="text-red-600">
                                                                {
                                                                    errors[
                                                                        `${tab.toLowerCase()}_details_${index}`
                                                                    ]
                                                                }
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="col-span-2 flex justify-end">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRemoveDetail(
                                                                    `${tab.toLowerCase()}_details`,
                                                                    index
                                                                )
                                                            }
                                                            className="px-4 py-2 bg-red-600 text-white rounded-md"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleAddDetail(
                                                            `${tab.toLowerCase()}_details`
                                                        )
                                                    }
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                                >
                                                    Add {tab} Detail
                                                </button>
                                            </div>
                                        </div>
                                    )
                            )}

                            <div className="flex justify-end mt-6">
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-green-600 text-white rounded-md"
                                >
                                    Update New Arrival
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
};

export default NewArrivalsEdit;
