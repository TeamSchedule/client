import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../api/api";
import { EventResponseItemSchema } from "../../api/schemas/responses/events";
import { makeEventLinkById } from "../../routes/paths";
import { EventStatusEnum, EventStatusStrings } from "../../enums/eventsEnums";
import { EditEventRequestSchema } from "../../api/schemas/requests/events";
import eventStore from "../../store/EventStore";
import BaseEventView from "./views/BaseEventView";

interface BaseEventProps {
    event?: EventResponseItemSchema;
    fullView?: boolean;
}

function BaseEvent(props: BaseEventProps) {
    const navigate = useNavigate();
    const urlParams = useParams();

    // id события
    const id: number = +(urlParams?.id || props.event?.id || 0);

    // Получить данные задачи, если данные не переданы в пропсе
    const event = props.event || eventStore.getById(id);

    const navigateToEdit = () => {
        navigate(makeEventLinkById(id) + "/edit");
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
                // getEventApiCall.setData({ ...event, status: newStatus });
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
                toggleEventStatus={onChangeEventStatus}
                fullMode={props.fullView}
            />
        </>
    );
}

export default observer(BaseEvent);
