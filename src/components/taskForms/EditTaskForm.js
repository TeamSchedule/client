import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";

import { API } from "../../api/api";
import { selectUserInfo } from "../../features/userInfoSlice";
import CloseFormIcon from "../generic/CloseFormIcon";
import SuccessFormButton from "../buttons/SuccessFormButton";
import RemovalFormButton from "../buttons/RemovalFormButton";
import InputTextFormItem from "../inputs/InputTextFormItem";
import InputMultilineTextFormItem from "../inputs/InputMultilineTextFormItem";
import InputDatetimeFormItem from "../inputs/InputDatetimeFormItem";
import BaseForm from "../generic/BaseForm";

export default function EditTaskForm() {
    const navigate = useNavigate();

    const { taskId } = useParams();
    const userInfo = useSelector(selectUserInfo);

    // task data
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(new Date());
    const [taskClosedStatus, setTaskClosedStatus] = useState(false);
    const [taskTeamName, setTaskTeamName] = useState(null);

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isDeleteActionInProgress, setIsDeleteActionInProgress] = useState(false);

    useEffect(() => {
        API.tasks.get(taskId).then((data) => {
            // Available use full info about task in data
            setTaskName(data.name);
            setTaskDescription(data.description);
            setTaskClosedStatus(data.closed);
            setTaskExpirationDatetime(new Date(data.expirationTime));
            setTaskTeamName(data.team.name);
        });
    }, [taskId]);

    function onSubmit(e) {
        e.preventDefault();
        setIsUpdateActionInProgress(true);
        API.tasks
            .update(taskId, {
                name: taskName,
                description: taskDescription,
                expirationTime: new Date(taskExpirationDatetime).toJSON(),
                closed: taskClosedStatus,
            })
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsUpdateActionInProgress(false);
            });
    }

    function onDeleteTaskBtn(e) {
        e.preventDefault();
        setIsDeleteActionInProgress(true);
        API.tasks
            .delete(taskId)
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsDeleteActionInProgress(false);
            });
    }

    return (
        <BaseForm>
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Изменить задачу</p>
                <CloseFormIcon />
            </div>

            <InputTextFormItem
                label="Название задачи"
                value={taskName}
                handleChange={setTaskName}
                className="mb-3"
            />
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
                <p className="my-1">
                    {taskTeamName === null ? "персональная задача" : `Команда: ${taskTeamName}`}
                </p>

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

            <div className="mt-4">
                <SuccessFormButton
                    btnText="СОХРАНИТЬ ИЗМЕНЕНИЯ"
                    onClick={onSubmit}
                    loading={isUpdateActionInProgress}
                />
            </div>

            <div className="mt-4">
                <RemovalFormButton
                    btnText="УДАЛИТЬ ЗАДАЧУ"
                    onClick={onDeleteTaskBtn}
                    loading={isDeleteActionInProgress}
                />
            </div>
        </BaseForm>
    );
}
