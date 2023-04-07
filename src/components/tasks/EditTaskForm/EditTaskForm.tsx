import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../../api/api";
import { UpdateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { makeTaskLinkById } from "../../../routes/paths";
import Uploader from "../../files/Uploader";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import Box from "@mui/material/Box";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import { getTimezoneDatetime } from "../../../utils/dateutils";
import DatetimeInput from "../../inputs/DatetimeInput/DatetimeInput";
import UploadFileList from "../../files/UploadFileList";
import EventSelector from "../../selectors/EventSelector/EventSelector";
import UnitSelector from "../../selectors/UnitSelector/UnitSelector";
import UsersSelector from "../../selectors/UsersSelector";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { UserSchema } from "../../../api/schemas/responses/users";
import { observer } from "mobx-react-lite";
import taskStore from "../../../store/TaskStore";

function EditTaskForm() {
    const navigate = useNavigate();

    const urlParams = useParams();
    const id: number = +(urlParams.id || 0);

    // данные задачи
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {}, [taskStore.getById(id)]);
    const task = taskStore.getById(id);

    // task data
    const [taskName, setTaskName] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);

    const [selectedEvent, setSelectedEvent] = useState<EventResponseItemSchema | undefined>(undefined);
    const [selectedUnit, setSelectedUnit] = useState<UnitResponseItemSchema | undefined>(undefined);
    const [selectedExecutors, setSelectedExecutors] = useState<UserSchema[]>([]);

    // circular loaders
    const [isUpdateActionInProgress, setIsUpdateActionInProgress] = useState(false);
    const [isDeleteActionInProgress, setIsDeleteActionInProgress] = useState(false);

    useEffect(() => {
        if (task !== undefined) {
            setTaskName(task.name);
            setTaskDescription(task.description);
            setDeadline(task.expirationTime ? new Date(task.expirationTime) : null);
            setSelectedUnit(task.department);
            setSelectedEvent(task.event);
            setSelectedExecutors(task.assignee);
        }
    }, [task]);

    function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (id === undefined) {
            return;
        }
        if (!deadline) return;
        setIsUpdateActionInProgress(true);

        const updateTaskRequestBody: UpdateTaskRequestSchema = {
            taskId: +id,
            name: taskName,
            description: taskDescription,
            expirationTime: getTimezoneDatetime(deadline),
            eventId: selectedEvent?.id,
            departmentId: selectedUnit?.id,
            assigneeIds: selectedExecutors.map((u) => u.id),
        };

        API.tasks
            .updateTaskById(updateTaskRequestBody)
            .then(() => {
                navigate(makeTaskLinkById(+id));
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
            <p className="fw-bold">Изменить задачу</p>

            <SimpleTextInput label="Название задачи" value={taskName} handleChange={setTaskName} className="mb-3" />
            <MultilineTextInput
                label="Подробное описание"
                value={taskDescription}
                handleChange={setTaskDescription}
                className="mb-3"
            />

            {deadline && (
                <Box sx={{ mb: 3 }}>
                    <DatetimeInput datetime={deadline} setDatetime={setDeadline} />
                </Box>
            )}

            <Box sx={{ mb: 2 }}>
                <EventSelector setInputValue={setSelectedEvent} inputValue={selectedEvent || null} />
            </Box>

            <Box sx={{ mb: 2 }}>
                <UnitSelector setInputValue={setSelectedUnit} inputValue={selectedUnit || null} />
            </Box>

            <UsersSelector
                setInputValue={setSelectedExecutors}
                inputValue={selectedExecutors}
                label="Выберите исполнителей"
            />

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

            <UploadFileList files={task?.files || []} eventType={FileOwnerTypesEnum.TASK} isEditModeOn />

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
        </>
    );
}

export default observer(EditTaskForm);
