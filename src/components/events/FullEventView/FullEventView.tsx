import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { EventResponseItemSchema } from "../../../schemas/responses/events";

interface FullEventViewProps {}

export default function FullEventView(props: FullEventViewProps) {
    const navigate = useNavigate();

    const { id } = useParams();

    // данные события
    const [event, setEvent] = useState<EventResponseItemSchema>();

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
            <div></div>
        </>
    );
}
