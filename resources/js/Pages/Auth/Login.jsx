import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
const appName = import.meta.env.VITE_APP_NAME;

const Login = ({ title }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
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
                            <p className="login-box-msg">{title} to your account</p>
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
                                <div className="mb-3">
                                    <div className="input-group">
                                        <input type="password" className="form-control password_input" placeholder="Password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                        <div className="input-group-append">
                                            <div className="input-group-text">
                                                <i className="fas fa-eye-slash" role='button' password-visibility="hide" onClick={(e) => togglePassword(e.target)}></i>
                                            </div>
                                        </div>
                                    </div>
                                    {errors.password && <span className='pl-1 m-0 text-danger text-sm'>{errors.password}</span>}
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="icheck-primary d-flex" style={{ gap: "0.2rem" }}>
                                            <input type="checkbox" id="remember" checked={data.remember} onChange={(e) => setData('remember', e.target.checked)} />
                                            <label htmlFor="remember" className='mb-0'>Remember Me</label>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary btn-block">{title}</button>
                                    </div>
                                </div>
                            </form>
                            <div className="social-auth-links text-center mt-2 mb-3">
                                <p>- OR -</p>
                                <a href="#" className="btn btn-block btn-primary">
                                    <i className="fab fa-facebook mr-2"></i> {title} with Facebook
                                </a>
                                <a href="#" className="btn btn-block btn-danger">
                                    <i className="fab fa-google-plus mr-2"></i> {title} with Google
                                </a>
                            </div>
                            <Link className='d-block mb-1' href={route('password.request')}>Forgot your password?</Link>
                            <Link className='d-block mb-1' href={route('register')}>Register a new account</Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    )
}

export default Login