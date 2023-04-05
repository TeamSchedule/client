import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import { compareTasks } from "../../utils/taskUtils";
import BaseTask from "../tasks/BaseTask";
import Box from "@mui/material/Box";

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
    if (props.tasks.length === 0) return null;
    return (
        <Box sx={{ pt: 1 }}>
            <Typography variant="subtitle1" component="h2" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                {props.title ? props.title : "Задачи"} - {props.tasks.length}
            </Typography>
            <Box>
                {props.tasks.sort(compareTasks).map((task) => (
                    <BaseTask key={task.id} task={task} />
                ))}
            </Box>
        </Box>
    );
}
