import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { BaseButton } from "../../buttons";
import { useNavigate } from "react-router-dom";
import { MenuItem, Select } from "@mui/material";
import EventPreview from "../EventPreview/EventPreview";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { eventsData } from "../../../testdata/data";

enum EventFilterEnum {
    All = 0,
    InProgress = 1,
    Done = 2,
    Closed = 3,
}

interface EventListProps {}

export default function EventList(props: EventListProps) {
    const navigate = useNavigate();

    // список отображаемых событий
    const [events, setEvents] = useState<EventResponseItemSchema[]>(eventsData);

    // параметр, по которому фильтруются собыития
    const [eventFilterValue, setEventFilterValue] = useState(EventFilterEnum.InProgress);

    // статус загрузки
    const [inProgress, setInProgress] = useState<boolean>(false);

    useEffect(() => {
        setInProgress(true);

        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {
                // TODO: Что-то пошло не так
            })
            .finally(() => {
                setInProgress(false);
            });
    }, []);

    return (
        <>
            <div>
                <ScreenHeader text="События" />
                <Select
                    id="event-filter"
                    value={eventFilterValue}
                    onChange={(e) => {
                        setEventFilterValue(e.target.value as number);
                    }}
                >
                    <MenuItem value={EventFilterEnum.All}>Все</MenuItem>
                    <MenuItem value={EventFilterEnum.InProgress}>Активные</MenuItem>
                    <MenuItem value={EventFilterEnum.Done}>Завершенные</MenuItem>
                    <MenuItem value={EventFilterEnum.Closed}>Отмененные</MenuItem>
                </Select>

                {events.map((event) => (
                    <EventPreview key={event.id} event={event} />
                ))}

                <BaseButton
                    text="Новое событие"
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
