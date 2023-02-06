import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import TaskEvent from "../common/TaskEvent";
import styles from "./TaskPreview.module.scss";
import TaskUnit from "../common/TaskUnit";
import { eventsData, units } from "../../../testdata/data";
import { TaskResponseSchema } from "../../../api/schemas/responses/tasks";

interface TaskPreviewProps {
    task: TaskResponseSchema;
}

export default function TaskPreview(props: TaskPreviewProps) {
    return (
        <>
            <div className={styles.taskPreview}>
                <TaskName name={props.task.name} />
                <TaskDeadline deadline={new Date(props.task.expirationTime)} />
                <TaskEvent event={eventsData[0]} />
                <TaskUnit unit={units[0]} />
            </div>
        </>
    );
}
