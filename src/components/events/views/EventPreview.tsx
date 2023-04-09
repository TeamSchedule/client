import { makeEventLinkById } from "../../../routes/paths";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Tooltip } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { EventColorLeft, EventDescription, EventName } from "../common";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { EventStatusEnum } from "../../../enums/eventsEnums";
import { EventActionsProps, EventViewProps } from "./interfaces";
import { observer } from "mobx-react-lite";

interface EventPreviewProps extends EventViewProps, EventActionsProps {
    selected?: boolean;
}

function EventPreview(props: EventPreviewProps) {
    const openTasks: number = 0;

    return (
        <Box sx={{ "&:hover": { cursor: "pointer", background: "#f4f9ff" } }} onClick={props.navigateToFull}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DeadlineAndStatus
                    endDate={props.event.endDate}
                    status={props.event.status}
                    onChangeStatus={props.toggleEventStatus(props.event.status === EventStatusEnum.COMPLETED)}
                />
                <Tooltip title="Редактировать">
                    <IconButton sx={{ p: 0 }} onClick={props.navigateToEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>
            {openTasks !== 0 && (
                <Tooltip title={`Открытых задач: ${openTasks} `}>
                    <IconButton>
                        <AssignmentIcon />
                        <Typography variant="subtitle2" color="text.secondary" component="span">
                            {"-"}
                        </Typography>
                    </IconButton>
                </Tooltip>
            )}

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "stretch" }}>
                <EventColorLeft color={props.event.color} />
                <Link href={makeEventLinkById(props.event.id)} onClick={props.navigateToFull}>
                    <EventName>{props.event.name}</EventName>
                </Link>
            </Box>

            <EventDescription>{props.event.description}</EventDescription>

            <Box>
                {Boolean(props.event.files.length) && (
                    <Typography component="p" variant="subtitle1" sx={{ color: "grey" }}>
                        Файлов: {props.event.files.length}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}

export default observer(EventPreview);
