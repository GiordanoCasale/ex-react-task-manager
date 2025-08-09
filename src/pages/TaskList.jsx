import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import TaskRow from "../components/TaskRow"


const TaskList = () => {
    const { taskList } = useContext(GlobalContext)
    return (
        <div>
            <h2>Lista dei task</h2>
            {taskList.length === 0 ? (
                <p>Nessun task presente</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Stato</th>
                            <th>Data di creazione</th>
                        </tr>
                    </thead>
                    <tbody>
                        {taskList.map((task) => (
                            <TaskRow key={task.id} task={task} />
                        ))}
                    </tbody>
                </table>

            )}
        </div>
    )
}

export default TaskList
