import React, { useEffect, useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import AdminLayout from '../AdminLayout';

export default function Index() {
    const { users, filters = {} } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');
    const [role, setRole] = useState(filters.role || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get('/admin/users', { search, role }, { preserveState: true, replace: true });
        }, 400);
        return () => clearTimeout(timeout);
    }, [search, role]);

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">👥 User Management</h1>

                <div className="flex justify-between items-center mb-4">
                    <Link
                        href="/admin/users/create"
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                    >
                        + Create User
                    </Link>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-4 py-2 rounded w-full max-w-md shadow-sm focus:ring"
                    />

                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border px-4 py-2 rounded shadow-sm"
                    >
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="alumni">Alumni</option>
                    </select>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto rounded shadow-sm">
                    <table className="w-full table-auto bg-white border">
                        <thead className="bg-gray-100 text-left text-gray-700">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.length ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="border-t hover:bg-gray-50">
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 capitalize">{user.role}</td>
                                        <td className="p-3 space-x-3">
                                        {user.role !== 'admin' && (
                        <Link href={`/admin/users/${user.id}/edit`} className="text-blue-600 hover:underline">
                            Edit
                        </Link>
                    )}
                                            <Link
                                                as="button"
                                                method="delete"
                                                href={`/admin/users/${user.id}`}
                                                className="text-red-600 hover:underline"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-6 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-6 flex flex-wrap gap-2">
                    {users.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            className={`px-4 py-2 rounded ${
                                link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                            } transition`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
