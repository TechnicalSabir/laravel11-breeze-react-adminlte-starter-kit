import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Modal from '@/Components/Modal';

export default function DeleteUserForm() {
    const [toggleModal, setToggleModal] = useState(false);
    const passwordInput = useRef();

    const { data, setData, delete: destroy, processing, reset, errors, clearErrors, } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setToggleModal(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setToggleModal(false);
        clearErrors();
        reset();
    };

    return (
        <div className="card card-outline card-primary mb-4">
            <div className="card-header">
                <h5 className="mb-0">Delete Account</h5>
            </div>
            <div className="card-body">
                <div className="col-md-6">
                    <p className='text-sm text-dark'> Once your account is deleted, all of its resources and data will be permanently deleted. <br /> Before deleting your account, please download any data or information that you wish to retain.</p>
                    <button type="button" onClick={confirmUserDeletion} className="btn btn-danger w-50 my-3">Delete Account</button>
                </div>
            </div>
            <Modal toggleModal={toggleModal}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form action="" onSubmit={deleteUser}>
                            <div className="modal-header">
                                <h5 className="modal-title">Are you sure you want to delete your account?</h5>
                                <button type="button" onClick={closeModal} className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Once your account is deleted, all of its resources and data will be permanently deleted. Please enter your password to confirm you would like to permanently delete your account.</p>
                                <div className="mb-3">
                                    <label>Password</label>
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
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" onClick={closeModal} className="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-danger" disabled={processing}>Delete Account
                                    {processing && <div className='spinner-border'></div>}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
