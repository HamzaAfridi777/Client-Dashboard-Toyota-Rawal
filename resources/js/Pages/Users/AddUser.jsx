import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import SecondaryButton from '@/Components/SecondaryButton';

const AddUser = ({ roles, permissions }) => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role_id: '',
        permissions: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            const permissions = form.permissions.includes(value)
                ? form.permissions.filter((permission) => permission !== value)
                : [...form.permissions, value];
            setForm({ ...form, permissions });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        Inertia.post(route('users.store'), form, {
            onError: (errors) => {
                console.log(errors);
            }
        });
    };

    return (
        <AuthenticatedLayout>
            <section className="content p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-600">Add User</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={form.password_confirmation}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 p-2.5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 ">Role</label>
                                    <select
                                        name="role_id"
                                        value={form.role_id}
                                        onChange={handleChange}
                                        required
                                        //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5"
                                    >
                                        <option value="" disabled>Select a Role</option>
                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Permissions</label>
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {permissions.map((permission) => (
                                        <div key={permission.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                name="permissions"
                                                value={permission.id}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                            />
                                            <label className="ml-2 block text-sm text-gray-900">{permission.name}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <SecondaryButton
                                    type="submit"
                                    className="text-indigo-600  py-2 px-4 rounded-md inline-block  bg-blue-600  hover:bg-indigo-700"
                                >
                                    Add User
                                </SecondaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
};

export default AddUser;
