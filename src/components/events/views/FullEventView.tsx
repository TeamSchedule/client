import React, { useEffect } from "react";
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
import taskStore from "../../../store/TaskStore";
import { getOnlyCompletedTasks, getOnlyOpenTasks } from "../../../utils/taskUtils";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import theme from "../../../assets/theme";

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
    useEffect(() => {
        taskStore.updateMany(getTasksApiCall.data);
    }, [getTasksApiCall.data]);

    const eventTasks: TaskResponseItemSchema[] = taskStore.getEventTasks(event.id);
    const openTasks: TaskResponseItemSchema[] = getOnlyOpenTasks(eventTasks);
    const completedTasks: TaskResponseItemSchema[] = getOnlyCompletedTasks(eventTasks);

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <DeadlineAndStatus
                    endDate={event.endDate.toString()}
                    status={event.status}
                    onChangeStatus={props.toggleEventStatus(event.status === EventStatusEnum.COMPLETED)}
                />
                <Box>
                    <Tooltip title="Добавить задачу">
                        <IconButton
                            sx={{ ml: 2, p: 0, "&:hover": { color: theme.palette.primary.main } }}
                            onClick={props.navigateToCreateTaskForm}
                        >
                            <NoteAddIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Редактировать">
                        <IconButton
                            sx={{ ml: 2, p: 0, "&:hover": { color: theme.palette.primary.main } }}
                            onClick={props.navigateToEdit}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "stretch" }}>
                <EventColorLeft color={event.color} />
                <EventName>{event.name}</EventName>
            </Box>

            <EventDescription>{event.description}</EventDescription>

            <UploadFileList files={event.files} eventType={FileOwnerTypesEnum.EVENT} />

            <TaskListCollapse
                tasks={openTasks}
                title={`Открытые задачи (${completedTasks.length} выполненных / ${getTasksApiCall.data.length})`}
            />

            <TaskListCollapse tasks={completedTasks} title={`Закрытые задачи (${completedTasks.length})`} isCollapse />
        </>
    );
}

export default observer(FullEventView);
