import React from "react";
import { API } from "../../../api/api";
import { EventColorLeft, EventDescription, EventName } from "../common";
import EditIcon from "@mui/icons-material/Edit";
import { EventStatusEnum } from "../../../enums/eventsEnums";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import TaskListCollapse from "../../common/TaskListCollapse";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import { Box, IconButton, Tooltip } from "@mui/material";
import useApiCall from "../../../hooks/useApiCall";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import UploadFileList from "../../files/UploadFileList";
import { observer } from "mobx-react-lite";
import { EventActionsProps, EventViewProps } from "./interfaces";

interface FullEventViewProps extends EventViewProps, EventActionsProps {}

function FullEventView(props: FullEventViewProps) {
    // данные события
    const event: EventResponseItemSchema = props.event;

    const params = {
        events: [event.id],
    };
    const getTasksApiCall = useApiCall<TaskResponseItemSchema[]>(
        () => API.tasks.getTasks(params),
        [],
        [event.id],
        true
    );

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DeadlineAndStatus
                    endDate={event.endDate}
                    status={event.status}
                    onChangeStatus={props.toggleEventStatus(event.status === EventStatusEnum.COMPLETED)}
                />
                <Tooltip title="Редактировать">
                    <IconButton sx={{ p: 0 }} onClick={props.navigateToEdit}>
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "stretch" }}>
                <EventColorLeft color={event.color} />
                <EventName>{event.name}</EventName>
            </Box>

            <EventDescription>{event.description}</EventDescription>

            <UploadFileList files={event.files} eventType={FileOwnerTypesEnum.EVENT} />

            <TaskListCollapse tasks={getTasksApiCall.data} />
        </>
    );
}

export default observer(FullEventView);
