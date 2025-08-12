import React, { useState, useEffect, useRef } from 'react';
import Modal from './Modal';

const EditTaskModal = ({ show, onClose, task, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('To do');

    const editFormRef = useRef(null);


    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setDescription(task.description || '');
            setStatus(task.status || 'To do');
        }
    }, [task]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedTask = {
            ...task,
            title,
            description,
            status
        };

        onSave(updatedTask);
        onClose();
    };


    const formContent = (
        <form ref={editFormRef} onSubmit={handleSubmit}>
            <div>
                <label>Nome:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Descrizione:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <label>Stato:</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
            </div>
        </form>
    );

    return (
        <Modal
            show={show}
            onClose={onClose}
            title="Modifica Task"
            content={formContent}
            confirmText="Salva"
            onConfirm={() => editFormRef.current?.requestSubmit()}
        />
    );
};

export default EditTaskModal;
