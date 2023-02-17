import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";

export interface TaskNameProps {
    name: string | undefined;
}

export default function TaskName(props: TaskNameProps) {
    return (
        <Typography variant="h6" component="div">
            {props.name ? props.name : <SkeletonWrapper />}
        </Typography>
    );
}
