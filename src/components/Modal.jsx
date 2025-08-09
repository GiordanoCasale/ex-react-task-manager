import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = "Conferma"
}) => {
    if (!show) return null;

    const modalContent = (
        <>
            <div className="modal-overlay" onClick={onClose} />
            <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <h2 id="modal-title">{title}</h2>
                <div className="modal-content">{content}</div>
                <div className="modal-buttons">
                    <button className="btn-cancel" onClick={onClose}>Annulla</button>
                    <button className="btn-confirm" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </>
    );

    return ReactDOM.createPortal(modalContent, document.body);
};

export default Modal;
