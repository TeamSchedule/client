import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API } from "../../../api/api";
import CloseFormIcon from "../../generic/CloseFormIcon";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { CreateTaskRequestSchema } from "../../../api/schemas/requests/tasks";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import useAuth from "../../../hooks/useAuth";
import { getPrevDayDate, getTimezoneDatetime } from "../../../utils/dateutils";
import UnitSelector from "../../selectors/UnitSelector/UnitSelector";
import EventSelector from "../../selectors/EventSelector/EventSelector";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { UserSchema } from "../../../api/schemas/responses/users";
import UsersSelector from "../../selectors/UsersSelector";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import TextHelp from "../../TextHelp/TextHelp";
import { makeTaskLinkById, startPagePath } from "../../../routes/paths";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import DatetimeInput from "../../inputs/DatetimeInput/DatetimeInput";
import useApiCall from "../../../hooks/useApiCall";
import taskStore from "../../../store/TaskStore";

function CreateTaskForm() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { date } = useParams();

    const getUsersApiCall = useApiCall<UserSchema[]>(() => API.users.all(), []);

    const [taskDescription, setTaskDescription] = useState<string>("");
    const [taskName, setTaskName] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);

    const [isPrivateFlag, setIsPrivateFlag] = useState<boolean>(false); // флаг приватной задачи, в этом случае отдел и исполнители устанавливаются автоматически

    const [selectedEvent, setSelectedEvent] = useState<EventResponseItemSchema | null>(null);
    const [selectedUnit, setSelectedUnit] = useState<UnitResponseItemSchema | null>(null);
    const [selectedExecutors, setSelectedExecutors] = useState<UserSchema[]>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [isCreatingError, setIsCreatingError] = useState<boolean>(false);

    useEffect(() => {
        // если в форму пришли из календаря или другого перенаправления для быстрого создания задачи
        if (date) {
            setDeadline(getPrevDayDate(date || ""));
        }
    }, [date]);

    useEffect(() => {
        if (isPrivateFlag) {
            setSelectedExecutors(user ? [user].slice() : []);
        } else {
            setSelectedExecutors([]);
        }
        setSelectedUnit(null);
    }, [user, isPrivateFlag]);

    useEffect(() => {
        if (selectedUnit) {
            setSelectedExecutors([selectedUnit?.admin]);
        }
    }, [selectedUnit]);

    function onCreateTaskHandler(event: React.FormEvent) {
        event.preventDefault();
        if (!user) {
            navigate(startPagePath);
            return;
        }

        if (!deadline) return;

        setInProgress(true);
        const createTaskData: CreateTaskRequestSchema = {
            name: taskName,
            description: taskDescription,
            expirationTime: getTimezoneDatetime(deadline),
            departmentId: selectedUnit?.id,
            assigneeIds: selectedExecutors.map((user) => user.id),
            eventId: selectedEvent?.id,
        };

        API.tasks
            .createTask(createTaskData)
            .then((task: TaskResponseItemSchema) => {
                taskStore.update(task.id, task);
                navigate(makeTaskLinkById(task.id), { state: { created: true } });
            })
            .catch(() => {
                setIsCreatingError(true);
            })
            .finally(() => {
                setInProgress(false);
            });
    }

    const handleCloseErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingError(false);
    };

    return (
        <>
            <div className="d-flex justify-content-between position-relative">
                <p className="fw-bold">Новая задача</p>
                <CloseFormIcon />
            </div>

            <TextField
                required
                fullWidth
                variant="outlined"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                label="Название задачи"
                sx={{ mb: 2 }}
            />

            <TextField
                id="outlined-multiline-static"
                label="Подробное описание"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Box sx={{ mb: 3 }}>
                <DatetimeInput datetime={deadline} setDatetime={setDeadline} />
            </Box>

            <FormGroup row sx={{ alignItems: "center" }}>
                <FormControlLabel
                    control={<Switch checked={isPrivateFlag} onChange={(e) => setIsPrivateFlag(e.target.checked)} />}
                    label="Создать для себя"
                />
                <TextHelp title="Приватные задачи не отображаются в отделе, только Вы будете их видеть" />
            </FormGroup>

            <Box sx={{ mb: 2 }}>
                <EventSelector setInputValue={setSelectedEvent} inputValue={selectedEvent} />
            </Box>

            <Box sx={{ mb: 2 }}>
                <UnitSelector setInputValue={setSelectedUnit} inputValue={selectedUnit} disabled={isPrivateFlag} />
            </Box>

            <UsersSelector
                users={getUsersApiCall.data}
                setInputValue={setSelectedExecutors}
                inputValue={selectedExecutors}
                label="Выберите исполнителей"
                disabled={isPrivateFlag}
            />

            <LoadingButton
                fullWidth
                disabled={taskName.length === 0 || !deadline}
                onClick={onCreateTaskHandler}
                loading={inProgress}
                variant="contained"
                sx={{ mt: 3 }}
            >
                Создать
            </LoadingButton>

            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isCreatingError}>
                Не удалось создать событие!
            </ErrorSnackbar>
        </>
    );
}

export default CreateTaskForm;
