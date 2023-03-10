import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";

export interface TaskNameProps {
    name: string | undefined;
}

export default function TaskName(props: TaskNameProps) {
    return (
        <Typography variant="h6" component="div" sx={{ fontSize: "1rem" }}>
            {props.name ? props.name : <SkeletonWrapper />}
        </Typography>
    );
}
