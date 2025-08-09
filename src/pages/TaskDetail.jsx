import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import Modal from '../components/Modal';

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { taskList, removeTask } = useContext(GlobalContext);

    const [showModal, setShowModal] = useState(false);
    const task = taskList.find((t) => t.id.toString() === id);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await removeTask(id);
            alert("Task eliminata con successo");
            setShowModal(false);
            navigate("/");
        } catch (error) {
            alert(`Errore: ${error.message}`);
            setShowModal(false);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    if (!task) return <p>Task non trovato.</p>;

    return (
        <div>
            <h1>{task.title}</h1>
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

            <button onClick={handleDeleteClick}>Elimina Task</button>

            <Modal
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questo task?"
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmDelete}
                confirmText="Elimina"
            />
        </div>
    );
};

export default TaskDetail;