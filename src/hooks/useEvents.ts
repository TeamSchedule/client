import { useEffect, useState } from "react";
import { API } from "../api/api";
import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { EventStatusEnum } from "../enums/eventsEnums";
import { compareEvent } from "../utils/eventUtils";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";

export interface UseEventsInterface {
    events: EventResponseItemSchema[];
    eventsLoadingStatus: LoadingStatusStrings;
    closeSnackbar: () => void;
}

export default function useEvents(): UseEventsInterface {
    const [eventsLoadingStatus, setEventsLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);
    const [events, setEvents] = useState<EventResponseItemSchema[]>([]);

    function closeSnackbar() {
        setEventsLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
                setEventsLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setEventsLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {});
    }, []);

    return { eventsLoadingStatus, events: events.sort(compareEvent), closeSnackbar };
}

export function getOnlyCompletedEvents(events: EventResponseItemSchema[]): EventResponseItemSchema[] {
    return events.filter((event) => event.status === EventStatusEnum.COMPLETED);
}

export function getOnlyOpenEvents(events: EventResponseItemSchema[]): EventResponseItemSchema[] {
    return events.filter((event) => event.status === EventStatusEnum.IN_PROGRESS);
}
