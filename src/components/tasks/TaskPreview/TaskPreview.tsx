import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import TaskEvent from "../common/TaskEvent";
import styles from "./TaskPreview.module.scss";
import TaskUnit from "../common/TaskUnit";
import { units } from "../../../testdata/data";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { TaskResponseSchema } from "../../../api/schemas/responses/tasks";

const event: EventResponseItemSchema = { id: 1, name: "EventName" };
const unit: UnitResponseItemSchema = units[0];

interface TaskPreviewProps {
    task: TaskResponseSchema;
}

export default function TaskPreview(props: TaskPreviewProps) {
    return (
        <>
            <div className={styles.taskPreview}>
                <TaskName name={props.task.name} />
                <TaskDeadline deadline={new Date(props.task.expirationTime)} />
                <TaskEvent event={event} />
                <TaskUnit unit={unit} />
            </div>
        </>
    );
}
