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
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

interface EventPreviewProps extends EventViewProps, EventActionsProps {
    selected?: boolean;
}

function EventPreview(props: EventPreviewProps) {
    const navigate = useNavigate();

    const openTasks: number = 0;

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DeadlineAndStatus
                    endDate={props.event.endDate}
                    status={props.event.status}
                    onChangeStatus={props.toggleEventStatus(props.event.status === EventStatusEnum.COMPLETED)}
                />
                <Tooltip title="Редактировать">
                    <IconButton sx={{ p: 0 }} onClick={() => navigate(makeEventLinkById(props.event.id) + "/edit")}>
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
                <Link
                    href={makeEventLinkById(props.event.id)}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate(makeEventLinkById(props.event.id));
                    }}
                >
                    <EventName>{props.event.name}</EventName>
                </Link>
            </Box>

            <EventDescription>{props.event.description}</EventDescription>
        </>
    );
}

export default observer(EventPreview);
