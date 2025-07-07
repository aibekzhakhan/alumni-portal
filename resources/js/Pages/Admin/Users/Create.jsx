import React from 'react';
import Form from './Form';
import { Link } from '@inertiajs/react';
import AdminLayout from '../AdminLayout';

export default function Create() {
    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">➕ Create New User</h1>
                <Link href="/admin/users" className="text-blue-600 hover:underline">← Back to User List</Link>
                <div className="mt-6">
                    <Form submitUrl="/admin/users" method="post" />
                </div>
            </div>
        </AdminLayout>
    );
}
