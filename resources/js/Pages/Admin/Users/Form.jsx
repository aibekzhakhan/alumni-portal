import { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function Form({ user = {}, alumni = {}, submitUrl, method }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        graduation_year: alumni?.graduation_year || '',
        degree_id: alumni?.degree_id || '',
        major_id: alumni?.major_id || '',
        program_id: alumni?.program_id || '',
        bio: alumni?.bio || '',
        phone_number: alumni?.phone_number || '',
        avatar: '',
    });

    const [degrees, setDegrees] = useState([]);
    const [majors, setMajors] = useState([]);
    const [programs, setPrograms] = useState([]);

    useEffect(() => {
        axios.get('/degrees').then(res => setDegrees(res.data));
    }, []);

    useEffect(() => {
        if (data.degree_id) {
            axios.get(`/majors/${data.degree_id}`).then(res => setMajors(res.data));
        } else {
            setMajors([]);
        }
        setData('major_id', '');
        setData('program_id', '');
        setPrograms([]);
    }, [data.degree_id]);

    useEffect(() => {
        if (data.major_id) {
            axios.get(`/programs/${data.major_id}`).then(res => setPrograms(res.data));
        } else {
            setPrograms([]);
        }
        setData('program_id', '');
    }, [data.major_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (method === 'put') {
            formData.append('_method', 'PUT');
            put(submitUrl, formData);
        } else {
            post(submitUrl, formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Basic fields */}
            <Input label="Name" id="name" value={data.name} onChange={e => setData('name', e.target.value)} />
            <Input label="Email" id="email" type="email" value={data.email} onChange={e => setData('email', e.target.value)} />
            {method === 'post' && <Input label="Password" id="password" type="password" value={data.password} onChange={e => setData('password', e.target.value)} />}

            {/* Alumni-specific fields */}
            {(method === 'post' || user.role === 'alumni') && (
                <>
                    <Input label="Graduation Year" id="graduation_year" type="number" value={data.graduation_year} onChange={e => setData('graduation_year', e.target.value)} />

                    <Select label="Degree" id="degree_id" value={data.degree_id} onChange={e => setData('degree_id', e.target.value)} options={degrees} />
                    <Select label="Major" id="major_id" value={data.major_id} onChange={e => setData('major_id', e.target.value)} options={majors} />
                    <Select label="Program" id="program_id" value={data.program_id} onChange={e => setData('program_id', e.target.value)} options={programs} />

                    <Input label="Phone Number" id="phone_number" value={data.phone_number} onChange={e => setData('phone_number', e.target.value)} />
                    <Textarea label="Bio" id="bio" value={data.bio} onChange={e => setData('bio', e.target.value)} />

                    <div className="mb-4">
                        <label htmlFor="avatar" className="block">Avatar</label>
                        <input type="file" id="avatar" onChange={e => setData('avatar', e.target.files[0])} />
                    </div>
                </>
            )}

            <button disabled={processing} className="bg-blue-500 text-white px-4 py-2 rounded">
                {method === 'put' ? 'Save Changes' : 'Create User'}
            </button>
        </form>
    );
}

function Input({ label, id, ...props }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block">{label}</label>
            <input id={id} className="mt-1 block w-full" {...props} />
        </div>
    );
}

function Select({ label, id, options, ...props }) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block">{label}</label>
            <select id={id} className="mt-1 block w-full" {...props}>
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
            <label htmlFor={id} className="block">{label}</label>
            <textarea id={id} className="mt-1 block w-full" {...props} />
        </div>
    );
}
