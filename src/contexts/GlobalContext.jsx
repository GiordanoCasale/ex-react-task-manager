import { createContext, useState, useEffect, useCallback } from "react";

export const GlobalContext = createContext();

const BACK_END_API = import.meta.env.VITE_BACK_END_API;

const GlobalProvider = ({ children }) => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {

        const fetchTasks = async () => {
            try {
                const response = await fetch(`${BACK_END_API}/tasks`);
                if (!response.ok) throw new Error("Errore nella richiesta");
                const data = await response.json();
                console.log("Dati ricevuti:", data);
                setTaskList(data);
            } catch (error) {
                console.error("Errore nel fetch:", error);
            }
        };

        fetchTasks();
    }, []);

    const addTask = useCallback((newTask) => {

        setTaskList((prev) => [...prev, newTask]);
    }, []);

    const removeTask = useCallback(async (taskId) => {
        try {
            const response = await fetch(`${BACK_END_API}/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Errore nella cancellazione');
            }

            const data = await response.json();

            if (data.success) {
                setTaskList((prev) => prev.filter(task => task.id !== parseInt(taskId)));
            } else {
                throw new Error(data.message || 'Errore generico');
            }
        } catch (error) {
            console.error('Errore in removeTask:', error);
            throw error;
        }
    }, []);


    const updateTask = useCallback((updatedTask) => {

        setTaskList((prev) =>
            prev.map(task => task.id === updatedTask.id ? updatedTask : task)
        )
    }, []);


    return (
        <GlobalContext.Provider value={{ taskList, addTask, removeTask, updateTask, setTaskList }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
