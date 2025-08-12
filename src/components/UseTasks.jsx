import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'


const baseUrl = import.meta.env.VITE_BACK_END_API

const useTasks = () => {
    const [tasks, setTasks] = useState([]);

    // Recupera i task all'inizio
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(`${baseUrl}/tasks`);
                setTasks(response.data);
            } catch (error) {
                console.error('Errore nel recupero dei task:', error);
            }
        };

        fetchTasks();
    }, []);


    const addTask = useCallback(async (newTask) => {
        try {
            const response = await axios.post(`${baseUrl}/tasks`, newTask)

            if (response.data.success) {
                const createdTask = response.data.task;
                setTasks((prev) => [...prev, createdTask]);
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }, []);

    const removeTask = useCallback(async (taskId) => {
        try {
            const response = await axios.delete(`${baseUrl}/tasks/${taskId}`)
            if (response.data.success) {
                setTasks((prev) => prev.filter(task => task.id !== taskId));
            } else {
                throw new Error(response.data.message)
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }, []);


    const updateTask = useCallback(async (updatedTask) => {
        try {
            const response = await axios.put(`${baseUrl}/tasks/${updatedTask.id}`, updatedTask);
            if (response.data.success) {
                setTasks((prev) => prev.map(task => task.id === updatedTask.id ? response.data.task : task));
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }, []);


    return {
        tasks,
        addTask,
        removeTask,
        updateTask
    }
}

export default useTasks
