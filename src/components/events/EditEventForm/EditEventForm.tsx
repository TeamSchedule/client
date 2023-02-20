import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useState } from "react";
import { API } from "../../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import { EditEventRequestSchema } from "../../../api/schemas/requests/events";
import FormInputItemWrapper from "../../common/FormInputItemWrapper";
import TextField from "@mui/material/TextField";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import DateInput from "../../inputs/DateInput";
import InputColor from "../../inputs/ColorInput";
import FileUpload from "../../files/FileUpload/FileUpload";
import FileList from "../../files/FileList/FileList";
import LoadingButton from "@mui/lab/LoadingButton";
import { EventTypesEnum } from "../../../enums/filesEnums";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";

export default function EditEventForm() {
    const navigate = useNavigate();

    const { id } = useParams();

    // данные нового события
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [color, setColor] = useState<string | undefined>();
    const [attachments, setAttachments] = useState<File[]>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);
    const [inProgressFiles, setInProgressFiles] = useState<boolean>(false);

    const [isEditingFinished, setIsEditingFinished] = useState<boolean>(false);
    const [isEditingError, setIsEditingError] = useState<boolean>(false);
    const [isNewFilesFinished, setIsNewFilesFinished] = useState<boolean>(false);

    function editEventHandler() {
        setInProgress(true);

        const newEventData: EditEventRequestSchema = {
            name: title,
            description: description,
            deadline: deadline || undefined,
        };

        API.events
            .editEvent(newEventData)
            .then(() => {
                setIsEditingFinished(true);
                navigate("..");
            })
            .catch(() => {
                //    TODO: показать сообщение об ошибке - что-то пошло не так
            })
            .finally(() => {
                setInProgress(false);
                navigate("..");
            });
    }

    function onLoadFiles(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        if (!id) return;
        setInProgressFiles(true);

        const saveFilePromises = attachments.map((attachment) =>
            API.files
                .addFile(+id, EventTypesEnum.EVENT, attachment)
                .then(() => {})
                .catch()
                .finally()
        );

        Promise.all(saveFilePromises)
            .then(() => {
                setIsNewFilesFinished(true);
            })
            .catch(() => {})
            .finally(() => {
                setInProgressFiles(false);
            });
    }

    const handleCloseEditSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditingFinished(false);
    };

    const handleCloseNewFilesSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsNewFilesFinished(false);
    };

    const handleCloseErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsEditingError(false);
    };

    return (
        <>
            <div>
                <ScreenHeader text="Изменение события" />

                <FormInputItemWrapper>
                    <TextField
                        required
                        fullWidth
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        label="Название отдела"
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
                    onClick={editEventHandler}
                    loading={inProgress}
                    variant="contained"
                    sx={{ my: 2 }}
                >
                    Сохранить изменения
                </LoadingButton>

                <FormInputItemWrapper className="d-flex align-items-center mt-4">
                    <FileUpload files={attachments} setFiles={setAttachments} />
                </FormInputItemWrapper>

                <FileList
                    files={attachments}
                    detachFile={(excludeFilename: string) =>
                        setAttachments([...attachments.filter((attachment) => attachment.name !== excludeFilename)])
                    }
                />

                {attachments.length > 0 && (
                    <LoadingButton
                        fullWidth
                        onClick={onLoadFiles}
                        loading={inProgressFiles}
                        variant="contained"
                        sx={{ my: 2 }}
                    >
                        Загрузить
                    </LoadingButton>
                )}
            </div>

            <SuccessSnackbar handleClose={handleCloseEditSnackbar} isOpen={isEditingFinished}>
                Изменения сохранены!
            </SuccessSnackbar>
            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isEditingError}>
                Не удалось сохранить изменения!
            </ErrorSnackbar>
            <SuccessSnackbar handleClose={handleCloseNewFilesSnackbar} isOpen={isNewFilesFinished}>
                Файлы загружены!
            </SuccessSnackbar>
        </>
    );
}
