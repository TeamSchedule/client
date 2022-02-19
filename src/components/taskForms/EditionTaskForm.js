import React, {useState} from 'react';
import {useNavigate, useOutletContext} from "react-router";
import {useSelector} from "react-redux";

import {API} from "../../api-server/api";
import {selectEditedTask} from "../../features/editedTaskSlice";
import {selectUserInfo} from "../../features/userInfoSlice";
import {SubmitFormButton, TaskDatetimeInput, TaskDescriptionInput, TaskNameInput} from "./task-form-items";
import "./taskForm.css";
import CloseFormIcon from "../generic/CloseFormIcon";
import {Checkbox, FormControlLabel} from "@mui/material";


export default function EditionTaskForm() {
    const navigate = useNavigate();
    const task = useSelector(selectEditedTask);
    const userInfo = useSelector(selectUserInfo);
    const [tasks, setTasks] = useOutletContext();

    const [taskName, setTaskName] = useState(task.title);
    const [taskDescription, setTaskDescription] = useState(task.extendedProps.description);
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(task.end.toString().split('.')[0]);
    const [taskClosedStatus, setTaskClosedStatus] = useState(Boolean(task.extendedProps.closed));

    function onSubmit(e) {
        e.preventDefault();

        API.tasks.updateTask(task.id, {
            name: taskName,
            description: taskDescription,
            expirationTime: new Date(taskExpirationDatetime).toJSON(),
            closed: taskClosedStatus,
        }).then(res => {
            // TODO: update data
            navigate(-1);
        });
    }

    function onDeleteTaskBtn(e) {
        e.preventDefault();

        API.tasks.deleteTask(task.id).then(r => {
            setTasks(tasks.filter(t => +t.id !== +task.id))
            navigate(-1);
        });
    }

    return (
        <form className="p-3 editionTaskForm" onSubmit={onSubmit}>
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Edit task</p>
                <CloseFormIcon />
            </div>

            <TaskNameInput value={taskName} setValue={setTaskName} />
            <TaskDescriptionInput value={taskDescription} setValue={setTaskDescription} />
            <TaskDatetimeInput value={taskExpirationDatetime} setValue={setTaskExpirationDatetime} />

            <div>
                <p className="my-1">
                    {task.extendedProps.groupName === userInfo.username ? "private task" : `Team: ${task.extendedProps.groupName}`}
                </p>

                <FormControlLabel
                    control={
                        <Checkbox checked={taskClosedStatus}
                                  color="success"
                                  onChange={() => setTaskClosedStatus(!taskClosedStatus)}
                                  name="closed" />
                    }
                    label="Mark as Done"
                />
            </div>

            <SubmitFormButton buttonText="Save changes" />

            <button onClick={onDeleteTaskBtn}
                    className="w-100 d-inline-block text-center bg-danger border-0 p-2 rounded deleteTaskBtn">
                Delete task
            </button>
        </form>
    );
}
