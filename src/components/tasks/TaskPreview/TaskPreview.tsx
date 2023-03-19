import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import UnitLink from "../../links/UnitLink/UnitLink";
import EventLink from "../../links/EventLink/EventLink";
import { useNavigate } from "react-router-dom";
import { makeTaskLinkById } from "../../../routes/paths";
import TaskName from "../common/TaskName";
import React, { useState } from "react";
import { TaskDescription } from "../common/common";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Collapse from "@mui/material/Collapse";
import { ExpandMore } from "../../common/TaskListCollapse";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { IconButton, Tooltip } from "@mui/material";
import ToggleWorkStatusButton from "../../common/tasks_events/ToggleWorkStatusButton";
import { TaskStatusEnum, TaskStatusStrings } from "../../../enums/tasksEnums";
import { UpdateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import { API } from "../../../api/api";

interface TaskPreviewProps {
    task: TaskResponseItemSchema;
}

export default function TaskPreview(props: TaskPreviewProps) {
    const navigate = useNavigate();

    // раскрыть подробнее
    const [task, setTask] = useState<TaskResponseItemSchema>(props.task);

    // раскрыть подробнее
    const [expanded, setExpanded] = useState<boolean>(false);

    // статус изменения статуса задачи
    const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);

    const toggleTaskStatus = (open: boolean) => (e: React.MouseEvent) => {
        e.preventDefault();
        setIsChangingStatus(true);

        const newStatus: TaskStatusStrings = open ? TaskStatusEnum.IN_PROGRESS : TaskStatusEnum.COMPLETED;
        const updateStatusData: UpdateTaskRequestSchema = {
            taskId: task.id,
            status: newStatus,
        };

        API.tasks
            .updateTaskById(updateStatusData)
            .then(() => {
                setTask({ ...task, taskStatus: newStatus });
            })
            .catch(() => {})
            .finally(() => {
                setIsChangingStatus(false);
            });
    };

    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 275,
                    marginBottom: 1,
                }}
            >
                <CardContent sx={{ p: 2, paddingBottom: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <DeadlineAndStatus endDate={task.expirationTime} status={task.taskStatus} />

                        <Tooltip title="Редактировать">
                            <IconButton sx={{ p: 0 }} onClick={() => navigate(makeTaskLinkById(task.id) + "/edit")}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Link
                        component="a"
                        href={makeTaskLinkById(task.id)}
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            "&:hover": {
                                cursor: "pointer",
                            },
                        }}
                    >
                        <TaskName name={task.name} />
                    </Link>
                    <TaskDescription>{task.description}</TaskDescription>

                    <Collapse in={expanded} timeout="auto" unmountOnExit sx={{ mb: 0, pb: 0 }}>
                        {task.event && <EventLink event={task?.event} />}
                        {task.department && <UnitLink id={task.department.id} name={task.department.name} />}

                        <ToggleWorkStatusButton
                            status={task.taskStatus}
                            toggleStatus={toggleTaskStatus}
                            loading={isChangingStatus}
                        />
                    </Collapse>
                </CardContent>

                <CardActions
                    disableSpacing
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        py: 0,
                        "&:hover": {
                            cursor: "pointer",
                        },
                        px: 0,
                    }}
                    onClick={() => setExpanded(!expanded)}
                >
                    <ExpandMore expand={expanded}>
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
            </Card>
        </>
    );
}
