import useApiCall from "../../hooks/useApiCall";
import { API } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import React from "react";
import { TaskStatusEnum, TaskStatusStrings } from "../../enums/tasksEnums";
import { UpdateTaskRequestSchema } from "../../api/schemas/requests/tasks";
import { makeTaskLinkById } from "../../routes/paths";
import BaseTaskView from "./views/BaseTaskView";
import taskStore from "../../store/TaskStore";

interface BaseTaskProps {
    task?: TaskResponseItemSchema;
    fullView?: boolean;
}

export default function BaseTask(props: BaseTaskProps) {
    const navigate = useNavigate();
    const urlParams = useParams();

    // id задачи
    const id: number = +(urlParams?.id || props.task?.id || 0);

    // Получить данные задачи, если данные не переданы в пропсе
    const getTaskApiCall = useApiCall<TaskResponseItemSchema | undefined>(
        () => API.tasks.getTaskById(id),
        undefined,
        [id],
        Boolean(!props.task)
    );
    const task = props.task || getTaskApiCall.data;

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
                    getTaskApiCall.setData({ ...task, taskStatus: newStatus });
                    taskStore.update(task.id, { ...task, taskStatus: newStatus });
                }
            })
            .catch(() => {})
            .finally(() => {});
    };

    if (!id || !task) return null;

    return (
        <>
            <BaseTaskView
                task={task}
                navigateToEdit={navigateToEdit}
                toggleTaskStatus={toggleTaskStatus}
                fullMode={props.fullView}
            />
        </>
    );
}
