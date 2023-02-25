import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../../api/api";
import CloseFormIcon from "../../generic/CloseFormIcon";
import BaseForm from "../../generic/BaseForm";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { UpdateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import DateInput from "../../inputs/DateInput";
import LoadingButton from "@mui/lab/LoadingButton";

export default function EditTaskForm() {
    const navigate = useNavigate();

    const { taskId } = useParams();

    // task data
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskExpirationDate, setTaskExpirationDate] = useState<Date>(new Date());
    const [taskTeamName, setTaskTeamName] = useState("");

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isDeleteActionInProgress, setIsDeleteActionInProgress] = useState(false);

    useEffect(() => {
        if (taskId === undefined) {
            return;
        }
        API.tasks.getTaskById(+taskId).then((task: TaskResponseItemSchema) => {
            // Available use full info about task in data
            setTaskName(task.name);
            setTaskDescription(task.description);
            setTaskExpirationDate(new Date(task.expirationTime));
            setTaskTeamName(task.department.name);
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
            expirationTime: new Date(taskExpirationDate).toJSON(),
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

            <SimpleTextInput label="Название задачи" value={taskName} handleChange={setTaskName} className="mb-3" />
            <MultilineTextInput
                label="Подробное описание"
                value={taskDescription}
                handleChange={setTaskDescription}
                className="mb-3"
            />

            {/*@ts-ignore*/}
            <DateInput value={taskExpirationDate} handleChange={setTaskExpirationDate} />

            <div>
                <p className="my-1">{taskTeamName === "" ? "персональная задача" : `Команда: ${taskTeamName}`}</p>
            </div>

            <LoadingButton
                onClick={onSubmit}
                loading={isUpdateActionInProgress}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Сохранить изменения
            </LoadingButton>

            <LoadingButton
                onClick={onDeleteTaskBtn}
                loading={isDeleteActionInProgress}
                color="error"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Удалить задачу
            </LoadingButton>
        </BaseForm>
    );
}
