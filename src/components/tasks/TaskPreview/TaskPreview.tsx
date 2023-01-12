import TaskName from "../common/TaskName";
import { Task } from "../../../schemas/instances/tasks";
import TaskDeadline from "../common/TaskDeadline";
import TaskEvent from "../common/TaskEvent";
import Event from "../../../schemas/instances/events";
import styles from "./TaskPreview.module.scss";
import TaskUnit from "../common/TaskUnit";
import { Unit } from "../../../schemas/instances/units";
import { User } from "../../../schemas/instances/users";

const event: Event = { id: 1, name: "EventName" };
const user: User = { id: 1, email: "", fullName: "Сяглова Анна Михайловна", post: "Специалист" };
const unit: Unit = { id: 1, name: "Отдел социальных медиа", members: [user, user, user], openTasks: 4 };

interface TaskPreviewProps {
    task: Task;
}

export default function TaskPreview(props: TaskPreviewProps) {
    return (
        <>
            <div className={styles.taskPreview}>
                <TaskName name={props.task.name} />
                <TaskDeadline deadline={props.task.deadline} />
                <TaskEvent event={event} />
                <TaskUnit unit={unit} />
            </div>
        </>
    );
}
