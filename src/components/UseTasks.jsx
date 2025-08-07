import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    // Recupera i task all'inizio
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Errore nel recupero dei task:', error);
            }
        };

        fetchTasks();
    }, []);


    const addTask = useCallback((newTask) => {

        setTasks((prev) => [...prev, newTask]);
    }, []);

    const removeTask = useCallback((taskId) => {
        setTasks((prev) => prev.filter(task => task.id !== taskId));
    }, []);


    const updateTask = useCallback((updatedTask) => {

        setTasks((prev) =>
            prev.map(task => task.id === updatedTask.id ? updatedTask : task)
        )
    }, []);


    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    }
}

export default useTasks
