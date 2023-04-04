import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
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
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import GoBackButton from "../../buttons/GoBackButton";
import { makeEventLinkById } from "../../../routes/paths";
import Uploader from "../../files/Uploader";
import DatetimeInput from "../../inputs/DatetimeInput/DatetimeInput";
import { getTimezoneDatetime } from "../../../utils/dateutils";
import useApiCall from "../../../hooks/useApiCall";
import { FileResponseItemSchema } from "../../../api/schemas/responses/files";
import UploadFileList from "../../files/UploadFileList";

export default function EditEventForm() {
    const navigate = useNavigate();

    const { id } = useParams();

    const getFilesApiCall = useApiCall<FileResponseItemSchema[]>(() => API.files.getEventFiles(id ? +id : 0), []);

    // данные события
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [color, setColor] = useState<string>("");

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    const [isEditingFinished, setIsEditingFinished] = useState<boolean>(false);
    const [isEditingError, setIsEditingError] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        API.events
            .getById(+id)
            .then((data: EventResponseItemSchema) => {
                setName(data.name);
                setDescription(data.description);
                setColor(data.color);
                setDeadline(data.endDate ? new Date(data.endDate) : null);
            })
            .catch(() => {})
            .finally(() => {});
    }, [id]);

    function editEventHandler() {
        if (!id) {
            setIsEditingError(true);
            return;
        }

        setInProgress(true);

        const newEventData: EditEventRequestSchema = {
            eventId: +id,
            name: name,
            description: description,
            endDate: deadline ? getTimezoneDatetime(deadline) : undefined,
            color: color === "" ? undefined : color,
        };

        API.events
            .editEvent(newEventData)
            .then(() => {
                setIsEditingFinished(true);
                navigate(makeEventLinkById(+id));
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
            <Card sx={{ minWidth: 280, marginBottom: 1 }}>
                <CardContent sx={{ paddingBottom: 0 }}>
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
                        <MultilineTextInput
                            value={description}
                            handleChange={setDescription}
                            label="Описание события"
                        />
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
                        onClick={editEventHandler}
                        loading={inProgress}
                        variant="contained"
                        sx={{ my: 2 }}
                    >
                        Сохранить изменения
                    </LoadingButton>

                    <UploadFileList files={getFilesApiCall.data} eventType={FileOwnerTypesEnum.EVENT} isEditModeOn />

                    {id && (
                        <Uploader
                            destType={FileOwnerTypesEnum.EVENT}
                            destId={+id}
                            successHandler={() => {
                                navigate(makeEventLinkById(+id));
                            }}
                        />
                    )}

                    <GoBackButton to={id ? makeEventLinkById(+id) : ".."} />
                </CardContent>
            </Card>

            <SuccessSnackbar handleClose={handleCloseEditSnackbar} isOpen={isEditingFinished}>
                Изменения сохранены!
            </SuccessSnackbar>
            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isEditingError}>
                Не удалось сохранить изменения!
            </ErrorSnackbar>
        </>
    );
}
