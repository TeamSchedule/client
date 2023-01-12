import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { BaseButton } from "../../buttons";
import { useNavigate } from "react-router-dom";

interface EventListProps {}

export default function EventList(props: EventListProps) {
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    useEffect(() => {
        API.events
            .all()
            .then(() => {})
            .catch(() => {
                // TODO: Что-то пошло не так
            })
            .finally(() => {});
    }, []);

    return (
        <>
            <div>
                <ScreenHeader text="События" />

                <BaseButton
                    text="Создать событие"
                    onClick={() => {
                        navigate("new");
                    }}
                    className="mt-2"
                    color="common"
                />
            </div>
        </>
    );
}
