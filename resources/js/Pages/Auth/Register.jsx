import GuestLayout from '@/Layouts/GuestLayout'
import { Head, useForm, Link } from '@inertiajs/react'
const appName = import.meta.env.VITE_APP_NAME;


const Register = ({ title }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
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
                            <p className="login-box-msg">{title} a new account</p>
                            <form method="post" onSubmit={submit}>
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Full Name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-user"></span>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.name && <span className='pl-1 m-0 text-danger text-sm'>{errors.name}</span>}
                                </div>
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
                                    <div className="input-group">
                                        <input type="password" className="form-control password_input" placeholder="Confirm Password" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <span className="fas fa-lock"></span>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.password_confirmation && <span className='pl-1 m-0 text-danger text-sm'>{errors.password_confirmation}</span>}
                                </div>
                                <button type="submit" className="btn btn-primary btn-block" disabled={processing}>{title}
                                    {processing && <div className='spinner-border'></div>}
                                </button>
                            </form>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <p>- OR -</p>
                                <a href="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2"></i> Signup with Facebook
                                </a>
                                <a href="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2"></i> Signup with Google
                                </a>
                            </div>
                            <p>Already have an account? <Link href={route('login')}>Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default Register