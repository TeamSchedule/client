import Typography from "@mui/material/Typography";
import { Tooltip, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { getDateRepresentation } from "../../../utils/dateutils";
import { TaskStatusEnum, TaskStatusStrings } from "../../../enums/tasksEnums";
import StatusDone from "../../statuses/StatusDone";
import InProgressStatus from "../../statuses/InProgressStatus";

interface TaskDescriptionProps {
    children?: any;
}

export function TaskDescription(props: TaskDescriptionProps) {
    return (
        <>
            <Typography variant="body2" color="text.secondary">
                {props.children}
            </Typography>
        </>
    );
}

interface TaskDeadlineProps {
    endDate?: string;
    status?: TaskStatusStrings;
}

export function TaskDeadline(props: TaskDeadlineProps) {
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
                <WorkStatus status={props.status} />
            </Box>
        );
    }

    let endDateColor: string = theme.palette.info.main;
    const isTimeExpired: boolean = new Date(props.endDate) < new Date();

    let dateTooltipText: string = "В работе";

    if (props.status === TaskStatusEnum.COMPLETED) {
        endDateColor = theme.palette.success.main;
        dateTooltipText = "Выполнено";
    } else if (isTimeExpired) {
        endDateColor = theme.palette.error.main;
        dateTooltipText = "Просрочено";
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

            <WorkStatus status={props.status} />
        </Box>
    );
}

interface WorkStatusProps {
    status?: TaskStatusStrings;
}

export function WorkStatus(props: WorkStatusProps) {
    return (
        <Box component="span" sx={{ ml: 1 }}>
            {props.status !== undefined && props.status === TaskStatusEnum.COMPLETED ? (
                <StatusDone />
            ) : (
                <InProgressStatus />
            )}
        </Box>
    );
}
