import React from "react";
import { useForm } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import SecondaryButton from "@/Components/SecondaryButton";

const SideCredentials = () => {
    const { data, setData, post, errors } = useForm({
        name: "",
        email: "",
        customer_relation_number: "",
        site_title: "",
        facebook_link: "",
        twitter_link: "",
        instagram_link: "",
        linkedin_link: "",
        whatsapp_number: "",
        address: "",
        site_logo: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("site-credentials.store"));
    };

    const handleFileChange = (e) => {
        setData(e.target.name, e.target.files[0]);
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">Add New Site Data</h3>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.name && <div className="text-red-600">{errors.name}</div>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={data.email}
                                        onChange={(e) => setData("email", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.email && <div className="text-red-600">{errors.email}</div>}
                                </div>

                                <div>
                                    <label htmlFor="customer_relation_number" className="block text-sm font-medium text-gray-700">Customer Relation Number</label>
                                    <input
                                        type="text"
                                        id="customer_relation_number"
                                        value={data.customer_relation_number}
                                        onChange={(e) => setData("customer_relation_number", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.customer_relation_number && <div className="text-red-600">{errors.customer_relation_number}</div>}
                                </div>

                                <div>
                                    <label htmlFor="site_title" className="block text-sm font-medium text-gray-700">Site Title</label>
                                    <input
                                        type="text"
                                        id="site_title"
                                        value={data.site_title}
                                        onChange={(e) => setData("site_title", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.site_title && <div className="text-red-600">{errors.site_title}</div>}
                                </div>

                                <div>
                                    <label htmlFor="facebook_link" className="block text-sm font-medium text-gray-700">Facebook Link</label>
                                    <input
                                        type="text"
                                        id="facebook_link"
                                        value={data.facebook_link}
                                        onChange={(e) => setData("facebook_link", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.facebook_link && <div className="text-red-600">{errors.facebook_link}</div>}
                                </div>

                                <div>
                                    <label htmlFor="twitter_link" className="block text-sm font-medium text-gray-700">Twitter Link</label>
                                    <input
                                        type="text"
                                        id="twitter_link"
                                        value={data.twitter_link}
                                        onChange={(e) => setData("twitter_link", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.twitter_link && <div className="text-red-600">{errors.twitter_link}</div>}
                                </div>

                                <div>
                                    <label htmlFor="instagram_link" className="block text-sm font-medium text-gray-700">Instagram Link</label>
                                    <input
                                        type="text"
                                        id="instagram_link"
                                        value={data.instagram_link}
                                        onChange={(e) => setData("instagram_link", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.instagram_link && <div className="text-red-600">{errors.instagram_link}</div>}
                                </div>

                                <div>
                                    <label htmlFor="linkedin_link" className="block text-sm font-medium text-gray-700">LinkedIn Link</label>
                                    <input
                                        type="text"
                                        id="linkedin_link"
                                        value={data.linkedin_link}
                                        onChange={(e) => setData("linkedin_link", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.linkedin_link && <div className="text-red-600">{errors.linkedin_link}</div>}
                                </div>

                                <div>
                                    <label htmlFor="whatsapp_number" className="block text-sm font-medium text-gray-700">Whatsapp Number</label>
                                    <input
                                        type="text"
                                        id="whatsapp_number"
                                        value={data.whatsapp_number}
                                        onChange={(e) => setData("whatsapp_number", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.whatsapp_number && <div className="text-red-600">{errors.whatsapp_number}</div>}
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData("address", e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                    {errors.address && <div className="text-red-600">{errors.address}</div>}
                                </div>
                                <div>
                                    <label htmlFor="site_logo" className="block text-sm font-medium text-gray-700">Site Logo</label>
                                    <input
                                        type="file"
                                        id="site_logo"
                                        name="site_logo"
                                        onChange={handleFileChange}
                                        className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent p-2"
                                        // className="mt-1 block w-full text-sm text-gray-500 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                                    />
                                    {errors.site_logo && <div className="text-red-600">{errors.site_logo}</div>}
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

export default SideCredentials;
