import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import EventPreview from "../EventPreview/EventPreview";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import PlainSelector from "../../selectors/PlainSelector";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { CreateNewEventPath } from "../../../routes/paths";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import Grid from "@mui/material/Grid";
import useApiCall from "../../../hooks/useApiCall";
import { API } from "../../../api/api";
import { getOnlyCompletedEvents, getOnlyOpenEvents } from "../../../utils/eventUtils";

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

    const DisplayedEvents = showedEvents.map((event) => <EventPreview key={event.id} event={event} />);

    const Progress = () => (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3, width: "100%" }}>
            <CircularProgress />
        </Box>
    );

    return (
        <>
            <div>
                {id && (
                    <Grid container sx={{ justifyContent: "flex-start" }} spacing={1}>
                        <Grid
                            item
                            xs={0}
                            md={5}
                            lg={4}
                            sx={{
                                minHeight: { xs: 0, md: "calc(100vh - 65px)" },
                                maxHeight: { md: "calc(100vh - 130px)" },
                                overflowY: "auto",
                            }}
                        >
                            <Box sx={{ display: { xs: "none", md: "block" } }}>
                                <div className="d-flex justify-content-center align-items-center">
                                    <ScreenHeader text="События" />

                                    <PlainSelector
                                        filterValue={eventFilterValue}
                                        setFilterValue={setEventFilterValue}
                                        id="event-filter"
                                        filterObj={EventFilters}
                                    />
                                </div>
                                {getEventsApiCall.loading && <Progress />}
                                {getEventsApiCall.success && DisplayedEvents}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7} lg={8}>
                            <Box sx={{ mt: { md: "56px" }, width: "100%" }}>
                                <Outlet />
                            </Box>
                        </Grid>
                    </Grid>
                )}

                {!id && (
                    <>
                        <Grid container sx={{ justifyContent: "flex-start" }} spacing={1}>
                            <Grid
                                item
                                xs={12}
                                md={5}
                                lg={4}
                                sx={{
                                    minHeight: { xs: 0, md: "calc(100vh - 65px)" },
                                    maxHeight: { md: "calc(100vh - 130px)" },
                                    overflowY: "auto",
                                }}
                            >
                                <Box>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <ScreenHeader text="События" />

                                        <PlainSelector
                                            filterValue={eventFilterValue}
                                            setFilterValue={setEventFilterValue}
                                            id="event-filter"
                                            filterObj={EventFilters}
                                        />
                                    </div>
                                    {getEventsApiCall.loading && <Progress />}
                                    {getEventsApiCall.success && DisplayedEvents}
                                </Box>
                            </Grid>
                            <Grid item xs={0} md={7} lg={8}></Grid>
                        </Grid>
                    </>
                )}

                <SpeedDial
                    ariaLabel="create new event"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon />}
                    onClick={() => {
                        navigate(CreateNewEventPath);
                    }}
                ></SpeedDial>
            </div>
            <ErrorSnackbar handleClose={getEventsApiCall.resetApiCallStatus} isOpen={getEventsApiCall.error}>
                Не удалось загрузить данные!
            </ErrorSnackbar>
        </>
    );
}
