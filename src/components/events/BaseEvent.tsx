import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api/api";
import { EventResponseItemSchema } from "../../api/schemas/responses/events";
import { CalendarPath, makeCalendarEventLinkById, makeEventLinkById } from "../../routes/paths";
import { EventStatusEnum, EventStatusStrings, EventViewModeStrings } from "../../enums/eventsEnums";
import { EditEventRequestSchema } from "../../api/schemas/requests/events";
import eventStore from "../../store/EventStore";
import BaseEventView from "./views/BaseEventView";

interface BaseEventProps {
    event?: EventResponseItemSchema;
    viewMode?: EventViewModeStrings;
}

function BaseEvent(props: BaseEventProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = useParams();

    // id события
    const id: number = +(urlParams?.id || props.event?.id || 0);

    // Получить данные события, если данные не переданы в пропсе
    const event = props.event || eventStore.getById(id);

    useEffect(() => {}, []);

    const navigateToEdit = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!event) return;

        if (location.pathname.startsWith(CalendarPath)) {
            navigate(makeCalendarEventLinkById(event.id) + "/edit");
        } else {
            navigate(makeEventLinkById(event.id) + "/edit");
        }
    };

    const navigateToFull = (e: React.MouseEvent | undefined) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (!event) return;

        if (location.pathname.startsWith(CalendarPath)) {
            navigate(makeCalendarEventLinkById(event.id));
        } else {
            navigate(makeEventLinkById(event.id));
        }
    };

    const onChangeEventStatus = (open: boolean) => (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!id || !event) return;

        const newStatus: EventStatusStrings = open ? EventStatusEnum.IN_PROGRESS : EventStatusEnum.COMPLETED;
        const newEventData: EditEventRequestSchema = { eventId: id, status: newStatus };

        API.events
            .editEvent(newEventData)
            .then(() => {
                eventStore.update(event.id, { ...event, status: newStatus });
            })
            .catch()
            .finally();
    };

    if (!id || !event) return null;

    return (
        <>
            <BaseEventView
                event={event}
                navigateToEdit={navigateToEdit}
                navigateToFull={navigateToFull}
                toggleEventStatus={onChangeEventStatus}
                viewMode={props.viewMode}
            />
        </>
    );
}

export default observer(BaseEvent);
