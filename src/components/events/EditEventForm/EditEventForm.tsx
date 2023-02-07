import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useState } from "react";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { CreateEventRequestSchema } from "../../../api/schemas/requests/events";
import SimpleTextInput from "../../inputs/SimpleTextInput";
import FormInputItemWrapper from "../../common/FormInputItemWrapper";

interface EditEventFormProps {}

export default function EditEventForm(props: EditEventFormProps) {
    const navigate = useNavigate();

    // данные нового события
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [color, setColor] = useState<string | undefined>();
    const [attachments, setAttachments] = useState<object[]>();

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
                setInProgress(false);
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
                <ScreenHeader text="Изменение события" />

                <FormInputItemWrapper>
                    <SimpleTextInput value={title} handleChange={setTitle} label="Название отдела" />
                </FormInputItemWrapper>
            </div>
        </>
    );
}
