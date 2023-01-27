import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../api/api";
import CloseFormIcon from "../generic/CloseFormIcon";
import { Checkbox, FormControlLabel } from "@mui/material";
import InputDatetimeFormItem from "../inputs/InputDatetimeFormItem";
import { getPrevDayDate } from "../../utils/getPrevDayDate";
import BaseForm from "../generic/BaseForm";
import { CreateTaskRequestSchema } from "../../api/schemas/requests/tasks";
import { UnitsResponseItemSchema } from "../../api/schemas/responses/units";
import { BaseButton } from "../buttons";
import MultilineTextInput from "../inputs/MultilineTextInput/MultilineTextInput";
import SimpleTextInput from "../inputs/SimpleTextInput";
import { AuthContext, AuthContextProps } from "../../hooks/useAuth";

interface TeamItemProps {
    groupId: string;
    groupTitle: string;
}

function TeamItem({ groupId, groupTitle }: TeamItemProps) {
    return (
        <option id={groupId} value={groupId}>
            {groupTitle}
        </option>
    );
}

function CreateTaskForm() {
    const navigate = useNavigate();
    const { user } = useContext<AuthContextProps>(AuthContext);

    const [teams, setTeams] = useState<Array<UnitsResponseItemSchema>>([]);

    const { date } = useParams();
    const [taskDescription, setTaskDescription] = useState("");
    const [isPrivateFlag, setIsPrivateFlag] = useState(true);
    const [taskName, setTaskName] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(new Date());
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [isActionInProgress, setIsActionInProgress] = useState(false);

    useEffect(() => {
        API.units.all().then((teams: Array<UnitsResponseItemSchema>) => {
            setTeams(teams);
            if (teams.length > 0) {
                setSelectedTeam(teams[0].id);
            }
        });
    }, []);

    useEffect(() => {
        setTaskExpirationDatetime(getPrevDayDate(date || ""));
    }, [date]);

    function onCreateTaskHandler(event: React.FormEvent) {
        event.preventDefault();
        if (!user) {
            navigate("/");
            return;
        }

        setIsActionInProgress(true);
        // поправляем время, так как toJSON() даст UTC время
        const hoursDiff = taskExpirationDatetime.getHours() - taskExpirationDatetime.getTimezoneOffset() / 60;
        taskExpirationDatetime.setHours(hoursDiff);

        const createTaskData: CreateTaskRequestSchema = {
            name: taskName,
            description: taskDescription,
            expirationTime: taskExpirationDatetime,
            teamId: isPrivateFlag ? null : selectedTeam,
            assigneeId: user.id,
        };

        API.tasks
            .createTask(createTaskData)
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
        // @ts-ignore
        <BaseForm onSubmit={onCreateTaskHandler}>
            <div className="d-flex justify-content-between position-relative">
                <p className="fw-bold">Новая задача</p>
                <CloseFormIcon />
            </div>

            <SimpleTextInput label="Название задачи" value={taskName} handleChange={setTaskName} className="mb-3" />
            <MultilineTextInput
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
                    <select id="taskGroup" name="list1" onChange={(e) => setSelectedTeam(+e.target.value)} required>
                        {teams.map((team: UnitsResponseItemSchema) => (
                            <TeamItem key={team.id} groupTitle={team.name} groupId={team.id.toString()} />
                        ))}
                    </select>
                )}
            </div>
            <BaseButton text="Создать задачу" loading={isActionInProgress} color="common" className="mt-4" />
        </BaseForm>
    );
}

export default CreateTaskForm;
