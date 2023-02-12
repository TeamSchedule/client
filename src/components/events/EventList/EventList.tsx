import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { BaseButton } from "../../buttons";
import { useNavigate } from "react-router-dom";
import EventPreview from "../EventPreview/EventPreview";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { eventsData } from "../../../testdata/data";
import PlainSelector from "../../selectors/PlainSelector";

enum EventFilterEnum {
    All = 0,
    InProgress = 1,
    Done = 2,
    Closed = 3,
}

const EventFilters: Array<[string, string]> = [
    [EventFilterEnum.All.toString(), "Все"],
    [EventFilterEnum.InProgress.toString(), "Активные"],
    [EventFilterEnum.Done.toString(), "Завершенные"],
    [EventFilterEnum.Closed.toString(), "Отмененные"],
];

interface EventListProps {}

export default function EventList(props: EventListProps) {
    const navigate = useNavigate();

    // список отображаемых событий
    const [events, setEvents] = useState<EventResponseItemSchema[]>(eventsData);

    // параметр, по которому фильтруются собыития
    const [eventFilterValue, setEventFilterValue] = useState(EventFilterEnum.InProgress);

    useEffect(() => {
        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {
                // TODO: Что-то пошло не так
            })
            .finally(() => {});
    }, []);

    return (
        <>
            <div>
                <div className="d-flex justify-content-center">
                    <ScreenHeader text="События" />

                    <PlainSelector
                        filterValue={eventFilterValue}
                        setFilterValue={setEventFilterValue}
                        id="event-filter"
                        filterObj={EventFilters}
                    />
                </div>

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
