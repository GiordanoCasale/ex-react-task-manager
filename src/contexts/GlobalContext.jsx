import { createContext, useState, useEffect } from "react";

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
    return (
        <GlobalContext.Provider value={{ taskList, setTaskList }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
