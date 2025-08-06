import { memo } from 'react';

const TaskRow = ({ task }) => {

    const getColor = (status) => {
        switch (status) {
            case "To do":
                return "color-to-do";
            case "Doing":
                return "color-doing";
            case "Done":
                return "color-done";
            default:
                return "";
        }
    };

    return (
        <tr>
            <td>{task.title}</td>
            <td className={getColor(task.status)}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString()}</td>
        </tr>
    );
};

export default memo(TaskRow);

