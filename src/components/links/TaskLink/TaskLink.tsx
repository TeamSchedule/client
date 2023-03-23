import { makeTaskLinkById } from "../../../routes/paths";
import Typography from "@mui/material/Typography";
import SkeletonWrapper from "../../SkeletonWrapper";
import Link from "@mui/material/Link";
import TaskIcon from "@mui/icons-material/Task";
import { useNavigate } from "react-router-dom";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";

interface TaskLinkProps {
    task?: TaskResponseItemSchema;
}

export default function TaskLink(props: TaskLinkProps) {
    const navigate = useNavigate();

    const taskLink: string = props.task ? makeTaskLinkById(props.task.id) : "";

    return (
        <>
            {props.task && (
                <Typography variant="body1" component="p">
                    <Link
                        href={taskLink}
                        component="a"
                        variant="body2"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            navigate(taskLink);
                        }}
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <TaskIcon sx={{ color: props.task.event?.color || "", mr: 1 }} />
                        <Typography sx={{ fontSize: "0.9rem" }}>
                            {props.task.name ? props.task.name : <SkeletonWrapper />}
                        </Typography>
                    </Link>
                </Typography>
            )}
        </>
    );
}
