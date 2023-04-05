import React from "react";
import TaskName from "../common/TaskName";
import Executors from "../common/Executors";
import UnitLink from "../../links/UnitLink/UnitLink";
import EditIcon from "@mui/icons-material/Edit";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import EventLink from "../../links/EventLink/EventLink";
import { TaskDescription } from "../common/common";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import UploadFileList from "../../files/UploadFileList";
import { Box, IconButton, Tooltip } from "@mui/material";
import { TaskActionsProps, TaskViewProps } from "./interfaces";

export interface FullTaskViewProps extends TaskViewProps, TaskActionsProps {}

export default function FullTaskView(props: FullTaskViewProps) {
    const task: TaskResponseItemSchema = props.task;

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            <TaskName name={task?.name} />
            <TaskDescription>{task?.description}</TaskDescription>

            {task?.department && <UnitLink id={task.department?.id} name={task.department?.name} />}
            {task?.event && <EventLink event={task?.event} />}

            <Executors users={task.assignee} />

            <UploadFileList files={props.files} eventType={FileOwnerTypesEnum.TASK} />
        </>
    );
}
