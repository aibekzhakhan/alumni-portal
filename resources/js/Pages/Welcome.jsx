import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div
                className="min-h-screen bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: "url('/images/nu.jpg')" }}
            >
                <div className="absolute top-0 right-0 p-6 space-x-4 z-10">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="bg-white text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="bg-white text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="bg-white text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-100 transition"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="text-center bg-black/60 p-10 rounded-xl shadow-xl max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">Welcome to NU Alumni Network</h1>
                    <p className="text-lg">
                        Connect, explore, and celebrate your journey with Nazarbayev University.
                    </p>
                </div>
            </div>
        </>
    );
}
