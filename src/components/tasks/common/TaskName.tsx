import styles from "./TaskCommon.module.scss";

export interface TaskNameProps {
    name: string;
}

export default function TaskName(props: TaskNameProps) {
    return (
        <>
            <div className={styles.taskName}>{props.name}</div>
        </>
    );
}
