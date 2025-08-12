import { useContext, useState, useMemo, useCallback, useRef } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import TaskRow from "../components/TaskRow";

const STATUS_ORDER = {
    "To do": 1,
    "Doing": 2,
    "Done": 3,
};

const TaskList = () => {
    const { taskList } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const debounceTimer = useRef(null);

    const debounceSearch = useCallback((value) => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        debounceTimer.current = setTimeout(() => {
            setSearchQuery(value);
        }, 300);
    }, []);

    const handleSearchChange = (e) => {
        debounceSearch(e.target.value);
    };

    const handleSortClick = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder * -1);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    };

    const filteredSortedTasks = useMemo(() => {
        const filtered = taskList.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        return filtered.sort((a, b) => {
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
    }, [taskList, searchQuery, sortBy, sortOrder]);

    const renderSortArrow = (column) => {
        if (sortBy !== column) return null;
        return sortOrder === 1 ? " ▲" : " ▼";
    };

    return (
        <div className="task-list-container">
            <h2>Lista dei task</h2>

            <input
                type="search"
                placeholder="Cerca task per nome..."
                onChange={handleSearchChange}
                className="task-search-input"
            />

            {filteredSortedTasks.length === 0 ? (
                <p>Nessun task presente</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => handleSortClick("title")} className="sortable-column">
                                Nome{renderSortArrow("title")}
                            </th>
                            <th onClick={() => handleSortClick("status")} className="sortable-column">
                                Stato{renderSortArrow("status")}
                            </th>
                            <th onClick={() => handleSortClick("createdAt")} className="sortable-column">
                                Data di creazione{renderSortArrow("createdAt")}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSortedTasks.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default TaskList;
