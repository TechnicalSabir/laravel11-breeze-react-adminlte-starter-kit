import GuestLayout from '@/Layouts/GuestLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import { useRef } from 'react';
const appName = import.meta.env.VITE_APP_NAME;

const ForgotPassword = ({ title, status }) => {
    const submitBtnRef = useRef();
    const { data, setData, post, processing, errors, wasSuccessful } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title={title} />
            <div className="login-page">
                {status && (
                    <div className="mb-4 text-success">
                        {status}
                    </div>
                )}
                <div className="login-box">
                    <div className="login-logo">
                        <p role='button'>{title} | {appName}</p>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.</p>
                            <form method="post" onSubmit={submit}>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input type="email" className="form-control" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.email && <span className='pl-1 m-0 text-danger text-sm'>{errors.email}</span>}
                                </div>
                                <button ref={submitBtnRef} type="submit" className="btn btn-primary btn-block" disabled={processing}>Request new password
                                    {processing && <div className='spinner-border'></div>}
                                </button>
                            </form>
                            <Link className='d-block mb-1 mt-3' href={route('login')}>Login</Link>
                            <Link className='d-block mb-1' href={route('register')}>Register a new account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default ForgotPassword