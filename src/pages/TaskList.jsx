import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

const STATUS_ORDER = {
    "To do": 1,
    "Doing": 2,
    "Done": 3,
};

const TaskList = () => {
    const { taskList } = useContext(GlobalContext);

    // Stati per ordinamento
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1); // 1 = crescente, -1 = decrescente

    // Funzione di click sulle intestazioni per gestire ordinamento
    const handleSortClick = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder * -1); // Inverti ordine
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    };

    // useMemo per array ordinato
    const sortedTasks = useMemo(() => {
        return [...taskList].sort((a, b) => {
            let compareResult = 0;

            if (sortBy === "title") {
                compareResult = a.title.localeCompare(b.title);
            } else if (sortBy === "status") {
                compareResult = STATUS_ORDER[a.status] - STATUS_ORDER[b.status];
            } else if (sortBy === "createdAt") {
                compareResult = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            }

            return compareResult * sortOrder;
        });
    }, [taskList, sortBy, sortOrder]);

    // Funzione helper per mostrare una freccia di ordinamento nell'intestazione
    const renderSortArrow = (column) => {
        if (sortBy !== column) return null;
        return sortOrder === 1 ? " ▲" : " ▼";
    };

    return (
        <div className="task-list-container">
            <h2>Lista dei task</h2>
            {sortedTasks.length === 0 ? (
                <p>Nessun task presente</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th
                                onClick={() => handleSortClick("title")}
                                style={{ cursor: "pointer" }}
                            >
                                Nome
                                {sortBy === "title" && (
                                    <span className="sort-arrow">{sortOrder === 1 ? " ▲" : " ▼"}</span>
                                )}
                            </th>
                            <th
                                onClick={() => handleSortClick("status")}
                                style={{ cursor: "pointer" }}
                            >
                                Stato
                                {sortBy === "status" && (
                                    <span className="sort-arrow">{sortOrder === 1 ? " ▲" : " ▼"}</span>
                                )}
                            </th>
                            <th
                                onClick={() => handleSortClick("createdAt")}
                                style={{ cursor: "pointer" }}
                            >
                                Data di creazione
                                {sortBy === "createdAt" && (
                                    <span className="sort-arrow">{sortOrder === 1 ? " ▲" : " ▼"}</span>
                                )}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

};

export default TaskList;
