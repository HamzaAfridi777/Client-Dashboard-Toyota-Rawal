import React, { useState } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";
import { Inertia } from "@inertiajs/inertia";
const NewArrivals = ({ categories }) => {
    const [activeTab, setActiveTab] = useState("RANGE");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [interiorFields, setInteriorFields] = useState([
        { title: "", details: "", image: null },
    ]);
    const [exteriorFields, setExteriorFields] = useState([
        { title: "", details: "", image: null },
    ]);
    const [performanceFields, setPerformanceFields] = useState([
        { title: "", details: "", image: null },
    ]);
    const [safetyFields, setSafetyFields] = useState([
        { title: "", details: "", image: null },
    ]);

    const { data, setData, post, errors, setErrors } = useForm({
        car_name: "",
        category_id: "",
        car_price: "",
        car_type: "",
        car_type_description: "",
        car_card_image: null,
        car_hero_image: null,
        categories_car_images: [],
    });

    // Function to format the price input with commas for display
    const formatPriceForDisplay = (value) => {
        if (!value) return ""; // Handle empty value gracefully
        return new Intl.NumberFormat().format(value);
    };

    // Function to format the price input for backend submission
    const formatPriceForBackend = (value) => {
        // Remove commas and other non-numeric characters
        return value.replace(/[^\d.-]/g, "");
    };

    const handlePriceChange = (event) => {
        const formattedPrice = formatPriceForBackend(event.target.value);
        setData("car_price", formattedPrice);
    };

    const handleFileChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };
    const handleSingleFileChange = (e, index, tab) => {
        const newFields = [...getFields(tab)];
        newFields[index].image = e.target.files[0];
        setFields(tab, newFields);
    };

    const handleMultipleFileChange = (e) => {
        setData({
            ...data,
            categories_car_images: Array.from(e.target.files),
        });
    };

    const handleFieldChange = (tab, index, field, value) => {
        const newFields = [...getFields(tab)];
        newFields[index][field] = value;
        setFields(tab, newFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("car_name", data.car_name);
        formData.append("category_id", data.category_id);
        formData.append("car_price", data.car_price);
        formData.append("car_type", data.car_type);
        formData.append("car_type_description", data.car_type_description);
        if (data.car_card_image)
            formData.append("car_card_image", data.car_card_image);
        if (data.car_hero_image)
            formData.append("car_hero_image", data.car_hero_image);

        // Add multiple categories_car_images
        data.categories_car_images.forEach((file, index) => {
            formData.append(`categories_car_images[${index}]`, file);
        });
        // Add interior details
        interiorFields.forEach((field, index) => {
            formData.append(`interior_details[${index}][title]`, field.title);
            formData.append(
                `interior_details[${index}][details]`,
                field.details
            );
            if (field.image) {
                formData.append(
                    `interior_details[${index}][image]`,
                    field.image
                );
            }
        });

        // Add exterior details
        exteriorFields.forEach((field, index) => {
            formData.append(`exterior_details[${index}][title]`, field.title);
            formData.append(
                `exterior_details[${index}][details]`,
                field.details
            );
            if (field.image) {
                formData.append(
                    `exterior_details[${index}][image]`,
                    field.image
                );
            }
        });

        // Add performance details
        performanceFields.forEach((field, index) => {
            formData.append(
                `performance_details[${index}][title]`,
                field.title
            );
            formData.append(
                `performance_details[${index}][details]`,
                field.details
            );
            if (field.image) {
                formData.append(
                    `performance_details[${index}][image]`,
                    field.image
                );
            }
        });

        // Add safety details
        safetyFields.forEach((field, index) => {
            formData.append(`safety_details[${index}][title]`, field.title);
            formData.append(`safety_details[${index}][details]`, field.details);
            if (field.image) {
                formData.append(`safety_details[${index}][image]`, field.image);
            }
        });

        // Send the form data
        Inertia.post("/new-arrivals", formData, {
            onError: (errors) => {
                setErrors(errors);
            },
        });
    };

    const handleTabChange = (tab) => {
        const validations = {
            RANGE: () =>
                data.car_name &&
                data.category_id &&
                data.car_price &&
                data.car_type &&
                data.car_type_description,
            INTERIOR: () =>
                interiorFields.every((field) => field.title && field.details),
            EXTERIOR: () =>
                exteriorFields.every((field) => field.title && field.details),
            PERFORMANCE: () =>
                performanceFields.every(
                    (field) => field.title && field.details
                ),
            SAFETY: () =>
                safetyFields.every((field) => field.title && field.details),
        };

        if (activeTab !== tab && !validations[activeTab]()) {
            alert(`Please fill all fields in the ${activeTab} tab.`);
            return;
        }

        setActiveTab(tab);
    };

    const handleDropdownClick = (category) => {
        setData("category_id", category);
        setDropdownOpen(false);
    };
    const addAdditionalField = (tab) => {
        const newField = { title: "", details: "", image: null };
        const fields = getFields(tab);
        setFields(tab, [...fields, newField]);
    };
    const getFields = (tab) => {
        switch (tab) {
            case "INTERIOR":
                return interiorFields;
            case "EXTERIOR":
                return exteriorFields;
            case "PERFORMANCE":
                return performanceFields;
            case "SAFETY":
                return safetyFields;
            default:
                return [];
        }
    };

    const setFields = (tab, fields) => {
        switch (tab) {
            case "INTERIOR":
                setInteriorFields(fields);
                break;
            case "EXTERIOR":
                setExteriorFields(fields);
                break;
            case "PERFORMANCE":
                setPerformanceFields(fields);
                break;
            case "SAFETY":
                setSafetyFields(fields);
                break;
            default:
                break;
        }
    };

    const renderFields = (tab, fields) => {
        return fields.map((field, index) => (
            <div key={index}>
                <div >
                    <label className="block text-sm font-medium text-gray-700">
                        {tab} Title
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={field.title || ""}
                        onChange={(e) =>
                            handleFieldChange(
                                tab,
                                index,
                                "title",
                                e.target.value
                            )
                        }
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        {tab} Details
                    </label>
                    <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={field.details || ""}
                        onChange={(e) =>
                            handleFieldChange(
                                tab,
                                index,
                                "details",
                                e.target.value
                            )
                        }
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Car {tab} Image
                    </label>
                    <input
                        type="file"
                        name={`car_${tab.toLowerCase()}_image`}
                       className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent p-2"
                       // className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={(e) => handleSingleFileChange(e, index, tab)}
                    />
                </div>
            </div>
        ));
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">
                                Add New Arrivals Data
                            </h3>
                        </div>

                        <div className="mb-4">
                            <nav className="flex space-x-8 ">
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
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {activeTab === "RANGE" && (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="mb-4 md:col-span-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Enter Car Name
                                        </label>
                                        <input
                                            type="text"
                                            value={data.car_name || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "car_name",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.car_name && (
                                            <div className="text-red-600">
                                                {errors.car_name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-4 md:col-span-6">
                                        <div >
                                            <label className="block text-gray-700">
                                                Select Category
                                            </label>
                                            <select
                                                name="category_id"
                                                id="categories"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                value={data.category_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "category_id",
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    Choose a category
                                                </option>
                                                {categories.map(
                                                    (category, index) => (
                                                        <option
                                                            key={index}
                                                            value={category.id}
                                                        >
                                                            {category.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                            {errors.category_id && (
                                                <div className="text-red-600">
                                                    {errors.category_id}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-4 md:col-span-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Enter Car Price
                                        </label>
                                        <input
                                            type="text"
                                            id="car_price"
                                            name="car_price"
                                            value={formatPriceForDisplay(
                                                data.car_price
                                            )}
                                            onChange={handlePriceChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="Enter car price"
                                        />
                                        {errors.car_price && (
                                            <div className="text-red-600">
                                                {errors.car_price}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-6">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Car Type
                                        </label>
                                        <input
                                            type="text"
                                            value={data.car_type || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "car_type",
                                                    e.target.value
                                                )
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.car_type && (
                                            <div className="text-red-600">
                                                {errors.car_type}
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="mb-4 md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Car Card Image
                                        </label>
                                        <input
                                            type="file"
                                            name="car_card_image"
                                            onChange={handleFileChange}
                                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                        />
                                        {errors.car_card_image && (
                                            <div className="text-red-600">
                                                {errors.car_card_image}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Car Hero Image
                                        </label>
                                        <input
                                            type="file"
                                            name="car_hero_image"
                                            onChange={handleFileChange}
                                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                        />
                                        {errors.car_hero_image && (
                                            <div className="text-red-600">
                                                {errors.car_hero_image}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Car Colours Image
                                        </label>
                                        <input
                                            type="file"
                                            name=" categories_car_images"
                                            onChange={handleMultipleFileChange}
                                            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none  focus:border-blue-500  focus:border-transparent p-2"
                                            multiple
                                        />
                                        {errors.categories_car_images && (
                                            <div className="text-red-600">
                                                {errors.categories_car_images}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-4 md:col-span-12">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Car Type Description
                                        </label>
                                        <textarea
                                            type="text"
                                            value={
                                                data.car_type_description || ""
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "car_type_description",
                                                    e.target.value
                                                )
                                            }
                                            rows="4"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                        {errors.car_type_description && (
                                            <div className="text-red-600">
                                                {errors.car_type_description}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {activeTab === "INTERIOR" && (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {renderFields("INTERIOR", interiorFields)}
                                    <div className="flex justify-end mt-8">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addAdditionalField("INTERIOR")
                                            }
                                            style={{height:50,width:150}}
                                             className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md"
                                            // className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700
                                            //           bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300
                                            //           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
                                        >
                                            + Add More
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeTab === "EXTERIOR" && (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {renderFields("EXTERIOR", exteriorFields)}
                                    <div className="flex justify-end mt-8">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addAdditionalField("EXTERIOR")
                                            }
                                            style={{height:50,width:150}}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700
                                                      bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300
                                                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
                                        >
                                            + Add More
                                        </button>
                                    </div>
                                </div>
                            )}
                            {activeTab === "PERFORMANCE" && (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {renderFields(
                                        "PERFORMANCE",
                                        performanceFields
                                    )}
                                    <div className="flex justify-end mt-8">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addAdditionalField(
                                                    "PERFORMANCE"
                                                )
                                            }
                                            style={{height:50,width:150}}
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700
                                                      bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300
                                                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
                                        >
                                            + Add More
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === "SAFETY" && (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    {renderFields("SAFETY", safetyFields)}
                                    <div
                                    className="flex justify-end mt-6"
                                    // className="flex justify-end mt-8"
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                addAdditionalField("SAFETY")
                                            }
                                             style={{height:50,width:150}}
                                             
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700
                                                      bg-gray-200 border border-transparent rounded-md shadow-sm hover:bg-gray-300
                                                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 "
                                        >
                                            + Add More
                                        </button>
                                    </div>
                                </div>
                            )}
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
export default NewArrivals;
