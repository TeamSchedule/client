import DateLink from "../../links/DateLink/DateLink";
import styles from "./TaskCommon.module.scss";

interface TaskDeadlineProps {
    deadline: Date;
}

export default function TaskDeadline(props: TaskDeadlineProps) {
    return (
        <>
            <div>
                <span className={styles.taskDeadlineLable}>Выполнить до:&nbsp;</span>
                <DateLink date={props.deadline} />
            </div>
        </>
    );
}
