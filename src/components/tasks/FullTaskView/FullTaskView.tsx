import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import TaskEvent from "../common/TaskEvent";
import TaskUnit from "../common/TaskUnit";
import { taskData } from "../../../testdata/data";
import Executors from "../common/Executors";

export default function FullTaskView() {
    const { id } = useParams();

    const [task, setTask] = useState<TaskResponseItemSchema | undefined>(taskData);

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
    }, [id]);

    return (
        <>
            <div>
                <TaskName name={task?.name} />
                <TaskDeadline deadline={task ? new Date(task?.expirationTime) : undefined} />
                <TaskEvent event={task?.event} />
                <TaskUnit unit={task?.unit} />
                <Executors users={task ? task.assignee : []} />
            </div>
        </>
    );
}
