import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../../api/api";
import CloseFormIcon from "../../generic/CloseFormIcon";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { UpdateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeEventLinkById, makeTaskLinkById } from "../../../routes/paths";
import GoBackButton from "../../buttons/GoBackButton";
import Uploader from "../../files/Uploader";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import Box from "@mui/material/Box";
import FullDatetimeInput from "../../inputs/FullDatetimeInput/FullDatetimeInput";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";

export default function EditTaskForm() {
    const navigate = useNavigate();

    const { id } = useParams();

    // task data
    const [taskName, setTaskName] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskExpirationDate, setTaskExpirationDate] = useState<Date>(new Date());
    const [taskUnit, setTaskUnit] = useState<UnitResponseItemSchema | null>(null);

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isDeleteActionInProgress, setIsDeleteActionInProgress] = useState(false);

    useEffect(() => {
        if (id === undefined) {
            return;
        }
        API.tasks.getTaskById(+id).then((task: TaskResponseItemSchema) => {
            // Available use full info about task in data
            setTaskName(task.name);
            setTaskDescription(task.description);
            setTaskExpirationDate(new Date(task.expirationTime));
            setTaskUnit(task.department);
        });
    }, [id]);

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (id === undefined) {
            return;
        }
        setIsUpdateActionInProgress(true);

        const updateTaskRequestBody: UpdateTaskRequestSchema = {
            taskId: +id,
            name: taskName,
            description: taskDescription,
            expirationTime: new Date(taskExpirationDate).toJSON(),
        };

        API.tasks
            .updateTaskById(updateTaskRequestBody)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsUpdateActionInProgress(false);
            });
    }

    function onDeleteTaskBtn(event: React.FormEvent) {
        event.preventDefault();
        if (id === undefined) {
            return;
        }
        setIsDeleteActionInProgress(true);
        API.tasks
            .deleteTaskById(+id)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsDeleteActionInProgress(false);
            });
    }

    return (
        <>
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

            <Box sx={{ mb: 3 }}>
                {/*@ts-ignore*/}
                <FullDatetimeInput value={taskExpirationDate} handleChange={setTaskExpirationDate} />
            </Box>

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

            {id && (
                <Uploader
                    destType={FileOwnerTypesEnum.TASK}
                    destId={+id}
                    successHandler={() => {
                        navigate(makeTaskLinkById(+id));
                    }}
                />
            )}

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

            <GoBackButton to={id ? makeEventLinkById(+id) : ".."} />
        </>
    );
}
