import { EventStatusEnum, EventStatusStrings } from "../../../enums/eventsEnums";
import Box from "@mui/material/Box";
import StatusDone from "../../statuses/StatusDone";
import InProgressStatus from "../../statuses/InProgressStatus";
import { TaskStatusEnum, TaskStatusStrings } from "../../../enums/tasksEnums";

export interface WorkStatusPlateProps {
    status: EventStatusStrings | TaskStatusStrings;
}

export default function WorkStatusPlate(props: WorkStatusPlateProps) {
    return (
        <Box component="span">
            {props.status === EventStatusEnum.COMPLETED || props.status === TaskStatusEnum.COMPLETED ? (
                <StatusDone />
            ) : (
                <InProgressStatus />
            )}
        </Box>
    );
}
