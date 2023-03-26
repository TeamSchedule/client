import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventPreview from "../EventPreview/EventPreview";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import PlainSelector from "../../selectors/PlainSelector";
import { CreateNewEventPath } from "../../../routes/paths";
import Box from "@mui/material/Box";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import useApiCall from "../../../hooks/useApiCall";
import { API } from "../../../api/api";
import { getOnlyCompletedEvents, getOnlyOpenEvents } from "../../../utils/eventUtils";
import ListViewContainer from "../../common/ListViewContainer/ListViewContainer";
import Typography from "@mui/material/Typography";
import Progress from "../../common/Progress";
import CreateNewButton from "../../common/CreateNewButton";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material";

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
    const theme = useTheme();

    const { id } = useParams();

    // все события
    const getEventsApiCall = useApiCall<EventResponseItemSchema[]>(() => API.events.all(), []);
    const events: EventResponseItemSchema[] = getEventsApiCall.data;

    // список отображаемых событий
    const [showedEvents, setShowedEvents] = useState<EventResponseItemSchema[]>([]);

    // параметр, по которому фильтруются собыития
    const [eventFilterValue, setEventFilterValue] = useState(EventFilterEnum.InProgress);

    useEffect(() => {
        if (+eventFilterValue === +EventFilterEnum.All) {
            setShowedEvents(() => [...events]);
        } else if (+eventFilterValue === +EventFilterEnum.InProgress) {
            setShowedEvents(getOnlyOpenEvents(events));
        } else if (+eventFilterValue === +EventFilterEnum.Done) {
            setShowedEvents(getOnlyCompletedEvents(events));
        }
    }, [eventFilterValue, events]);

    const DisplayedEvents = showedEvents.map((event) => (
        <>
            <EventPreview key={event.id} event={event} />
            <Divider sx={{ m: 0, backgroundColor: theme.palette.grey.A700 }} />
        </>
    ));

    const TopBar = (
        <>
            <Box sx={{ display: "flex", alignItems: "center", my: 0, py: 0 }}>
                <Typography
                    component="h1"
                    variant="h1"
                    sx={{ fontSize: { xs: "1rem", md: "1.5rem" }, color: theme.palette.grey.A700, mb: 2, py: 1, my: 0 }}
                >
                    События
                </Typography>
                <PlainSelector
                    filterValue={eventFilterValue}
                    setFilterValue={setEventFilterValue}
                    id="event-filter"
                    filterObj={EventFilters}
                />
            </Box>

            <CreateNewButton text="Новое событие" onClick={() => navigate(CreateNewEventPath)} />
        </>
    );

    const LeftBar = (
        <Box>
            {getEventsApiCall.loading && <Progress />}
            {getEventsApiCall.success && DisplayedEvents}
        </Box>
    );

    const RightBar = (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
            Выберите событие, чтобы увидеть подробную информацию
        </Typography>
    );

    return (
        <>
            <ListViewContainer TopBar={TopBar} LeftBar={LeftBar} RightBar={RightBar} id={id} />
            <ErrorSnackbar handleClose={getEventsApiCall.resetApiCallStatus} isOpen={getEventsApiCall.error}>
                Не удалось загрузить данные!
            </ErrorSnackbar>
        </>
    );
}
