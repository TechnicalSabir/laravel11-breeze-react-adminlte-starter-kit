import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const UserEdit = ({ title, user }) => {
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        password: ""
    });
    console.log(recentlySuccessful);

    const updateUser = (e) => {
        e.preventDefault();

        put(route('users.update', user.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
            },
        });
    }
    return (
        <AuthenticatedLayout>
            <Head title={title} />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">{title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="card card-outline card-primary mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">{title}</h5>
                            </div>
                            <div className="card-body">
                                <form action="" method="post" onSubmit={updateUser}>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input type="text" className="form-control" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                            {errors.name && <span className='text-danger text-sm pl-1'>{errors.name}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" className="form-control" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                            {errors.email && <span className='text-danger text-sm pl-1'>{errors.email}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="text" className="form-control" onChange={(e) => setData('password', e.target.value)} />
                                        </div>
                                        <div className="d-flex align-items-center mt-4">
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default UserEdit
