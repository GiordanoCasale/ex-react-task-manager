import React, { useRef, useState } from 'react';

const AddTask = () => {
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\\",.<>?/`~";

    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');

    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    const validateTitle = (value) => {
        const hasSymbols = [...value].some(char => symbols.includes(char));
        if (!value.trim()) {
            setTitleError('Il titolo non può essere vuoto.');
            return false;
        } else if (hasSymbols) {
            setTitleError('Il titolo non può contenere simboli speciali.');
            return false;
        } else {
            setTitleError('');
            return true;
        }
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        validateTitle(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isTitleValid = validateTitle(title);

        if (!isTitleValid) {
            return;
        }

        const task = {
            title,
            description: descriptionRef.current.value,
            status: statusRef.current.value
        };

        console.log('Task:', task);

        // Reset form (opzionale)
        setTitle('');
        descriptionRef.current.value = '';
        statusRef.current.value = 'To do';
    };

    return (
        <div className="form-container">
            <h2 className="form_title">Aggiungi Task</h2>

            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label className="label">Nome del Task</label><br />
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        className="form-input"
                    />
                    {titleError && (
                        <p className="error-message" style={{ color: 'red' }}>{titleError}</p>
                    )}
                </div>

                <div className="form-group">
                    <label className="label">Descrizione</label><br />
                    <textarea
                        ref={descriptionRef}
                        className="form-input"
                        rows="4"
                    />
                </div>

                <div className="form-group">
                    <label className="label">Stato</label><br />
                    <select ref={statusRef} defaultValue="To do" className="form-input">
                        <option value="To do">To do</option>
                        <option value="Doing">Doing</option>
                        <option value="Done">Done</option>
                    </select>
                </div>

                <button type="submit" className="form-button">Aggiungi Task</button>
            </form>
        </div>
    );
};

export default AddTask;
