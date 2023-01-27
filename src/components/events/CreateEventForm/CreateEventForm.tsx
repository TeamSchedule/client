import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useState } from "react";
import { BaseButton } from "../../buttons";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { CreateEventRequestSchema } from "../../../api/schemas/requests/events";

interface CreateEventFormProps {}

export default function CreateEventForm(props: CreateEventFormProps) {
    const navigate = useNavigate();

    // данные нового события
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [deadline, setDeadline] = useState<Date>(new Date());

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
                <ScreenHeader text="Создание события" />

                <BaseButton
                    text="Создать"
                    onClick={createUnitHandler}
                    className="mt-2"
                    color="common"
                    loading={inProgress}
                />
            </div>
        </>
    );
}
