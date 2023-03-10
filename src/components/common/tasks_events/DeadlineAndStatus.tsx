import Box from "@mui/material/Box";
import WorkStatusPlate, { WorkStatusPlateProps } from "./WorkStatusPlate";
import DeadlinePlate, { DeadlinePlateProps } from "./DeadlinePlate";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import { EventStatusEnum } from "../../../enums/eventsEnums";
import { useTheme } from "@mui/material";

interface DeadlineAndStatusProps extends WorkStatusPlateProps, DeadlinePlateProps {}

export default function DeadlineAndStatus(props: DeadlineAndStatusProps) {
    const theme = useTheme();

    let deadlineTextColor = "inherit";

    if (props.status === TaskStatusEnum.COMPLETED || props.status === EventStatusEnum.COMPLETED) {
        deadlineTextColor = theme.palette.success.main;
    } else if (
        (props.status === TaskStatusEnum.IN_PROGRESS || props.status === EventStatusEnum.IN_PROGRESS) &&
        new Date() > new Date(props.endDate)
    ) {
        deadlineTextColor = theme.palette.error.main;
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <WorkStatusPlate status={props.status} />
            <DeadlinePlate endDate={props.endDate} color={deadlineTextColor} />
        </Box>
    );
}
