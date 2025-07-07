import React, { useEffect, useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

export default function Dashboard() {
    const { auth } = usePage().props;
    
    const [sliderRef] = useKeenSlider({
        loop: true,
        slides: { perView: 1 },
        drag: true,
        mode: 'snap',
        renderMode: 'performance',
        created: (slider) => {
        setInterval(() => slider.next(), 5000); // autoplay every 5s
        },
    });
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
        setIsScrolled(window.scrollY > 50); // adjust trigger threshold
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
        }, []);

    return (
        <div className="relative">
            {/* Transparent Navbar */}
            <header className={`fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-colors duration-300 ${isScrolled ? 'bg-gray-700/90 text-white shadow' : 'bg-transparent text-white'}`}>
                <div className="flex items-center gap-2">
                    <img src="/images/logo.png" className="h-12" />
                    <span className="font-bold text-3xl">NU Alumni</span>
                </div>
                <nav className="flex gap-6">
                    <a href={route('dashboard')} className="text-white text-xl hover:text-blue-300">EN</a>
                    <a href={route('lang.ru')} className="text-white text-xl hover:text-blue-300">RU</a>
                    <a href={route('lang.kz')} className="text-white text-xl hover:text-blue-300">KZ</a>
                </nav>

                <nav className="flex gap-6">
                    <a href="#events" className="text-inherit text-xl font-medium hover:text-blue-300 transition">Events</a>
                    <a href="#news" className="text-inherit text-xl font-medium hover:text-blue-300 transition">News</a>
                    <a href="/profile" className="text-inherit text-xl font-medium hover:text-blue-300 transition">Profile</a>
                    {auth.user.role === 'admin' && (
        <Link
            href={route('admin.dashboard')}
            className="text-inherit text-xl font-medium hover:text-blue-300 transition"
        >
            Admin Panel
        </Link>
    )}
                </nav>
            </header>
        
            {/* Carousel/Background Image */}
            {/* Carousel Hero Section */}
            <div ref={sliderRef} className="keen-slider w-full h-[750px] md:h-[800px] relative">
            {['event1.jpg', 'event2.jpg', 'news1.jpg'].map((img, i) => (
                <div key={i} className="keen-slider__slide number-slide relative">
                <img
                    src={`/images/${img}`}
                    className="w-full h-full object-cover"
                    alt={`Hero slide ${i + 1}`}
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute bottom-20 left-10 text-white z-10 max-w-xl">
                    <h2 className="text-4xl font-bold mb-2">Alumni Gala {2025 + i}</h2>
                    <p className="text-lg">Join us for our most anticipated alumni event of the year.</p>
                </div>
                </div>
            ))}
            </div>


            {/* Welcome Section */}
            <section className="bg-white text-center py-14 px-6">
                <h1 className="text-5xl font-bold text-gray-900 mb-4">Welcome, {auth.user.name}!</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">Reconnect, explore opportunities, and celebrate your achievements with the NU Alumni Network.</p>
            </section>

            {/* Mentorship Highlight */}
            <section id="news" className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6 grid gap-10 lg:grid-cols-2 items-center">
                    <img src="/images/news1.jpg" alt="Featured Story" className="rounded-lg shadow" />
                    <div>
                        <span className="text-sm uppercase text-red-600 font-semibold">Featured</span>
                        <h2 className="text-3xl font-bold text-gray-800 mt-2">Global Alumni Mentorship Program</h2>
                        <p className="text-gray-600 mt-4 text-sm">This initiative connects NU graduates around the world with current students and fellow alumni for career guidance, networking, and mentorship. Sign up today and become a mentor or mentee!</p>
                        <div className="grid grid-cols-2 gap-4 mt-6">
                            <div className="p-4 bg-white rounded shadow-sm text-center">
                                <h3 className="text-lg font-semibold">180+</h3>
                                <p className="text-xs text-gray-500">Mentors Available</p>
                            </div>
                            <div className="p-4 bg-white rounded shadow-sm text-center">
                                <h3 className="text-lg font-semibold">22 Countries</h3>
                                <p className="text-xs text-gray-500">Worldwide Reach</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="bg-blue-50 py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-2">📍 Upcoming Alumni Events</h2>
                    <p className="text-gray-600 mb-10">Participate in alumni-hosted seminars, reunions, and leadership talks worldwide.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="border rounded-lg p-4 shadow hover:shadow-lg transition bg-white">
                                <img src={`/images/event${i + 1}.jpg`} className="w-full h-48 object-cover rounded mb-4" />
                                <span className="text-sm text-red-600 font-medium">Leadership Talk</span>
                                <h3 className="text-lg font-semibold mt-2">Event Title #{i + 1}</h3>
                                <p className="text-sm text-gray-600 mt-1">April {20 + i}, 2025 · Online & In-Person</p>
                                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Register</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p>&copy; {new Date().getFullYear()} NU Alumni Network. All rights reserved.</p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/about" className="hover:underline">About</Link>
                        <Link href="/privacy" className="hover:underline">Privacy</Link>
                        <Link href="/contact" className="hover:underline">Contact</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
