import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateEventRequestSchema } from "../../../api/schemas/requests/events";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import DateInput from "../../inputs/DateInput";
import InputColor from "../../inputs/ColorInput";
import FormInputItemWrapper from "../../common/FormInputItemWrapper";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import { API } from "../../../api/api";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import { makeEventLinkById } from "../../../routes/paths";
import { CreateEventResponseSchema } from "../../../api/schemas/responses/events";

export default function CreateEventForm() {
    const navigate = useNavigate();

    // данные нового события
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [color, setColor] = useState<string | undefined>();

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [isCreatingError, setIsCreatingError] = useState<boolean>(false);

    function createEventHandler() {
        setInProgress(true);

        const newEventData: CreateEventRequestSchema = {
            name: title,
            description: description,
            endDate: deadline,
            color: color,
        };

        API.events
            .createEvent(newEventData)
            .then((data: CreateEventResponseSchema) => {
                navigate(makeEventLinkById(data.id), { state: { created: 1 } });
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
                    <DateInput value={deadline} handleChange={setDeadline} />
                </FormInputItemWrapper>

                <FormInputItemWrapper className="d-flex align-items-center">
                    <span>Цвет отображения задач</span>
                    <InputColor color={color} setColor={setColor} className="mx-3" />
                </FormInputItemWrapper>

                <LoadingButton
                    fullWidth
                    disabled={title.length === 0}
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
