import { useEffect, useState } from "react";
import { API } from "../api/api";
import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { EventStatusEnum } from "../enums/eventsEnums";
import { compareEvent } from "../utils/eventUtils";

export default function useEvents() {
    const [loadingStatus, setLoadingStatus] = useState<boolean>(true);
    const [events, setEvents] = useState<EventResponseItemSchema[]>([]);

    useEffect(() => {
        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {})
            .finally(() => {
                setLoadingStatus(false);
            });
    }, []);

    return { loadingStatus: loadingStatus, events: events.sort(compareEvent) };
}

export function getOnlyCompletedEvents(events: EventResponseItemSchema[]): EventResponseItemSchema[] {
    return events.filter((event) => event.status === EventStatusEnum.COMPLETED);
}

export function getOnlyOpenEvents(events: EventResponseItemSchema[]): EventResponseItemSchema[] {
    return events.filter((event) => event.status === EventStatusEnum.IN_PROGRESS);
}
