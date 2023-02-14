import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import TaskEvent from "../common/TaskEvent";
import styles from "./TaskPreview.module.scss";
import TaskUnit from "../common/TaskUnit";
import { taskData } from "../../../testdata/data";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { useNavigate } from "react-router-dom";
import { makeTaskLinkById } from "../../../routes/paths";
import StatusBadge, { StatusBadgeEnum } from "../../StatusBadge/StatusBadge";
import Executors from "../common/Executors";

interface TaskPreviewProps {
    task: TaskResponseItemSchema;
}

export default function TaskPreview(props: TaskPreviewProps) {
    const navigate = useNavigate();

    return (
        <>
            <div
                className={styles.taskPreview}
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(makeTaskLinkById(taskData.id));
                }}
            >
                <StatusBadge status={StatusBadgeEnum.Ok} text="Выполнено" />
                <TaskName name={props.task.name} />
                <TaskDeadline deadline={new Date(props.task.expirationTime)} />
                <TaskEvent event={props.task.event} />
                <TaskUnit unit={props.task.unit} />
                <Executors users={props.task.assignee} />
            </div>
        </>
    );
}
