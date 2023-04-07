import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { EventActionsProps, EventViewProps } from "./interfaces";
import EventPreview from "./EventPreview";
import FullEventView from "./FullEventView";

interface BaseEventViewProps extends EventViewProps, EventActionsProps {}

export default function BaseEventView(props: BaseEventViewProps) {
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
                    <>{props.fullMode ? <FullEventView {...props} /> : <EventPreview {...props} />}</>
                </CardContent>
            </Card>
        </>
    );
}
