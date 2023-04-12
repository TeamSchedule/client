import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { EventActionsProps, EventViewProps } from "./interfaces";
import EventPreview from "./EventPreview";
import FullEventView from "./FullEventView";
import { EventViewModeEnum } from "../../../enums/eventsEnums";
import EditEventForm from "./EditEventForm";
import DesktopCalendarEventPreview from "./DesktopCalendarEventPreview";

interface BaseEventViewProps extends EventViewProps, EventActionsProps {}

export default function BaseEventView(props: BaseEventViewProps) {
    if (props.viewMode === EventViewModeEnum.CALENDAR) {
        return <DesktopCalendarEventPreview {...props} />;
    }
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    minWidth: "275px",
                    "& .MuiCardContent-root": {
                        paddingBottom: "8px !important",
                    },
                }}
            >
                <CardContent sx={{ p: 1 }}>
                    {Boolean(props.viewMode === undefined || props.viewMode === EventViewModeEnum.PREVIEW) && (
                        <EventPreview {...props} />
                    )}

                    {props.viewMode === EventViewModeEnum.FULL && <FullEventView {...props} />}
                    {props.viewMode === EventViewModeEnum.EDIT && <EditEventForm {...props} />}
                </CardContent>
            </Card>
        </>
    );
}
