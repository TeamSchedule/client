import Typography from "@mui/material/Typography";
import { Tooltip, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
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
    endDate?: string;
    status?: EventStatusStrings;
}

export function EventDeadline(props: EventDeadlineProps) {
    const theme = useTheme();

    if (!props.endDate) {
        return (
            <Box sx={{ display: "flex" }}>
                <Typography
                    sx={{
                        px: 1,
                        color: theme.palette.getContrastText(theme.palette.warning.main),
                        borderRadius: 1,
                        backgroundColor: theme.palette.warning.main,
                    }}
                >
                    Дата не назначена
                </Typography>
                <EventStatus status={props.status} />
            </Box>
        );
    }

    let endDateColor: string = theme.palette.info.main;
    const isTimeExpired: boolean = new Date(props.endDate) < new Date();

    let dateTooltipText: string = "Событие в работе!";

    if (props.status === EventStatusEnum.COMPLETED) {
        endDateColor = theme.palette.success.main;
        dateTooltipText = "Событие завершено!";
    } else if (isTimeExpired) {
        endDateColor = theme.palette.error.main;
        dateTooltipText = "Событие истекло!";
    }

    return (
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 0, verticalAlign: "bottom" }} color="text.secondary">
            <Tooltip title={dateTooltipText}>
                <Typography
                    sx={{
                        px: 1,
                        color: theme.palette.getContrastText(endDateColor),
                        borderRadius: 1,
                        backgroundColor: endDateColor,
                    }}
                >
                    {getDateRepresentation(new Date(props.endDate))}
                </Typography>
            </Tooltip>

            <EventStatus status={props.status} />
        </Box>
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

interface EventStatusProps {
    status?: EventStatusStrings;
}

export function EventStatus(props: EventStatusProps) {
    return (
        <Box component="span" sx={{ ml: 1 }}>
            {props.status !== undefined && props.status === EventStatusEnum.COMPLETED ? (
                <StatusDone />
            ) : (
                <InProgressStatus />
            )}
        </Box>
    );
}
