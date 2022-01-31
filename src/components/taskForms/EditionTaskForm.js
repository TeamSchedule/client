import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";

import {API} from "../../api-server/api";
import {selectEditedTask} from "../../features/editedTaskSlice";
import {selectUserInfo} from "../../features/userInfoSlice";
import {TaskDatetimeInput, TaskDescriptionInput, TaskNameInput} from "./task-form-items";
import "./taskForm.css";
import CloseFormIcon from "../generic/CloseFormIcon";
import {SubmitFormButton} from "./task-form-items";


export default function EditionTaskForm() {
    const navigate = useNavigate();
    const task = useSelector(selectEditedTask);
    const userInfo = useSelector(selectUserInfo);

    const [taskName, setTaskName] = useState(task.title);
    const [taskDescription, setTaskDescription] = useState(task.extendedProps.description);
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(task.end.toJSON().split('.')[0]);

    function onSubmit(e) {
        e.preventDefault();

        let data = {
            "name": taskName,
            "description": taskDescription,
            "expirationTime": taskExpirationDatetime.toJSON(),
        };

        API.tasks.updateTask(data).then(res => {
            // TODO: update data
            navigate(-1);
        });
    }

    function onDeleteTaskBtn() {
        API.tasks.deleteTask(task.id).then(r => {
            navigate(-1);
        });
    }

    return (
        <form className="p-3 editionTaskForm" onSubmit={onSubmit}>
            <div className="d-flex justify-content-between">
                <p className="fw-bold">Edit task</p>
                <CloseFormIcon/>
            </div>

            <TaskNameInput value={taskName} setValue={setTaskName}/>
            <TaskDescriptionInput value={taskDescription} setValue={setTaskDescription}/>
            <TaskDatetimeInput value={taskExpirationDatetime} setValue={setTaskExpirationDatetime}/>

            <div>
                <p className="my-1">
                    {task.extendedProps.groupName === userInfo.username ? "private task" : `Team: ${task.extendedProps.groupName}`}
                </p>
            </div>

            <SubmitFormButton buttonText="Save changes"/>

            <button onClick={onDeleteTaskBtn}
                    className="w-100 d-inline-block text-center bg-danger border-0 p-2 rounded deleteTaskBtn">
                Delete task
            </button>
        </form>
    );
}
