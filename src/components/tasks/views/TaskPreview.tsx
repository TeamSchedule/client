import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import UnitLink from "../../links/UnitLink/UnitLink";
import EventLink from "../../links/EventLink/EventLink";
import { makeTaskLinkById } from "../../../routes/paths";
import TaskName from "../common/TaskName";
import React from "react";
import { TaskDescription } from "../common/common";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { IconButton, Tooltip } from "@mui/material";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import { TaskActionsProps, TaskViewProps } from "./interfaces";
import Executors from "../common/Executors";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export interface TaskPreviewProps extends TaskViewProps, TaskActionsProps {}

export default function TaskPreview(props: TaskPreviewProps) {
    const navigate = useNavigate();

    const task: TaskResponseItemSchema = props.task;

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <DeadlineAndStatus
                    endDate={task.expirationTime}
                    status={task.taskStatus}
                    onChangeStatus={props.toggleTaskStatus(task.taskStatus === TaskStatusEnum.COMPLETED)}
                />

                <Tooltip title="Редактировать">
                    <IconButton sx={{ p: 0 }} onClick={props.navigateToEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Link
                component="a"
                href={makeTaskLinkById(task.id)}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    navigate(makeTaskLinkById(task.id));
                }}
                sx={{
                    "&:hover": {
                        cursor: "pointer",
                    },
                }}
            >
                <TaskName name={task.name} />
            </Link>
            <TaskDescription>{task.description}</TaskDescription>

            {task.event && <EventLink event={task?.event} />}
            {task.department && <UnitLink id={task.department.id} name={task.department.name} />}

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {Boolean(props.task.files.length) && (
                    <Typography component="p" variant="subtitle1" sx={{ color: "grey" }}>
                        Файлов: {props.task.files.length}
                    </Typography>
                )}

                <Box sx={{ marginLeft: "auto" }}>
                    <Executors users={task.assignee} />
                </Box>
            </Box>
        </Box>
    );
}
