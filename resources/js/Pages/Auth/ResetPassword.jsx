import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
const appName = import.meta.env.VITE_APP_NAME;


const ResetPassword = ({ title, token, email }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email ?? '',
        password: '',
        password_confirmation: '',
    });


    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };
    return (
        <GuestLayout>
            <Head title={title} />
            <div className="login-page">
                <div className="login-box">
                    <div className="login-logo">
                        <p role='button'>{title} | {appName}</p>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg">You are only one step a way from your new password, recover your password now.</p>
                            <form method="post" onSubmit={submit}>
                                <div className='mb-3'>
                                    <div className="input-group mb-3">
                                        <input type="email" className="form-control" placeholder="Email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-envelope"></span>
                                            </div>
                                        </div>
                                        {errors.email && <span className='pl-1 m-0 text-danger text-sm'>{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input type="password" className="form-control password_input" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <i className="fas fa-eye-slash" role='button' password-visibility="hide" title='Toggle password' onClick={(e) => togglePassword(e.target)}></i>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.password && <span className='pl-1 m-0 text-danger text-sm'>{errors.password}</span>}
                                </div>
                                <div className="mb-3">
                                    <div className="input-group mb-3">
                                        <input type="password" className="form-control password_input" placeholder="Confirm Password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.password_confirmation && <span className='pl-1 m-0 text-danger text-sm'>{errors.password_confirmation}</span>}
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary btn-block">{title}</button>
                                    </div>
                                </div>
                            </form>
                            <p className="mt-3 mb-1 text-center">Go to <Link href={route('login')}>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default ResetPassword