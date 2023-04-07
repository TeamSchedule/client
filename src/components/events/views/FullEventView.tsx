import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { API } from "../../../api/api";
import { EventColorLeft, EventDescription, EventName } from "../common";
import EditIcon from "@mui/icons-material/Edit";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { EventStatusEnum } from "../../../enums/eventsEnums";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import GoBackButton from "../../buttons/GoBackButton";
import { EventListPath, makeEventLinkById } from "../../../routes/paths";
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
    const navigate = useNavigate();

    // данные события
    const event: EventResponseItemSchema = props.event;

    const params = {
        events: [event.id],
    };
    const getTasksApiCall = useApiCall<TaskResponseItemSchema[]>(() => API.tasks.getTasks(params), []);

    return (
        <>
            <Card>
                <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <DeadlineAndStatus
                            endDate={event.endDate}
                            status={event.status}
                            onChangeStatus={props.toggleEventStatus(event.status === EventStatusEnum.COMPLETED)}
                        />
                        <Tooltip title="Редактировать">
                            <IconButton sx={{ p: 0 }} onClick={() => navigate(makeEventLinkById(event.id) + "/edit")}>
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

                    <Box sx={{ display: { md: "none" } }}>
                        <GoBackButton to={EventListPath} buttonText="Вернуться к списку событий" />
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default observer(FullEventView);