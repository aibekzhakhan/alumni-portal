import React from 'react';
import AdminLayout from './AdminLayout';

export default function Dashboard() {
  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-gray-600">Use the sidebar to manage users, pending users, events, and news.</p>
    </AdminLayout>
  );
}
