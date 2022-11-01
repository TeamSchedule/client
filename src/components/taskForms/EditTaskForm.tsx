import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

import { API } from "../../api/api";
import CloseFormIcon from "../generic/CloseFormIcon";
import InputTextFormItem from "../inputs/InputTextFormItem";
import InputMultilineTextFormItem from "../inputs/InputMultilineTextFormItem";
import InputDatetimeFormItem from "../inputs/InputDatetimeFormItem";
import BaseForm from "../generic/BaseForm";
import { GetTaskResponseSchema } from "../../api/schemas/responses/tasks";
import { UpdateTaskRequestSchema } from "../../api/schemas/requests/tasks";
import { BaseButton } from "../buttons";

export default function EditTaskForm() {
    const navigate = useNavigate();

    const { taskId } = useParams();

    // task data
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(new Date());
    const [taskClosedStatus, setTaskClosedStatus] = useState(false);
    const [taskTeamName, setTaskTeamName] = useState("");

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isDeleteActionInProgress, setIsDeleteActionInProgress] = useState(false);

    useEffect(() => {
        if (taskId === undefined) {
            return;
        }
        API.tasks.getTaskById(+taskId).then((task: GetTaskResponseSchema) => {
            // Available use full info about task in data
            setTaskName(task.name);
            setTaskDescription(task.description);
            setTaskClosedStatus(task.closed);
            setTaskExpirationDatetime(new Date(task.expirationTime));
            setTaskTeamName(task.team.name);
        });
    }, [taskId]);

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (taskId === undefined) {
            return;
        }
        setIsUpdateActionInProgress(true);

        const updateTaskRequestBody: UpdateTaskRequestSchema = {
            name: taskName,
            description: taskDescription,
            expirationTime: new Date(taskExpirationDatetime).toJSON(),
            closed: taskClosedStatus,
        };

        API.tasks
            .updateTaskById(+taskId, updateTaskRequestBody)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsUpdateActionInProgress(false);
            });
    }

    function onDeleteTaskBtn(event: React.FormEvent) {
        event.preventDefault();
        if (taskId === undefined) {
            return;
        }
        setIsDeleteActionInProgress(true);
        API.tasks
            .deleteTaskById(+taskId)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsDeleteActionInProgress(false);
            });
    }

    return (
        // @ts-ignore
        <BaseForm onSubmit={onSubmit}>
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Изменить задачу</p>
                <CloseFormIcon />
            </div>

            <InputTextFormItem label="Название задачи" value={taskName} handleChange={setTaskName} className="mb-3" />
            <InputMultilineTextFormItem
                label="Подробное описание"
                value={taskDescription}
                handleChange={setTaskDescription}
                className="mb-3"
            />
            <InputDatetimeFormItem
                label="Срок выполнения"
                value={taskExpirationDatetime}
                handleChange={setTaskExpirationDatetime}
            />

            <div>
                <p className="my-1">{taskTeamName === "" ? "персональная задача" : `Команда: ${taskTeamName}`}</p>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={taskClosedStatus}
                            color="success"
                            onChange={() => setTaskClosedStatus(!taskClosedStatus)}
                            name="closed"
                        />
                    }
                    label="Отметить выполненной"
                />
            </div>

            <BaseButton
                text="Сохранить изменения"
                loading={isUpdateActionInProgress}
                color="success"
                className="mt-4"
            />

            <BaseButton
                text="Удалить задачу"
                loading={isDeleteActionInProgress}
                color="danger"
                className="mt-4"
                onClick={onDeleteTaskBtn}
            />
        </BaseForm>
    );
}
