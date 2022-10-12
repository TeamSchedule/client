import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

import { API } from "../../api/api";
import { selectUserInfo } from "../../features/userInfoSlice";
import CloseFormIcon from "../generic/CloseFormIcon";
import { Checkbox, FormControlLabel } from "@mui/material";
import SuccessFormButton from "../buttons/SuccessFormButton";
import InputMultilineTextFormItem from "../inputs/InputMultilineTextFormItem";
import InputTextFormItem from "../inputs/InputTextFormItem";
import InputDatetimeFormItem from "../inputs/InputDatetimeFormItem";
import { getPrevDayDate } from "../../utils/getPrevDayDate";
import BaseForm from "../generic/BaseForm";

function TeamItem(props) {
    return (
        <option id={props.groupID} value={props.groupID}>
            {props.groupTitle}
        </option>
    );
}

function CreateTaskForm() {
    const navigate = useNavigate();
    const userInfo = useSelector(selectUserInfo);

    const [groupItems, setGroupItems] = useState([]);
    const [teams, setTeams] = useState([]);

    const { date } = useParams();
    const [taskDescription, setTaskDescription] = useState("");
    const [isPrivateFlag, setIsPrivateFlag] = useState(true);
    const [taskName, setTaskName] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [isActionInProgress, setIsActionInProgress] = useState(false);

    useEffect(() => {
        setTaskExpirationDatetime(getPrevDayDate(date));

        API.teams.all().then((data) => {
            const createdTeams = data["teams"];
            setTeams(createdTeams);
            if (createdTeams.length > 0) {
                setSelectedTeam(createdTeams[0].id);
            }
            setGroupItems(
                createdTeams.map((team) => (
                    <TeamItem
                        id={`group${team.id}`}
                        key={team.id}
                        groupTitle={team.name}
                        groupID={team.id}
                    />
                ))
            );
        });
    }, [date]);

    function onSubmit(e) {
        e.preventDefault();
        setIsActionInProgress(true);
        // поправляем время, так как toJSON() даст UTC время
        const hoursDiff =
            taskExpirationDatetime.getHours() - taskExpirationDatetime.getTimezoneOffset() / 60;
        taskExpirationDatetime.setHours(hoursDiff);
        const expDtString = taskExpirationDatetime.toJSON().split(".")[0];

        API.tasks
            .create({
                name: taskName,
                description: taskDescription,
                expirationTime: expDtString,
                teamId: isPrivateFlag ? null : selectedTeam,
                assigneeId: userInfo.id,
            })
            .then(() => {
                navigate(-1);
            })
            .finally(() => {
                setIsActionInProgress(false);
            });
    }

    function onChangePrivateFlag() {
        if (teams.length > 0) {
            setIsPrivateFlag(!isPrivateFlag);
        }
    }

    return (
        <BaseForm>
            <div className="d-flex justify-content-between position-relative">
                <p className="fw-bold">Новая задача</p>
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
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isPrivateFlag}
                            color="success"
                            onChange={onChangePrivateFlag}
                            name="private"
                        />
                    }
                    label="Создать задачу только для себя"
                />
                {!isPrivateFlag && (
                    <select
                        id="taskGroup"
                        name="list1"
                        onChange={(e) => setSelectedTeam(e.target.value)}
                        required
                    >
                        {groupItems}
                    </select>
                )}
            </div>

            <SuccessFormButton
                btnText="СОЗДАТЬ ЗАДАЧУ"
                onClick={onSubmit}
                loading={isActionInProgress}
            />
        </BaseForm>
    );
}

export default CreateTaskForm;
