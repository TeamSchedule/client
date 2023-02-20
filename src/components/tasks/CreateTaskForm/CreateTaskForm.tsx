import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../../api/api";
import CloseFormIcon from "../../generic/CloseFormIcon";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import InputDatetimeFormItem from "../../inputs/InputDatetimeFormItem";
import BaseForm from "../../generic/BaseForm";
import { CreateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { BaseButton } from "../../buttons";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import useAuth from "../../../hooks/useAuth";
import { getPrevDayDate } from "../../../utils/dateutils";
import UnitSelector from "../../selectors/UnitSelector/UnitSelector";
import EventSelector from "../../selectors/EventSelector/EventSelector";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { UserSchema } from "../../../api/schemas/responses/users";
import UsersSelector from "../../selectors/UsersSelector";
import { UserPostsEnum } from "../../../enums/usersEnums";

function CreateTaskForm() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { date } = useParams();

    const [users, setUsers] = useState<UserSchema[]>([]);

    const [taskDescription, setTaskDescription] = useState("");
    const [taskName, setTaskName] = useState("");
    const [taskExpirationDatetime, setTaskExpirationDatetime] = useState(new Date());

    const [isPrivateFlag, setIsPrivateFlag] = useState<boolean>(false); // флаг приватной задачи, в этом случае отдел и исполнители устанавливаются автоматически

    const [selectedEvent, setSelectedEvent] = useState<EventResponseItemSchema | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<UnitResponseItemSchema | null>(null);
    const [selectedExecutors, setSelectedExecutors] = useState<UserSchema[]>([]);

    const [isActionInProgress, setIsActionInProgress] = useState(false);

    useEffect(() => {
        setTaskExpirationDatetime(getPrevDayDate(date || ""));
    }, [date]);

    useEffect(() => {
        if (isPrivateFlag) {
            setSelectedExecutors(user ? [user].slice() : []);
        } else {
            setSelectedExecutors([]);
        }
        setSelectedUnit(null);
    }, [isPrivateFlag]);

    useEffect(() => {
        if (selectedUnit) {
            setSelectedExecutors(selectedUnit?.members.filter((member) => member.post === UserPostsEnum.UNIT_HEAD));
        }
    }, [selectedUnit]);

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
            departmentId: selectedUnit?.id,
            assigneeIds: users.map((user) => user.id),
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

            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={isPrivateFlag} onChange={(e) => setIsPrivateFlag(e.target.checked)} />}
                    label="Создать для себя"
                />
            </FormGroup>

            <EventSelector setInputValue={setSelectedEvent} inputValue={selectedEvent} />
            <UnitSelector setInputValue={setSelectedUnit} inputValue={selectedUnit} disabled={isPrivateFlag} />
            <UsersSelector
                users={selectedUnit ? selectedUnit.members : undefined}
                setInputValue={setSelectedExecutors}
                inputValue={selectedExecutors}
                label="Выберите исполнителей"
                disabled={isPrivateFlag}
            />

            <BaseButton text="Создать задачу" loading={isActionInProgress} color="common" className="mt-4" />
        </BaseForm>
    );
}

export default CreateTaskForm;
