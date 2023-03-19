import React, { useState } from "react";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import TaskPreview from "../tasks/TaskPreview";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import { compareTasks } from "../../utils/taskUtils";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} sx={{ width: "100%", borderRadius: 1 }} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface TaskListCollapseProps {
    tasks: TaskResponseItemSchema[];
    title?: string;
}

export default function TaskListCollapse(props: TaskListCollapseProps) {
    // раскрыть раздел с задачами
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <>
            {props.tasks.length > 0 && (
                <CardActions
                    disableSpacing
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                        px: 0,
                    }}
                    onClick={() => setExpanded(!expanded)}
                >
                    <Typography variant="subtitle1" component="h2" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                        {props.title ? props.title : "Задачи"} - {props.tasks.length}
                    </Typography>
                    <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            )}

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                {props.tasks.sort(compareTasks).map((task) => (
                    <TaskPreview key={task.id} task={task} />
                ))}
            </Collapse>
        </>
    );
}
