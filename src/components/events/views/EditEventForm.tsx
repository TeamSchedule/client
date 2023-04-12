import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { EditEventRequestSchema } from "../../../api/schemas/requests/events";
import FormInputItemWrapper from "../../common/FormInputItemWrapper";
import TextField from "@mui/material/TextField";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import InputColor from "../../inputs/ColorInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import Uploader from "../../files/Uploader";
import DatetimeInput from "../../inputs/DatetimeInput/DatetimeInput";
import { getTimezoneDatetime } from "../../../utils/dateutils";
import UploadFileList from "../../files/UploadFileList";
import { observer } from "mobx-react-lite";
import eventStore from "../../../store/EventStore";
import { EventActionsProps, EventViewProps } from "./interfaces";

interface EditEventFormProps extends EventViewProps, EventActionsProps {}

function EditEventForm(props: EditEventFormProps) {
    const event: EventResponseItemSchema = props.event;

    useEffect(() => {
        if (event) {
            setName(event.name);
            setDescription(event.description);
            setColor(event.color);
            setDeadline(event.endDate ? new Date(event.endDate) : null);
        }
    }, [event]);

    // данные события
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [color, setColor] = useState<string>("");

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [isEditingFinished, setIsEditingFinished] = useState<boolean>(false);
    const [isEditingError, setIsEditingError] = useState<boolean>(false);

    function editEventHandler() {
        setInProgress(true);
        const newEventData: EditEventRequestSchema = {
            eventId: event.id,
            name: name,
            description: description,

            endDate: deadline ? getTimezoneDatetime(deadline) : undefined,
            color: color === "" ? undefined : color,
        };

        API.events
            .editEvent(newEventData)
            .then(() => {
                setIsEditingFinished(true);
                // eventStore.update(event.id, { ...event, ...newEventData });
                eventStore.prefetchData();
                props.navigateToFull(undefined);
            })
            .catch(() => {
                setIsEditingError(true);
            })
            .finally(() => {
                setInProgress(false);
            });
    }

    const handleCloseEditSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditingFinished(false);
    };

    const handleCloseErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditingError(false);
    };

    return (
        <>
            <ScreenHeader text="Изменение события" />

            <FormInputItemWrapper>
                <TextField
                    required
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

            <LoadingButton fullWidth onClick={editEventHandler} loading={inProgress} variant="contained" sx={{ my: 2 }}>
                Сохранить изменения
            </LoadingButton>

            <UploadFileList files={event.files} eventType={FileOwnerTypesEnum.EVENT} isEditModeOn />

            <Uploader
                destType={FileOwnerTypesEnum.EVENT}
                destId={event.id}
                successHandler={() => props.navigateToFull(undefined)}
            />

            <SuccessSnackbar handleClose={handleCloseEditSnackbar} isOpen={isEditingFinished}>
                Изменения сохранены!
            </SuccessSnackbar>
            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isEditingError}>
                Не удалось сохранить изменения!
            </ErrorSnackbar>
        </>
    );
}

export default observer(EditEventForm);
