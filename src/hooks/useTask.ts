import { useEffect, useState } from "react";
import { API } from "../api/api";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";
import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";

export interface UseTaskInterface {
    task: TaskResponseItemSchema | undefined;
    setTask: (value: TaskResponseItemSchema) => void;
    taskLoadingStatus: LoadingStatusStrings;
    closeSnackbar: () => void;
}

export default function useTask(id: number): UseTaskInterface {
    const [taskLoadingStatus, setTaskLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);
    const [task, setTask] = useState<TaskResponseItemSchema | undefined>(undefined);

    function closeSnackbar() {
        setTaskLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        if (!id) {
            return;
        }

        API.tasks
            .getTaskById(id)
            .then((task: TaskResponseItemSchema) => {
                setTask(task);
                setTaskLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setTaskLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {});
    }, [id]);

    return { taskLoadingStatus, task, setTask, closeSnackbar };
}
