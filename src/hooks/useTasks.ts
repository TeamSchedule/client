import { useEffect, useState } from "react";
import { API } from "../api/api";
import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";
import { FilterTasksParamsSchema } from "../api/schemas/requests/tasks";
import { compareTasks } from "../utils/taskUtils";
import { TaskStatusEnum } from "../enums/tasksEnums";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";

interface UseTasksInterface {
    tasks: TaskResponseItemSchema[];
    tasksLoadingStatus: LoadingStatusStrings;
    closeSnackbar: () => void;
}

interface useTasksParam {
    filterTaskObject: FilterTasksParamsSchema;
}

export default function useTasks(param: useTasksParam): UseTasksInterface {
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([]);
    const [tasksLoadingStatus, setTasksLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);

    function closeSnackbar() {
        setTasksLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        API.tasks
            .getTasks(param.filterTaskObject)
            .then((data: TaskResponseItemSchema[]) => {
                setTasks(data.sort(compareTasks));
                setTasksLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setTasksLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {
            });
    }, [param.filterTaskObject]);

    return { tasks, tasksLoadingStatus, closeSnackbar };
}

export function getOnlyCompletedTasks(tasks: TaskResponseItemSchema[]): TaskResponseItemSchema[] {
    return tasks.filter((task) => task.taskStatus === TaskStatusEnum.COMPLETED);
}

export function getOnlyOpenTasks(events: TaskResponseItemSchema[]): TaskResponseItemSchema[] {
    return events.filter((task) => task.taskStatus === TaskStatusEnum.IN_PROGRESS);
}
