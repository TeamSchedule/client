import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import StatusDone from "../statuses/StatusDone";
import InProgressStatus from "../statuses/InProgressStatus";
import { getDateRepresentation } from "../../utils/dateutils";
import { EventStatusEnum, EventStatusStrings } from "../../enums/eventsEnums";

interface EventNameProps {
    children?: any;
}

export function EventName(props: EventNameProps) {
    return (
        <>
            <Typography variant="h6" component="div">
                {props.children}
            </Typography>
        </>
    );
}

interface EventDescriptionProps {
    children?: any;
}

export function EventDescription(props: EventDescriptionProps) {
    return (
        <>
            <Typography variant="body2" color="text.secondary">
                {props.children}
            </Typography>
        </>
    );
}

interface EventDeadlineProps {
    endDate?: Date;
    status?: EventStatusStrings;
}

export function EventDeadline(props: EventDeadlineProps) {
    return (
        <>
            <Typography
                sx={{ display: "flex", alignItems: "flex-end", mb: 0, verticalAlign: "bottom" }}
                color="text.secondary"
                gutterBottom
            >
                <span>{getDateRepresentation(props.endDate)}</span>
                <Box component="span" sx={{ ml: 1 }}>
                    {props.status !== undefined && props.status === EventStatusEnum.COMPLETED ? (
                        <StatusDone />
                    ) : (
                        <InProgressStatus />
                    )}
                </Box>
            </Typography>
        </>
    );
}

interface EventColorProps {
    color?: string;
}

export function EventColorLeft(props: EventColorProps) {
    return (
        <>
            {props.color !== undefined && (
                <Box
                    sx={{
                        borderRadius: "50%",
                        backgroundColor: props.color || "white",
                        width: "18px",
                        height: "18px",
                        mr: 1,
                        flexGrow: 0,
                    }}
                ></Box>
            )}
        </>
    );
}
