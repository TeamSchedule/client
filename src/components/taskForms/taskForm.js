import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";

import {API} from "../../api/api";
import {selectUserInfo} from "../../features/userInfoSlice";
import CloseFormIcon from "../generic/CloseFormIcon";
import {SubmitFormButton, TaskDatetimeInput, TaskDescriptionInput, TaskNameInput} from "./task-form-items";
import "./taskForm.css";
import {Checkbox, FormControlLabel} from "@mui/material";


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
    const [teams, setTeams] = useState([]);

    const {date} = useParams();
    const [taskDescription, setTaskDescription] = useState("");
    const [isPrivateFlag, setIsPrivateFlag] = useState(true);
    const [taskName, setTaskName] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(date ? date.split('.')[0] : new Date().toJSON().split('.')[0]);
    const [selectedTeam, setSelectedTeam] = useState(0);

    useEffect(() => {
        API.teams.all().then(data => {
            const createdTeams = data["teams"];
            setTeams(createdTeams);
            if (createdTeams.length > 0) {
                setSelectedTeam(createdTeams[0].id);
            }
            setGroupItems(createdTeams.map(
                (team) => <TeamItem id={`group${team.id}`}
                                    key={team.id}
                                    groupTitle={team.name}
                                    groupID={team.id}/>
            ));
        });
    }, []);

    function onSubmit(e) {
        e.preventDefault();
        let expDate = new Date(taskExpirationDatetime);
        expDate.setDate(new Date(date).getDate() + 1);

        API.tasks.create({
            "name": taskName,
            "description": taskDescription,
            "expirationTime": expDate.toJSON(),
            "teamId": isPrivateFlag ? null : selectedTeam,
            "assigneeId": userInfo.id
        }).then(() => {
            navigate(-1);
        });
    }

    function onChangePrivateFlag() {
        if (teams.length > 0) {
            setIsPrivateFlag(!isPrivateFlag);
        }
    }

    return (
        <form className="p-3 creationTaskForm" onSubmit={onSubmit}>
            <div className="d-flex justify-content-between position-relative">
                <p className="fw-bold">?????????? ????????????</p>
                <CloseFormIcon/>
            </div>

            <TaskNameInput value={taskName} setValue={setTaskName}/>
            <TaskDescriptionInput value={taskDescription} setValue={setTaskDescription}/>
            <TaskDatetimeInput value={taskExpirationDatetime} setValue={setTaskExpirationDatetime}/>

            <div>
                <FormControlLabel
                    control={
                        <Checkbox checked={isPrivateFlag}
                                  color="success"
                                  onChange={onChangePrivateFlag}
                                  name="private"/>
                    }
                    label="?????????????? ???????????? ???????????? ?????? ????????"
                />
                {
                    !isPrivateFlag &&
                    <select id="taskGroup" name="list1" onChange={e => setSelectedTeam(e.target.value)} required>
                        {groupItems}
                    </select>
                }

            </div>

            <SubmitFormButton buttonText="?????????????? ????????????"/>
        </form>
    );
}

export default TaskForm;
