import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateEventRequestSchema } from "../../../api/schemas/requests/events";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import InputColor from "../../inputs/ColorInput";
import FormInputItemWrapper from "../../common/FormInputItemWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { API } from "../../../api/api";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import { CreateNewEventCalendarPath, makeCalendarEventLinkById, makeEventLinkById } from "../../../routes/paths";
import { CreateEventResponseSchema, EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { getRandomColor } from "../../../utils/colorUtils";
import { getTimezoneDatetime } from "../../../utils/dateutils";
import DatetimeInput from "../../inputs/DatetimeInput/DatetimeInput";
import eventStore from "../../../store/EventStore";

export default function CreateEventForm() {
    const navigate = useNavigate();
    const location = useLocation();

    // данные нового события
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [color, setColor] = useState<string>(getRandomColor());

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [isCreatingError, setIsCreatingError] = useState<boolean>(false);

    function createEventHandler() {
        if (!deadline) return;
        setInProgress(true);

        const newEventData: CreateEventRequestSchema = {
            name: title,
            description: description,
            endDate: getTimezoneDatetime(deadline),
            color: color === "" ? undefined : color,
        };

        API.events
            .createEvent(newEventData)
            .then((data: CreateEventResponseSchema) => {
                API.events.getById(data.id).then((event: EventResponseItemSchema) => {
                    eventStore.update(event.id, event);
                    if (location.pathname === CreateNewEventCalendarPath) {
                        navigate(makeCalendarEventLinkById(data.id));
                    } else {
                        navigate(makeEventLinkById(data.id), { state: { created: 1 } });
                    }
                });
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
            <div>
                <ScreenHeader text="Создание события" />

                <FormInputItemWrapper>
                    <TextField
                        size="small"
                        required
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Название события"
                    />
                </FormInputItemWrapper>

                <FormInputItemWrapper>
                    <MultilineTextInput value={description} handleChange={setDescription} label="Описание события" />
                </FormInputItemWrapper>

                <FormInputItemWrapper>
                    <DatetimeInput datetime={deadline} setDatetime={setDeadline} />
                </FormInputItemWrapper>

                <FormInputItemWrapper className="d-flex align-items-center">
                    <span>Цвет отображения задач</span>
                    <InputColor color={color} setColor={setColor} className="mx-3" />
                </FormInputItemWrapper>

                <LoadingButton
                    fullWidth
                    disabled={title.length === 0 || !deadline}
                    onClick={createEventHandler}
                    loading={inProgress}
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Создать
                </LoadingButton>
            </div>

            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isCreatingError}>
                Не удалось создать событие!
            </ErrorSnackbar>
        </>
    );
}
