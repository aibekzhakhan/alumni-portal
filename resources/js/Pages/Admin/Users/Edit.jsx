import React from 'react';
import AdminLayout from '../AdminLayout';
import { Link, usePage } from '@inertiajs/react';
// import Form from './Form';
import EditForm from './EditForm';

export default function Edit() {
    const { user } = usePage().props;
    const { alumni } = user;

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">✏️ Edit User</h1>
                <Link href="/admin/users" className="text-blue-600 hover:underline">← Back to User List</Link>
            </div>
            <EditForm
                user={user}
                alumni={alumni}
                submitUrl={`/admin/users/${user.id}`}
                method="put"
            />
        </AdminLayout>
    );
}
