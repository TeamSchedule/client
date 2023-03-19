import { useEffect, useState } from "react";
import { API } from "../api/api";
import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";
import { FilterTasksParamsSchema } from "../api/schemas/requests/tasks";
import { compareTasks } from "../utils/taskUtils";

interface UseTasksInterface {
    tasks: TaskResponseItemSchema[];
    setTasks: (value: TaskResponseItemSchema[]) => void;
    isTasksLoadingError: boolean;
    isTasksLoadingSuccess: boolean;
    isTasksLoading: boolean;
}

interface useTasksParam {
    filterTaskObject: FilterTasksParamsSchema;
}

export default function useTasks(param: useTasksParam): UseTasksInterface {
    const [isTasksLoading, setIsTasksLoading] = useState<boolean>(true);
    const [isTasksLoadingError, setIsTasksLoadingError] = useState<boolean>(false);
    const [isTasksLoadingSuccess, setIsTasksLoadingSuccess] = useState<boolean>(false);
    const [tasks, setTasks] = useState<TaskResponseItemSchema[]>([]);

    useEffect(() => {
        API.tasks
            .getTasks(param.filterTaskObject)
            .then((data: TaskResponseItemSchema[]) => {
                setTasks(data.sort(compareTasks));
                setIsTasksLoadingSuccess(true);
            })
            .catch(() => {
                setIsTasksLoadingError(true);
            })
            .finally(() => {
                setIsTasksLoading(false);
            });
    }, [param.filterTaskObject]);

    return { isTasksLoading, tasks, setTasks, isTasksLoadingError, isTasksLoadingSuccess };
}
