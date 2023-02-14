import DateLink from "../../links/DateLink/DateLink";
import styles from "./TaskCommon.module.scss";
import Typography from "@mui/material/Typography";

interface TaskDeadlineProps {
    deadline: Date | undefined;
}

export default function TaskDeadline(props: TaskDeadlineProps) {
    return (
        <>
            <div className="d-flex align-items-center align-content-stretch justify-content-stretch">
                <Typography className={styles.taskDeadlineLable}>Выполнить до:&nbsp;</Typography>
                <DateLink date={props.deadline} />
            </div>
        </>
    );
}
