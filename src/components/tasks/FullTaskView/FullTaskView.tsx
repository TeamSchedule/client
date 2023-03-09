import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import TaskName from "../common/TaskName";
import Executors from "../common/Executors";
import UnitLink from "../../links/UnitLink/UnitLink";
import SpeedDial from "@mui/material/SpeedDial";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import { TaskStatusEnum, TaskStatusStrings } from "../../../enums/tasksEnums";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { UpdateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import { TaskListPath } from "../../../routes/paths";
import GoBackButton from "../../buttons/GoBackButton";
import EventLink from "../../links/EventLink/EventLink";
import { TaskDescription } from "../common/common";
import Typography from "@mui/material/Typography";
import UploadedFilePreview from "../../files/UploadedFilePreview";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import { FileResponseItemSchema } from "../../../api/schemas/responses/files";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";

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

    // данные задачи
    const [task, setTask] = useState<TaskResponseItemSchema | undefined>(taskData);
    const [taskFiles, setTaskFiles] = useState<FileResponseItemSchema[]>([]);

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

    useEffect(() => {
        if (!id) {
            return;
        }

        API.files.getTaskFiles(+id).then((files: FileResponseItemSchema[]) => {
            setTaskFiles(files);
        });
    }, [taskData, id]);

    const toggleTaskStatus = (open: boolean) => (e: React.MouseEvent) => {
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
            .updateTaskById(+id, updateStatusData)
            .then(() => {
                setIsChangeStatusOk(true);
                if (task) {
                    setTask({ ...task, taskStatus: newStatus });
                }
            })
            .catch(() => {});
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
                {task && <DeadlineAndStatus status={task.taskStatus} endDate={task.expirationTime} />}
                <TaskName name={task?.name} />
                <TaskDescription>{task?.description}</TaskDescription>
                <UnitLink id={task?.department.id} name={task?.department.name} />
                <EventLink event={task?.event} />
                <Executors users={task ? task.assignee : []} />

                {taskFiles.length > 0 && (
                    <>
                        <Typography variant="subtitle1" component="h2" sx={{ fontWeight: "bold", mt: 2, p: 0 }}>
                            Файлы
                        </Typography>
                        {taskFiles.map((file) => (
                            <UploadedFilePreview key={file.id} file={file} eventType={FileOwnerTypesEnum.EVENT} />
                        ))}
                    </>
                )}

                {task?.taskStatus === TaskStatusEnum.IN_PROGRESS && (
                    <LoadingButton
                        fullWidth
                        variant="contained"
                        startIcon={<DoneIcon />}
                        onClick={toggleTaskStatus(false)}
                        sx={{ my: 2 }}
                    >
                        Задача выполнена
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
                        Задача не выполнена
                    </LoadingButton>
                )}

                <GoBackButton to={TaskListPath} buttonText="Вернуться к календарю" />
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
