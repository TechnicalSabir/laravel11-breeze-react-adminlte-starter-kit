import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <div className="card card-outline card-primary mb-4">
            <div className="card-header">
                <h5 className="mb-0">Update Password</h5>
                <span className='text-sm text-secondary'>Ensure your account is using a long, random password to stay secure.</span>
            </div>
            <div className="card-body">
                <form action="" method="post" onSubmit={updatePassword}>
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label>Current Password</label>
                            <div className="input-group">
                                <input type="password" className="form-control password_input" placeholder="Current Password" value={data.current_password} onChange={(e) => setData('current_password', e.target.value)} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <i className="fas fa-eye-slash" role='button' password-visibility="hide" title='Toggle password' onClick={(e) => togglePassword(e.target)}></i>
                                    </div>
                                </div>
                            </div>
                            {errors.current_password && <span className='pl-1 m-0 text-danger text-sm'>{errors.current_password}</span>}
                        </div>
                        <div className="form-group">
                            <label>New Password</label>
                            <input type="password" className="form-control password_input" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                            {errors.password && <span className='pl-1 m-0 text-danger text-sm'>{errors.password}</span>}
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control password_input" value={data.password_confirmation} onChange={(e) => setData('password_confirmation', e.target.value)} />
                            {errors.password_confirmation && <span className='pl-1 m-0 text-danger text-sm'>{errors.password_confirmation}</span>}
                        </div>
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
