import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useState } from "react";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { CreateEventRequestSchema } from "../../../api/schemas/requests/events";
import MultilineTextInput from "../../inputs/MultilineTextInput/MultilineTextInput";
import DateInput from "../../inputs/DateInput";
import InputColor from "../../inputs/ColorInput";
import FormInputItemWrapper from "../../common/FormInputItemWrapper";
import FileUpload from "../../files/FileUpload/FileUpload";
import FileList from "../../files/FileList/FileList";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";

interface CreateEventFormProps {}

export default function CreateEventForm(props: CreateEventFormProps) {
    const navigate = useNavigate();

    // данные нового события
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [color, setColor] = useState<string | undefined>();
    const [attachments, setAttachments] = useState<File[]>([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    function createUnitHandler() {
        setInProgress(true);

        const newEventData: CreateEventRequestSchema = {
            name: title,
            description: description,
            deadline: deadline,
        };

        API.events
            .createEvent(newEventData)
            .then(() => {
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

                <FormInputItemWrapper className="d-flex align-items-center mt-4">
                    <FileUpload files={attachments} setFiles={setAttachments} />
                </FormInputItemWrapper>

                <FileList
                    files={attachments}
                    detachFile={(excludeFilename: string) =>
                        setAttachments([...attachments.filter((attachment) => attachment.name !== excludeFilename)])
                    }
                />

                <LoadingButton
                    fullWidth
                    onClick={createUnitHandler}
                    loading={inProgress}
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Создать
                </LoadingButton>
            </div>
        </>
    );
}
