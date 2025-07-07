import React from 'react';
import AdminLayout from './AdminLayout';

export default function News() {
    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">📰 Latest News</h1>
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                    <p className="text-gray-600">No news articles have been posted yet.</p>
                </div>
            </div>
        </AdminLayout>
    );
}
