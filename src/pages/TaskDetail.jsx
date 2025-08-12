import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext';
import Modal from '../components/Modal';
import EditTaskModal from '../components/EditTaskModal';
import useTasks from '../components/UseTasks';

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { taskList, removeTask } = useContext(GlobalContext);
    const { updateTask } = useTasks();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const task = taskList.find((t) => t.id.toString() === id);

    const handleDeleteClick = () => setShowDeleteModal(true);
    const handleEditClick = () => setShowEditModal(true);

    const handleConfirmDelete = async () => {
        try {
            await removeTask(id);
            alert("Task eliminata con successo");
            setShowDeleteModal(false);
            navigate("/");
        } catch (error) {
            alert(`Errore: ${error.message}`);
            setShowDeleteModal(false);
        }
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);

    const handleSaveTask = async (updatedTask) => {
        try {
            await updateTask(updatedTask);
            alert("Task modificata con successo");
            setShowEditModal(false);
        } catch (error) {
            alert(`Errore: ${error.message}`);
        }
    };

    if (!task) return <p>Task non trovato.</p>;

    return (
        <div>
            <h1>{task.title}</h1>
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

            <button onClick={handleEditClick}>Modifica Task</button>
            <button onClick={handleDeleteClick}>Elimina Task</button>


            <Modal
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questo task?"
                show={showDeleteModal}
                onClose={handleCloseDeleteModal}
                onConfirm={handleConfirmDelete}
                confirmText="Elimina"
            />


            <EditTaskModal
                show={showEditModal}
                onClose={handleCloseEditModal}
                task={task}
                onSave={handleSaveTask}
            />
        </div>
    );
};

export default TaskDetail;
