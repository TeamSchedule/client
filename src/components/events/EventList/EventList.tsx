import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import EventPreview from "../EventPreview/EventPreview";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { eventsData } from "../../../testdata/data";
import PlainSelector from "../../selectors/PlainSelector";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { CreateNewEventPath } from "../../../routes/paths";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { EventStatusEnum } from "../../../enums/eventsEnums";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";

enum EventFilterEnum {
    All = 0,
    InProgress = 1,
    Done = 2,
}

const EventFilters: Array<[string, string]> = [
    [EventFilterEnum.All.toString(), "Все"],
    [EventFilterEnum.InProgress.toString(), "Активные"],
    [EventFilterEnum.Done.toString(), "Завершенные"],
];

export default function EventList() {
    const navigate = useNavigate();

    // все существующие события
    const [events, setEvents] = useState<EventResponseItemSchema[]>(eventsData);
    const [eventsLoading, setEventsLoading] = useState<boolean>(true);
    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

    // список отображаемых событий
    const [showedEvents, setShowedEvents] = useState<EventResponseItemSchema[]>([]);

    // параметр, по которому фильтруются собыития
    const [eventFilterValue, setEventFilterValue] = useState(EventFilterEnum.InProgress);

    useEffect(() => {
        API.events
            .all()
            .then((events: EventResponseItemSchema[]) => {
                setEvents(events);
            })
            .catch(() => {
                setIsLoadingError(true);
            })
            .finally(() => {
                setEventsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (+eventFilterValue === +EventFilterEnum.All) {
            setShowedEvents(() => [...events]);
        } else if (+eventFilterValue === +EventFilterEnum.InProgress) {
            setShowedEvents(() => [...events.filter((event) => event.status === EventStatusEnum.IN_PROGRESS)]);
        } else if (+eventFilterValue === +EventFilterEnum.Done) {
            setShowedEvents(() => [...events.filter((event) => event.status === EventStatusEnum.COMPLETED)]);
        }
    }, [eventFilterValue, events]);

    const handleCloseErrorSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsLoadingError(false);
    };

    return (
        <>
            <div>
                <div className="d-flex justify-content-center align-items-center">
                    <ScreenHeader text="События" />

                    <PlainSelector
                        filterValue={eventFilterValue}
                        setFilterValue={setEventFilterValue}
                        id="event-filter"
                        filterObj={EventFilters}
                    />
                </div>

                {eventsLoading && (
                    <Box sx={{ display: "flex", justifyContent: "center", mt: "50%" }}>
                        <CircularProgress />
                    </Box>
                )}

                {!eventsLoading && showedEvents.map((event) => <EventPreview key={event.id} event={event} />)}
                <SpeedDial
                    ariaLabel="create new event"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClick={() => {
                        navigate(CreateNewEventPath);
                    }}
                ></SpeedDial>
            </div>
            <ErrorSnackbar handleClose={handleCloseErrorSnackbar} isOpen={isLoadingError}>
                Не удалось загрузить данные!
            </ErrorSnackbar>
        </>
    );
}
