import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useMemo, useState } from "react";
import { API } from "../../../api/api";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { EventColorLeft, EventDescription, EventName } from "../common";
import EditIcon from "@mui/icons-material/Edit";
import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { EventStatusEnum, EventStatusStrings } from "../../../enums/eventsEnums";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import { EditEventRequestSchema } from "../../../api/schemas/requests/events";
import { FileResponseItemSchema } from "../../../api/schemas/responses/files";
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
import eventStore from "../../../store/EventStore";
import { FetchStatusEnum } from "../../../enums/fetchStatusEnum";

function FullEventView() {
    const navigate = useNavigate();

    const urlParams = useParams();
    const id: number = +(urlParams.id || 0);
    const { state } = useLocation();
    const { created = 0 } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    const params = useMemo(() => {
        return {
            events: [id],
        };
    }, [id]);

    const getTasksApiCall = useApiCall<TaskResponseItemSchema[]>(() => API.tasks.getTasks(params), []);
    const getFilesApiCall = useApiCall<FileResponseItemSchema[]>(() => API.files.getEventFiles(id), []);

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // статус запроса на изменения статуса события
    const [isChangingStatusError, setIsChangingStatusError] = useState<boolean>(false);
    const [isChangingStatusSuccess, setIsChangingStatusSuccess] = useState<boolean>(false);

    // данные события
    const event: EventResponseItemSchema | undefined = eventStore.getById(id);

    const onChangeEventStatus = (open: boolean) => (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (!id) return;

        const newStatus: EventStatusStrings = open ? EventStatusEnum.IN_PROGRESS : EventStatusEnum.COMPLETED;
        const newEventData: EditEventRequestSchema = { eventId: +id, status: newStatus };

        API.events
            .editEvent(newEventData)
            .then(() => {
                if (event) {
                    eventStore.update(id, { ...event, status: newStatus });
                }
            })
            .catch(() => {})
            .finally(() => {});
    };

    const handleCloseSuccessfullyCreatedSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingFinished(false);
    };

    const handleCloseErrorChangeStatusSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsChangingStatusError(false);
    };

    const handleCloseSuccessChangeStatusSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsChangingStatusSuccess(false);
    };

    if (event === undefined) {
        return null;
    }

    return (
        <>
            <Card>
                <CardContent>
                    {event && (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <DeadlineAndStatus
                                endDate={event.endDate}
                                status={event.status}
                                onChangeStatus={onChangeEventStatus(event.status === EventStatusEnum.COMPLETED)}
                            />
                            <Tooltip title="Редактировать">
                                <IconButton
                                    sx={{ p: 0 }}
                                    onClick={() => navigate(makeEventLinkById(event.id) + "/edit")}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "stretch" }}>
                        <EventColorLeft color={event?.color} />
                        <EventName>{event?.name}</EventName>
                    </Box>

                    <EventDescription>{event?.description}</EventDescription>

                    <UploadFileList files={getFilesApiCall.data} eventType={FileOwnerTypesEnum.EVENT} />

                    <TaskListCollapse tasks={getTasksApiCall.data} />

                    <Box sx={{ display: { md: "none" } }}>
                        <GoBackButton to={EventListPath} buttonText="Вернуться к списку событий" />
                    </Box>
                </CardContent>
            </Card>
            <SpeedDial
                ariaLabel="edit event"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<EditIcon />}
                onClick={() => {
                    navigate("edit");
                }}
            ></SpeedDial>

            <SuccessSnackbar handleClose={handleCloseSuccessfullyCreatedSnackbar} isOpen={isCreatingFinished}>
                Событие создано!
            </SuccessSnackbar>

            <ErrorSnackbar
                handleClose={() => eventStore.setFetchStatus(FetchStatusEnum.IDLE)}
                isOpen={eventStore.getFetchStatus === FetchStatusEnum.ERROR}
            >
                Ошибка загрузки
            </ErrorSnackbar>

            <SuccessSnackbar handleClose={handleCloseSuccessChangeStatusSnackbar} isOpen={isChangingStatusSuccess}>
                Статус события обновлен!
            </SuccessSnackbar>
            <ErrorSnackbar handleClose={handleCloseErrorChangeStatusSnackbar} isOpen={isChangingStatusError}>
                Произошла ошибка, попробуйте позже
            </ErrorSnackbar>
        </>
    );
}

export default observer(FullEventView);
