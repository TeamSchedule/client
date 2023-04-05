import useApiCall from "../../hooks/useApiCall";
import { FileResponseItemSchema } from "../../api/schemas/responses/files";
import { API } from "../../api/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import React, { useEffect, useState } from "react";
import { TaskStatusEnum, TaskStatusStrings } from "../../enums/tasksEnums";
import { UpdateTaskRequestSchema } from "../../api/schemas/requests/tasks";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";
import { makeTaskLinkById } from "../../routes/paths";
import BaseTaskView from "./views/BaseTaskView";

interface BaseTaskProps {
    task?: TaskResponseItemSchema;
    fullView?: boolean;
    setTasks?: (tasks: TaskResponseItemSchema[]) => void;
}

export default function BaseTask(props: BaseTaskProps) {
    const navigate = useNavigate();
    const urlParams = useParams();
    const { state } = useLocation();
    const { isNewCreated = 0 } = state || {}; // была ли задача только что создана

    // если произошел редирект после создания, то true
    const [isNewCreatedStatus, setIsNewCreatedStatus] = useState<boolean>(Boolean(isNewCreated));

    // id задачи
    const id: number = +(urlParams?.id || props.task?.id || 0);

    // данные задачи
    const [task, setTask] = useState<TaskResponseItemSchema | undefined>(props.task);

    // Получить файлы задачи, если режим просмотр подробный
    const getFilesApiCall = useApiCall<FileResponseItemSchema[]>(
        () => API.files.getTaskFiles(id ? +id : 0),
        [],
        [],
        Boolean(props.fullView)
    );

    // Получить данные задачи, если данные не переданы в пропсе
    const getTaskApiCall = useApiCall<TaskResponseItemSchema | undefined>(
        () => API.tasks.getTaskById(id ? +id : 0),
        undefined,
        [],
        Boolean(props.task)
    );

    useEffect(() => {
        if (getTaskApiCall.data) {
            setTask(getTaskApiCall.data);
        }
    }, [getTaskApiCall.data]);

    const navigateToEdit = () => {
        navigate(makeTaskLinkById(id) + "/edit");
    };

    const toggleTaskStatus = (open: boolean) => (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!id) {
            return;
        }

        const newStatus: TaskStatusStrings = open ? TaskStatusEnum.IN_PROGRESS : TaskStatusEnum.COMPLETED;
        const updateStatusData: UpdateTaskRequestSchema = {
            taskId: id,
            status: newStatus,
        };

        API.tasks
            .updateTaskById(updateStatusData)
            .then(() => {
                if (task) {
                    setTask({ ...task, taskStatus: newStatus });
                }
                if (props.setTasks) {
                    // @ts-ignore
                    props.setTasks((prevTasks) => [
                        ...prevTasks.filter((t: TaskResponseItemSchema) => t.id !== task?.id),
                        {
                            ...task,
                            taskStatus: newStatus,
                        },
                    ]);
                }
            })
            .catch(() => {})
            .finally(() => {});
    };

    const handleCloseSuccessfullyCreatedNewSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsNewCreatedStatus(false);
    };

    if (!id || !task) return null;

    return (
        <>
            <BaseTaskView
                task={task}
                files={getFilesApiCall.data}
                navigateToEdit={navigateToEdit}
                toggleTaskStatus={toggleTaskStatus}
                fullMode={props.fullView}
            />
            <SuccessSnackbar handleClose={handleCloseSuccessfullyCreatedNewSnackbar} isOpen={isNewCreatedStatus}>
                Задача создана!
            </SuccessSnackbar>
        </>
    );
}
