import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const UserEdit = ({ title, userData, status }) => {
    const { data, setData, put, post, reset, errors, processing, recentlySuccessful } = useForm(userData);
    if (recentlySuccessful) {
        Swal.fire({
            title: status.success === true ? "Success" : "Failed",
            text: status.message,
            icon: status.alert_type
        })
    }

    const updateUser = (e) => {
        e.preventDefault();
        if (userData.id > 0) {
            put(route('users.update', userData.id), {
                preserveScroll: true,
                onError: (errors) => {
                    if (errors.password) {
                        reset('password');
                    }
                },
            });
        } else {
            post(route('users.store'), {
                preserveScroll: true,
                onError: (errors) => {
                    if (errors.password) {
                        reset('password');
                    }
                },
            })
        }
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
                                            <label>Name <span className='text-danger'>*</span></label>
                                            <input type="text" className="form-control" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                            {errors.name && <span className='text-danger text-sm pl-1'>{errors.name}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Email <span className='text-danger'>*</span></label>
                                            <input type="email" className="form-control" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                            {errors.email && <span className='text-danger text-sm pl-1'>{errors.email}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label>Password</label>
                                            <input type="text" className="form-control" onChange={(e) => setData('password', e.target.value)} />
                                            {errors.password && <span className='text-danger text-sm pl-1'>{errors.password}</span>}
                                        </div>
                                        <div className="d-flex align-items-center mt-4" style={{ gap: "20px" }}>
                                            <button type="submit" className="btn btn-primary" disabled={processing}>Save
                                                {processing && <div className='spinner-border'></div>}
                                            </button>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-success mb-0">
                                                    Saved.
                                                </p>
                                            </Transition>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer">
                                <p className='mb-0'><span className='text-danger text-bold'>*</span> Fields are mendatory</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}

export default UserEdit
