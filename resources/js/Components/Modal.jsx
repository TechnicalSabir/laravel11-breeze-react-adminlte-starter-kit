import React, { useEffect, useRef } from 'react'
import { Modal } from 'bootstrap';


const ModalComponent = ({ children, toggleModal }) => {
    const modalRef = useRef();
    let modal = null;
    useEffect(() => {
        modal = new Modal(modalRef.current, { backdrop: "static" });
        if (toggleModal) {
            modal.show();
        } else {
            modal.hide();
        }
        return () => {
            if (modal) {
                modal.hide();
            }
        };
    }, [toggleModal])

    return (
        <div ref={modalRef} className="modal fade" id="modal-default" tabIndex={-1}>
            {children}
        </div>
    )
}

export default ModalComponent