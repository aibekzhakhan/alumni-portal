import React, { useEffect, useState } from 'react';
import { router, usePage, Link } from '@inertiajs/react';
import AdminLayout from '../AdminLayout';

export default function Pending() {
    const { users, filters } = usePage().props;
    const [search, setSearch] = useState(filters.search || '');

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(route('admin.users.pending'), { search }, { preserveState: true, replace: true });
        }, 400);
        return () => clearTimeout(timeout);
    }, [search]);

    const handleSort = (field) => {
        const direction = filters.sort === field && filters.direction === 'asc' ? 'desc' : 'asc';
        router.get(route('admin.users.pending'), { ...filters, sort: field, direction }, { preserveState: true });
    };

    const handleApprove = (userId) => {
        if (confirm('Approve this user?')) {
            router.post(route('admin.users.approve', userId), {}, {
                preserveScroll: true,
                onSuccess: () => router.reload(),
            });
        }
    };
    
    const handleReject = (userId) => {
        if (confirm('Reject and delete this user?')) {
            router.post(route('admin.users.reject', userId), {}, {
                preserveScroll: true,
                onSuccess: () => router.reload(),
            });
        }
    };
    

    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-6">🕒 Pending User Approvals</h1>

                {/* Search Filter */}
                <div className="flex mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border px-4 py-2 rounded w-full max-w-md shadow-sm focus:ring focus:ring-blue-200"
                    />
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto rounded shadow-sm">
                    <table className="w-full table-auto bg-white">
                        <thead className="bg-gray-100">
                            <tr className="text-left text-gray-700">
                                <th className="p-3 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
                                <th className="p-3 cursor-pointer" onClick={() => handleSort('email')}>Email</th>
                                <th className="p-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.length ? (
                                users.data.map((user) => (
                                    <tr key={user.id} className="border-t hover:bg-gray-50 transition">
                                        <td className="p-3">{user.name}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 flex justify-center gap-3">
                                            <button
                                                onClick={() => handleApprove(user.id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => handleReject(user.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center p-6 text-gray-500">
                                        No pending user requests.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap gap-2 mt-6">
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
