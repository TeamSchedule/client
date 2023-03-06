import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskName from "../common/TaskName";
import TaskDeadline from "../common/TaskDeadline";
import Executors from "../common/Executors";
import UnitLink from "../../links/UnitLink/UnitLink";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { UpdateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import LoadingButton from "@mui/lab/LoadingButton";

export default function FullTaskView() {
    const { id } = useParams();
    const { state } = useLocation();
    const { created = 0, taskData = null } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // статус успешности изменения статуса задачи
    const [isChangeStatusOk, setIsChangeStatusOk] = useState<boolean>(false);
    const [isChangeStatusError, setIsChangeStatusError] = useState<boolean>(false);

    const navigate = useNavigate();

    const [task, setTask] = useState<TaskResponseItemSchema | undefined>(taskData);

    function getTaskData() {
        if (!id) {
            return;
        }
        API.tasks
            .getTaskById(+id)
            .then((task: TaskResponseItemSchema) => {
                setTask(task);
            })
            .catch(() => {})
            .finally(() => {});
    }

    useEffect(() => {
        getTaskData();
        /* eslint-disable react-hooks/exhaustive-deps */
    }, []);

    const toggleTaskStatus = (open: boolean) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (!id) {
            return;
        }

        const updateStatusData: UpdateTaskRequestSchema = {
            status: open ? TaskStatusEnum.IN_PROGRESS : TaskStatusEnum.COMPLETED,
        };

        API.tasks
            .updateTaskById(+id, updateStatusData)
            .then(() => {
                setIsChangeStatusOk(true);
            })
            .catch(() => {});
        getTaskData();
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
    return (
        <>
            <div>
                <TaskName name={task?.name} />
                <TaskDeadline deadline={task?.expirationTime ? new Date(task?.expirationTime) : undefined} />
                <UnitLink id={task?.department.id} name={task?.department.name} />
                <Executors users={task ? task.assignee : []} />

                {task?.taskStatus === TaskStatusEnum.IN_PROGRESS && (
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        startIcon={<DoneIcon />}
                        onClick={toggleTaskStatus(false)}
                        sx={{ my: 2 }}
                    >
                        Выполнено
                    </LoadingButton>
                )}

                {task?.taskStatus === TaskStatusEnum.COMPLETED && (
                    <LoadingButton
                        fullWidth
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={toggleTaskStatus(true)}
                        sx={{ my: 2 }}
                    >
                        Открыть
                    </LoadingButton>
                )}
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
