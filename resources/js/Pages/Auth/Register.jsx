import { useState, useEffect } from 'react';
import axios from 'axios';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        graduation_year: '',
        bio: '',
        degree_id: '',
        major_id: '',
        program_id: '',
        phone_number: '',
    });

    const [degrees, setDegrees] = useState([]);
    const [majors, setMajors] = useState([]);
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        // Fetch degrees
        axios.get('/degrees').then(response => {
            setDegrees(response.data);
        }).catch(error => {
            console.error('Error fetching degrees:', error);
        });
    }, []);

    const handleDegreeChange = (e) => {
        const degreeId = e.target.value;
        setData('degree_id', degreeId);
        setData('major_id', ''); // Reset major when degree changes
        setMajors([]);

        // Fetch majors based on selected degree
        axios.get(`/majors/${degreeId}`).then(response => {
            setMajors(response.data);
        }).catch(error => {
            console.error('Error fetching majors:', error);
        });
    };

    const handleMajorChange = (e) => {
        const majorId = e.target.value;
        setData('major_id', majorId);
        setPrograms([]);

        // Fetch programs based on selected major
        axios.get(`/programs/${majorId}`).then(response => {
            setPrograms(response.data);
        }).catch(error => {
            console.error('Error fetching programs:', error);
        });
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Name, Email, Password Fields */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Alumni Profile Fields */}
                <div className="mt-4">
                    <InputLabel htmlFor="graduation_year" value="Graduation Year" />
                    <TextInput
                        id="graduation_year"
                        type="text"
                        name="graduation_year"
                        value={data.graduation_year}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('graduation_year', e.target.value)}
                        required
                    />
                    <InputError message={errors.graduation_year} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="degree_id" value="Degree" />
                    <select
                        id="degree_id"
                        name="degree_id"
                        value={data.degree_id}
                        onChange={handleDegreeChange}
                        className="mt-1 block w-full"
                        required
                    >
                        <option value="">Select Degree</option>
                        {degrees.map((degree) => (
                            <option key={degree.id} value={degree.id}>
                                {degree.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.degree_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="major_id" value="Major" />
                    <select
                        id="major_id"
                        name="major_id"
                        value={data.major_id}
                        onChange={handleMajorChange}
                        className="mt-1 block w-full"
                        required
                        disabled={!data.degree_id}
                    >
                        <option value="">Select Major</option>
                        {majors.map((major) => (
                            <option key={major.id} value={major.id}>
                                {major.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.major_id} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="program_id" value="Program" />
                    <select
                        id="program_id"
                        name="program_id"
                        value={data.program_id}
                        onChange={(e) => setData('program_id', e.target.value)}
                        className="mt-1 block w-full"
                        required
                        disabled={!data.major_id}
                    >
                        <option value="">Select Program</option>
                        {programs.map((program) => (
                            <option key={program.id} value={program.id}>
                                {program.name}
                            </option>
                        ))}
                    </select>
                    <InputError message={errors.program_id} className="mt-2" />
                </div>

                {/* Other Fields (Bio, Phone, etc.) */}
                <div className="mt-4">
                    <InputLabel htmlFor="bio" value="Bio" />
                    <TextInput
                        id="bio"
                        type="text"
                        name="bio"
                        value={data.bio}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('bio', e.target.value)}
                    />
                    <InputError message={errors.bio} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />
                    <TextInput
                        id="phone_number"
                        type="text"
                        name="phone_number"
                        value={data.phone_number}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('phone_number', e.target.value)}
                    />
                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
