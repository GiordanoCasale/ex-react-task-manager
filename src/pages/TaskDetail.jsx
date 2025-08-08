import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../contexts/GlobalContext'; // aggiorna il percorso se necessario

const TaskDetail = () => {
    const { id } = useParams();
    const { taskList, removeTask } = useContext(GlobalContext);

    const task = taskList.find((t) => t.id.toString() === id);

    const handleDelete = () => {
        console.log("Elimino task");
        removeTask(id);
    };

    if (!task) return <p>Task non trovato.</p>;

    return (
        <div>
            <h1>{task.title}</h1>
            <p><strong>Descrizione:</strong> {task.description}</p>
            <p><strong>Stato:</strong> {task.status}</p>
            <p><strong>Creato il:</strong> {new Date(task.createdAt).toLocaleDateString()}</p>

            <button onClick={handleDelete}>Elimina Task</button>
        </div>
    );
};

export default TaskDetail;