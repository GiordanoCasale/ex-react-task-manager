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


    return (
        <GlobalContext.Provider value={{ taskList, addTask, removeTask, updateTask, setTaskList }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
