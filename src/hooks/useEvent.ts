import { useEffect, useState } from "react";
import { API } from "../api/api";
import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";

export interface UseEventInterface {
    event: EventResponseItemSchema | undefined;
    setEvent: (value: EventResponseItemSchema) => void;
    eventLoadingStatus: LoadingStatusStrings;
    closeSnackbar: () => void;
}

export default function useEvent(id: number): UseEventInterface {
    const [eventLoadingStatus, setEventLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);
    const [event, setEvent] = useState<EventResponseItemSchema | undefined>(undefined);

    function closeSnackbar() {
        setEventLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        if (!id) return;

        API.events
            .getById(id)
            .then((event: EventResponseItemSchema) => {
                setEvent(event);
                setEventLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setEventLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {
            });
    }, [id]);

    return { eventLoadingStatus, event, setEvent, closeSnackbar };
}
