import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import TaskPreview from "../../tasks/TaskPreview/TaskPreview";
import { eventsData } from "../../../testdata/data";
import { BaseButton } from "../../buttons";
import styles from "./FullEventView.module.scss";

interface FullEventViewProps {}

export default function FullEventView(props: FullEventViewProps) {
    const navigate = useNavigate();

    const { id } = useParams();

    // данные события
    const [event, setEvent] = useState<EventResponseItemSchema>(eventsData[0]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    useEffect(() => {
        /* Получение  данных события */
        if (!id) {
            // TODO: ЧТо-то пошло не так
            return;
        }

        setInProgress(true);
        API.events
            .getById(+id)
            .then((event: any) => {
                setInProgress(false);
                setEvent(event);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally();
    }, []);

    return (
        <>
            <div>
                <h1 className={styles.eventName}>{event?.name}</h1>
                <p>{event?.description}</p>
                <div>
                    <span className="fw-bold">Дата завершения</span>
                    <span className="mx-2">{event?.endDate}</span>
                </div>

                {event?.tasks.length && <span className="fw-bold">Открытые задачи</span>}

                {event?.tasks.map((task) => (
                    <TaskPreview key={task.id} task={task} />
                ))}

                <BaseButton
                    text="Изменить"
                    onClick={() => {
                        navigate("edit");
                    }}
                    className="mt-2"
                    color="common"
                />
            </div>
        </>
    );
}
