import React from 'react';
import { Link, router } from '@inertiajs/react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 border-b border-gray-200">
          <img src="/images/logo.png" alt="NU Logo" className="w-28 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-center text-gray-800">Admin Panel</h2>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          <Link href="/dashboard" className="flex items-center space-x-2 px-3 py-2 hover:bg-blue-100 rounded">
            <DashboardIcon className="text-blue-500" />
            <span className="text-gray-800">Home Page</span>
          </Link>
          <Link href="/admin/users" className="flex items-center space-x-2 px-3 py-2 hover:bg-purple-100 rounded">
            <PersonIcon className="text-purple-600" />
            <span className="text-gray-800">Users</span>
          </Link>
          <Link href={route('admin.users.pending')} className="flex items-center space-x-2 px-3 py-2 hover:bg-blue-100 rounded">
            <PersonIcon className="text-gray-600" />
            <span className="text-gray-800">Pending Users</span>
          </Link>
          <Link href={route('admin.events')} className="flex items-center space-x-2 px-3 py-2 hover:bg-green-100 rounded">
            <EventIcon className="text-green-500" />
            <span className="text-gray-800">Events</span>
          </Link>
          <Link href={route('admin.news')} className="flex items-center space-x-2 px-3 py-2 hover:bg-yellow-100 rounded">
            <NewspaperIcon className="text-yellow-600" />
            <span className="text-gray-800">News</span>
          </Link>
          <Link method="post" href={route('logout')} as="button" className="flex items-center space-x-2 px-3 py-2 hover:bg-red-100 rounded">
            <LogoutIcon className="text-red-500" />
            <span className="text-gray-800">Log Out</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="bg-white p-6 rounded shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
}
