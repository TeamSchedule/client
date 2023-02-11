import DateLink from "../../links/DateLink/DateLink";
import styles from "./TaskCommon.module.scss";

interface TaskDeadlineProps {
    deadline: Date | undefined;
}

export default function TaskDeadline(props: TaskDeadlineProps) {
    return (
        <>
            <div className="d-flex align-items-center align-content-stretch justify-content-stretch">
                <span className={styles.taskDeadlineLable}>Выполнить до:&nbsp;</span>
                <DateLink date={props.deadline} />
            </div>
        </>
    );
}
