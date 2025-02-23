import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
const appName = import.meta.env.VITE_APP_NAME;


export default function VerifyEmail({ title, status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        // <GuestLayout>
        //     <Head title="Email Verification" />
        //     <div className="login-page">
        //         <div className="login-box">
        //             <div className="login-logo">
        //                 <p role='button'>{title} | {appName}</p>
        //             </div>
        //             <div className="card">
        //                 <div className="mb-4 text-sm">
        //                     Thanks for signing up! Before getting started, could you verify
        //                     your email address by clicking on the link we just emailed to
        //                     you? If you didn't receive the email, we will gladly send you
        //                     another.
        //                 </div>

        //                 {status === 'verification-link-sent' && (
        //                     <div className="mb-4 text-sm font-medium text-green-600">
        //                         A new verification link has been sent to the email address
        //                         you provided during registration.
        //                     </div>
        //                 )}


        //             </div>
        //         </div>
        //     </div>


        // </GuestLayout>

        <GuestLayout>
            <Head title={title} />
            <div className="login-page">
                <div className="login-box">
                    {status === "verification-link-sent" && <div className="mb-4 text-center text-success">A new verification link has been sent to the email address you provided during registration.</div>}
                    <div className="login-logo">
                        <p role='button'>{title} | {appName}</p>
                    </div>
                    <div className="card">
                        <div className="card-body login-card-body">
                            <p className="login-box-msg px-0"> Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.</p>
                            <form onSubmit={submit}>
                                <button className='btn btn-primary btn-block' disabled={processing}>Resend Verification Email
                                    {processing && <div className='spinner-border'></div>}
                                </button>
                            </form>
                            <Link className='d-block mt-3' href={route('logout')}>Log Out</Link>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
