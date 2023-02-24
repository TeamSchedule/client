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
            <Typography gutterBottom variant="h6" component="div">
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
            <Typography sx={{ display: "flex", alignItems: "center", mb: 0 }} color="text.secondary" gutterBottom>
                <Box component="span" sx={{ marginRight: 1 }}>
                    {props.status !== undefined && props.status === EventStatusEnum.COMPLETED ? (
                        <StatusDone />
                    ) : (
                        <InProgressStatus />
                    )}
                </Box>
                {getDateRepresentation(props.endDate)}
            </Typography>
        </>
    );
}
