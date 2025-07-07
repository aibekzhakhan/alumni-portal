import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function EditForm({ user = {}, alumni = {}, submitUrl }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        graduation_year: alumni?.graduation_year || '',
        degree_id: alumni?.degree_id || '',
        major_id: alumni?.major_id || '',
        program_id: alumni?.program_id || '',
        bio: alumni?.bio || '',
        phone_number: alumni?.phone_number || '',
    });

    const [degrees, setDegrees] = useState([]);
    const [majors, setMajors] = useState([]);
    const [programs, setPrograms] = useState([]);

    // Fetch degrees on load
    useEffect(() => {
        if (user.role === 'alumni') {
            axios.get('/degrees').then(res => setDegrees(res.data));
        }
    }, []);

    // Fetch majors based on degree
    useEffect(() => {
        if (user.role !== 'alumni') return;
        if (data.degree_id) {
            axios.get(`/majors/${data.degree_id}`).then(res => {
                setMajors(res.data);

                // If the current major_id doesn't belong to new degree_id, reset it
                if (!res.data.some(major => major.id == data.major_id)) {
                    setData('major_id', '');
                    setData('program_id', '');
                    setPrograms([]);
                }
            });
        } else {
            setMajors([]);
            setData('major_id', '');
            setData('program_id', '');
            setPrograms([]);
        }
    }, [data.degree_id]);

    // Fetch programs based on major
    useEffect(() => {
        if (user.role !== 'alumni') return;
        if (data.major_id) {
            axios.get(`/programs/${data.major_id}`).then(res => {
                setPrograms(res.data);

                if (!res.data.some(program => program.id == data.program_id)) {
                    setData('program_id', '');
                }
            });
        } else {
            setPrograms([]);
            setData('program_id', '');
        }
    }, [data.major_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in data) {
            if (data[key] !== '' && data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        }

        formData.append('_method', 'PUT');
        put(submitUrl, formData);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            {/* Basic Fields */}
            <Input label="Name" id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
            <Input label="Email" id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} />

            {/* Alumni Specific */}
            {user.role === 'alumni' && (
                <>
                    <Input label="Graduation Year" id="graduation_year" type="number" value={data.graduation_year} onChange={e => setData('graduation_year', e.target.value)} />
                    <Select label="Degree" id="degree_id" value={data.degree_id} onChange={e => setData('degree_id', e.target.value)} options={degrees} />
                    <Select label="Major" id="major_id" value={data.major_id} onChange={e => setData('major_id', e.target.value)} options={majors} />
                    <Select label="Program" id="program_id" value={data.program_id} onChange={e => setData('program_id', e.target.value)} options={programs} />
                    <Input label="Phone Number" id="phone_number" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                    <Textarea label="Bio" id="bio" value={data.bio} onChange={e => setData('bio', e.target.value)} />
                </>
            )}

            <div className="text-right">
                <button
                    disabled={processing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
}

function Input({ label, id, ...props }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-medium mb-1">{label}</label>
            <input id={id} {...props} className="border rounded w-full px-4 py-2 focus:ring" />
        </div>
    );
}

function Select({ label, id, options, ...props }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-medium mb-1">{label}</label>
            <select id={id} {...props} className="border rounded w-full px-4 py-2 focus:ring">
                <option value="">Select {label}</option>
                {options.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
            </select>
        </div>
    );
}

function Textarea({ label, id, ...props }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block font-medium mb-1">{label}</label>
            <textarea id={id} {...props} className="border rounded w-full px-4 py-2 focus:ring" />
        </div>
    );
}
