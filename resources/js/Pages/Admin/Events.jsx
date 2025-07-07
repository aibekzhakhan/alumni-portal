import React from 'react';
import AdminLayout from './AdminLayout';

export default function Events() {
    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">📅 Upcoming Events</h1>
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-600">There are currently no upcoming events.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
