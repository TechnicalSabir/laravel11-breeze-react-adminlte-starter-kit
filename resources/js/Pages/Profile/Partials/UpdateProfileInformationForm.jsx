import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <div className="card card-outline card-primary mb-4">
            <div className="card-header">
                <h5 className="mb-0">Profile Information</h5>
                <span className='text-sm text-secondary'>Update your account's profile information and email address.</span>
            </div>
            <div className="card-body">
                <form action="" method="post" onSubmit={submit}>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <span className='pl-1 m-0 text-danger text-sm'>{errors.name}</span>}
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                            {errors.email && <span className='pl-1 m-0 text-danger text-sm'>{errors.email}</span>}
                        </div>
                        {mustVerifyEmail && user.email_verified_at === null && (
                            <div>
                                <p className="d-flex align-items-center text-sm mb-0">Your email address is unverified.
                                    <Link href={route('verification.send')} method="post" className="btn btn-link m-0 p-0">Click here to re-send the verification email.</Link>
                                </p>
                                {status === 'verification-link-sent' && <div className="mt-2 text-sm text-success">A new verification link has been sent to your email address.</div>}
                            </div>
                        )}
                        <div className='d-flex align-items-center mt-4' style={{ gap: "20px" }}>
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
        </div>
    );
}
