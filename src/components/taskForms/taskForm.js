import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

import {API} from "../../api/api";
import {selectUserInfo} from "../../features/userInfoSlice";
import CloseFormIcon from "../generic/CloseFormIcon";
import {SubmitFormButton, TaskDatetimeInput, TaskDescriptionInput, TaskNameInput} from "./task-form-items";
import "./taskForm.css";


function TeamItem(props) {
    return (
        <option id={props.groupID}
                value={props.groupID}>
            {props.groupTitle}
        </option>
    );
}


function TaskForm() {
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo);

    const [groupItems, setGroupItems] = useState([]);

    const {date} = useParams();
    const [taskDescription, setTaskDescription] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(date ? date.split('.')[0] : new Date().toJSON().split('.')[0]);
    const [selectedTeam, setSelectedTeam] = useState();

    useEffect(() => {
        API.teams.all().then(data => {
            let val = data;
            setGroupItems(val.map(
                (group) => <TeamItem id={`group${group.id}`} key={group.id} groupTitle={group.name}
                                     groupID={group.id} />
            ));
            setSelectedTeam(val[0].id);
        });
    }, []);

    function onSubmit(e) {
        e.preventDefault();

        let data = {
            "name": taskName,
            "description": taskDescription,
            "expirationTime": new Date(taskExpirationDatetime).toJSON(),
            "teamId": selectedTeam,
        };

        API.tasks.createTask(data).then(res => {
            navigate(-1);
        });
    }


    return (
        <form className="p-3 creationTaskForm" onSubmit={onSubmit}>
            <div className="d-flex justify-content-between position-relative">
                <p className="fw-bold">New task</p>
                <CloseFormIcon />
            </div>

            <TaskNameInput value={taskName} setValue={setTaskName} />
            <TaskDescriptionInput value={taskDescription} setValue={setTaskDescription} />
            <TaskDatetimeInput value={taskExpirationDatetime} setValue={setTaskExpirationDatetime} />

            <div>
                <p className="my-1">
                    <label htmlFor="taskGroup">Выберите команду из списка. (`{userInfo.username}` если
                        приватная)</label>
                </p>
                <select id="taskGroup" name="list1" onChange={e => setSelectedTeam(e.target.value)} required>
                    {groupItems}
                </select>
            </div>

            <SubmitFormButton buttonText="Create task" />
        </form>
    );
}

export default TaskForm;
