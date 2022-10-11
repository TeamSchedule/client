import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { Checkbox, FormControlLabel } from "@mui/material";

import { API } from "../../api/api";
import { selectUserInfo } from "../../features/userInfoSlice";
import { TaskDatetimeInput, TaskDescriptionInput, TaskNameInput } from "./task-form-items";
import CloseFormIcon from "../generic/CloseFormIcon";
import SuccessFormButton from "../buttons/SuccessFormButton";
import RemovalFormButton from "../buttons/RemovalFormButton";
import "./taskForm.css";

export default function EditTaskForm() {
    const navigate = useNavigate();

    const { taskId } = useParams();
    const userInfo = useSelector(selectUserInfo);

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState();
    const [taskClosedStatus, setTaskClosedStatus] = useState(false);
    const [taskTeamName, setTaskTeamName] = useState("");

    useEffect(() => {
        API.tasks.get(taskId).then((data) => {
            // Available use full info about task in data
            setTaskName(data.name);
            setTaskDescription(data.description);
            setTaskClosedStatus(data.closed);
            setTaskExpirationDatetime(new Date(data.expirationTime).toJSON().split(".")[0]);
            setTaskTeamName(data.team.name);
        });
    }, [taskId]);

    function onSubmit(e) {
        e.preventDefault();

        API.tasks
            .update(taskId, {
                name: taskName,
                description: taskDescription,
                expirationTime: new Date(taskExpirationDatetime).toJSON(),
                closed: taskClosedStatus,
            })
            .then(() => {
                navigate(-1);
            });
    }

    function onDeleteTaskBtn(e) {
        e.preventDefault();

        API.tasks.delete(taskId).then(() => {
            navigate(-1);
        });
    }

    return (
        <form className="p-3 editionTaskForm" onSubmit={onSubmit}>
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Изменить задачу</p>
                <CloseFormIcon />
            </div>

            <TaskNameInput value={taskName} setValue={setTaskName} />
            <TaskDescriptionInput value={taskDescription} setValue={setTaskDescription} />
            <TaskDatetimeInput
                value={taskExpirationDatetime}
                setValue={setTaskExpirationDatetime}
            />

            <div>
                <p className="my-1">
                    {taskTeamName === userInfo.username
                        ? "персональная задача"
                        : `Команда: ${taskTeamName}`}
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
                <SuccessFormButton btnText="СОХРАНИТЬ ИЗМЕНЕНИЯ" />
            </div>

            <div className="mt-4">
                <RemovalFormButton btnText="УДАЛИТЬ ЗАДАЧУ" onClick={onDeleteTaskBtn} />
            </div>
        </form>
    );
}
