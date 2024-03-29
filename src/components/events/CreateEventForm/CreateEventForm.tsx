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
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { getRandomColor } from "../../../utils/colorUtils";
import { getTimezoneDatetime } from "../../../utils/dateutils";
import DatetimeInput from "../../inputs/DatetimeInput/DatetimeInput";
import eventStore from "../../../store/EventStore";
import CloseFormIcon from "../../generic/CloseFormIcon";
import calendarStore from "../../../store/CalendarStore";

export default function CreateEventForm() {
    const navigate = useNavigate();
    const location = useLocation();

    // данные нового события
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(calendarStore.getChosenDate);
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
            .then((event: EventResponseItemSchema) => {
                eventStore.update(event.id, event);
                if (location.pathname === CreateNewEventCalendarPath) {
                    navigate(makeCalendarEventLinkById(event.id));
                } else {
                    navigate(makeEventLinkById(event.id), { state: { created: 1 } });
                }
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
                <div className="d-flex justify-content-between position-relative">
                    <p className="fw-bold">Новое событие</p>
                    <CloseFormIcon />
                </div>

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
