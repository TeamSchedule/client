import styles from "./TaskCommon.module.scss";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";

export interface TaskNameProps {
    name: string | undefined;
}

export default function TaskName(props: TaskNameProps) {
    return (
        <Typography variant="h6" component="div" className={styles.taskName}>
            {props.name ? props.name : <SkeletonWrapper />}
        </Typography>
    );
}
