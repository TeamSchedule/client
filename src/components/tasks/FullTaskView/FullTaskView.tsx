import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";
import { API } from "../../../api/api";
import TaskName from "../common/TaskName";
import Executors from "../common/Executors";
import UnitLink from "../../links/UnitLink/UnitLink";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import { TaskStatusEnum, TaskStatusStrings } from "../../../enums/tasksEnums";
import { UpdateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import { TaskListPath, makeTaskLinkById } from "../../../routes/paths";
import GoBackButton from "../../buttons/GoBackButton";
import EventLink from "../../links/EventLink/EventLink";
import { TaskDescription } from "../common/common";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import { FileResponseItemSchema } from "../../../api/schemas/responses/files";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import useApiCall from "../../../hooks/useApiCall";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import UploadFileList from "../../files/UploadFileList";
import { Box, IconButton, Tooltip } from "@mui/material";

export default function FullTaskView() {
    const { id } = useParams();
    const { state } = useLocation();
    const { created = 0 } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // статус успешности изменения статуса задачи
    const [isChangeStatusOk, setIsChangeStatusOk] = useState<boolean>(false);
    const [isChangeStatusError, setIsChangeStatusError] = useState<boolean>(false);

    const navigate = useNavigate();

    // данные задачи
    const getTaskApiCall = useApiCall<TaskResponseItemSchema | undefined>(
        () => API.tasks.getTaskById(id ? +id : 0),
        undefined
    );
    const task = getTaskApiCall.data;
    const getFilesApiCall = useApiCall<FileResponseItemSchema[]>(() => API.files.getTaskFiles(id ? +id : 0), []);

    const toggleTaskStatus = (open: boolean) => (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!id) {
            return;
        }

        const newStatus: TaskStatusStrings = open ? TaskStatusEnum.IN_PROGRESS : TaskStatusEnum.COMPLETED;
        const updateStatusData: UpdateTaskRequestSchema = {
            taskId: +id,
            status: newStatus,
        };

        API.tasks
            .updateTaskById(updateStatusData)
            .then(() => {
                if (task) {
                    getTaskApiCall.setData({ ...task, taskStatus: newStatus });
                }
            })
            .catch(() => {})
            .finally(() => {});
    };

    const handleCloseSuccessSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingFinished(false);
    };

    const handleChangeStatusSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsChangeStatusOk(false);
    };

    const handleChangeStatusErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsChangeStatusError(false);
    };

    if (!task) return null;

    return (
        <>
            <div>
                {task && (
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <DeadlineAndStatus
                            endDate={task.expirationTime}
                            status={task.taskStatus}
                            onChangeStatus={toggleTaskStatus(task.taskStatus === TaskStatusEnum.COMPLETED)}
                        />
                        <Tooltip title="Редактировать">
                            <IconButton sx={{ p: 0 }} onClick={() => navigate(makeTaskLinkById(task.id) + "/edit")}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
                <TaskName name={task?.name} />
                <TaskDescription>{task?.description}</TaskDescription>

                {task?.department && <UnitLink id={task.department?.id} name={task.department?.name} />}
                {task?.event && <EventLink event={task?.event} />}

                <Executors users={task ? task.assignee : []} fullView />

                <UploadFileList files={getFilesApiCall.data} eventType={FileOwnerTypesEnum.TASK} />

                <GoBackButton to={TaskListPath} buttonText="К календарю" />
            </div>

            <SpeedDial
                ariaLabel="edit task"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<EditIcon />}
                onClick={() => {
                    navigate("edit");
                }}
            ></SpeedDial>

            <SuccessSnackbar handleClose={handleChangeStatusSnackbar} isOpen={isChangeStatusOk}>
                Статус изменен!
            </SuccessSnackbar>

            <ErrorSnackbar handleClose={handleChangeStatusErrorSnackbar} isOpen={isChangeStatusError}>
                Произошла ошибка!
            </ErrorSnackbar>

            <SuccessSnackbar handleClose={handleCloseSuccessSnackbar} isOpen={isCreatingFinished}>
                Задача создана!
            </SuccessSnackbar>
        </>
    );
}
