import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import TaskEvent from "../common/TaskEvent";
import TaskUnit from "../common/TaskUnit";
import { taskData } from "../../../testdata/data";

export default function FullTaskView() {
    const { id } = useParams();

    const [task, setTask] = useState<TaskResponseItemSchema | null>(taskData);

    useEffect(() => {
        if (!id) {
            return;
        }
        API.tasks
            .getTaskById(+id)
            .then((task: TaskResponseItemSchema) => {
                setTask(task);
            })
            .catch(() => {})
            .finally(() => {});
    }, []);

    if (!task) {
        return null;
    }

    return (
        <>
            <div>
                <TaskName name={task.name} />
                <TaskDeadline deadline={new Date(task.expirationTime)} />
                <TaskEvent event={task.event} />
                <TaskUnit unit={task.unit} />
            </div>
        </>
    );
}
