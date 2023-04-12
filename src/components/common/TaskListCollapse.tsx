import React from "react";
import Typography from "@mui/material/Typography";
import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import { compareTasks } from "../../utils/taskUtils";
import BaseTask from "../tasks/BaseTask";
import Box from "@mui/material/Box";
import { TaskViewModeEnum } from "../../enums/tasksEnums";

interface TaskListCollapseProps {
    tasks: TaskResponseItemSchema[];
    title?: string;
}

export default function TaskListCollapse(props: TaskListCollapseProps) {
    if (props.tasks.length === 0) return null;
    return (
        <Box sx={{ pt: 1 }}>
            <Typography variant="subtitle1" component="h2" sx={{ fontWeight: "bold", whiteSpace: "nowrap" }}>
                {props.title ? props.title : "Задачи"}
            </Typography>
            <Box>
                {props.tasks.sort(compareTasks).map((task) => (
                    <BaseTask key={task.id} task={task} viewMode={TaskViewModeEnum.PREVIEW} />
                ))}
            </Box>
        </Box>
    );
}
