import { API } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { TaskResponseItemSchema } from "../../api/schemas/responses/tasks";
import React from "react";
import { TaskStatusEnum, TaskStatusStrings, TaskViewModeStrings } from "../../enums/tasksEnums";
import { UpdateTaskRequestSchema } from "../../api/schemas/requests/tasks";
import { makeTaskLinkById } from "../../routes/paths";
import BaseTaskView from "./views/BaseTaskView";
import taskStore from "../../store/TaskStore";
import { observer } from "mobx-react-lite";

interface BaseTaskProps {
    task?: TaskResponseItemSchema;
    viewMode?: TaskViewModeStrings;
}

function BaseTask(props: BaseTaskProps) {
    const navigate = useNavigate();
    const urlParams = useParams();

    // id задачи
    const id: number = +(urlParams?.id || props.task?.id || 0);

    // Получить данные задачи, если данные не переданы в пропсе
    const task = props.task || taskStore.getById(id);

    const navigateToEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        navigate(makeTaskLinkById(id) + "/edit");
    };

    const navigateToFull = (e: React.MouseEvent | undefined) => {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        navigate(makeTaskLinkById(id));
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
                navigateToFull={navigateToFull}
                toggleTaskStatus={toggleTaskStatus}
                viewMode={props.viewMode}
            />
        </>
    );
}

export default observer(BaseTask);
