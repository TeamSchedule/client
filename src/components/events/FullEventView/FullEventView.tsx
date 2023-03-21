import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useMemo, useState } from "react";
import { API } from "../../../api/api";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { EventColorLeft, EventDescription, EventName } from "../common";
import EditIcon from "@mui/icons-material/Edit";
import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { EventStatusEnum, EventStatusStrings } from "../../../enums/eventsEnums";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import Typography from "@mui/material/Typography";
import { EditEventRequestSchema } from "../../../api/schemas/requests/events";
import { FileResponseItemSchema } from "../../../api/schemas/responses/files";
import UploadedFilePreview from "../../files/UploadedFilePreview";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import GoBackButton from "../../buttons/GoBackButton";
import { EventListPath, makeEventLinkById } from "../../../routes/paths";
import TaskListCollapse from "../../common/TaskListCollapse";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import { Box, IconButton, Tooltip } from "@mui/material";
import ToggleWorkStatusButton from "../../common/tasks_events/ToggleWorkStatusButton";
import useApiCall from "../../../hooks/useApiCall";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";

export default function FullEventView() {
    const navigate = useNavigate();

    const { id } = useParams();
    const { state } = useLocation();
    const { created = 0 } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    const params = useMemo(() => {
        return {
            events: [id ? +id : 0],
        };
    }, [id]);

    const getTasksApiCall = useApiCall<TaskResponseItemSchema[]>(() => API.tasks.getTasks(params), []);

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // статус запроса на изменения статуса события
    const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
    const [isChangingStatusError, setIsChangingStatusError] = useState<boolean>(false);
    const [isChangingStatusSuccess, setIsChangingStatusSuccess] = useState<boolean>(false);

    const getEventApiCall = useApiCall<EventResponseItemSchema | undefined>(
        () => API.events.getById(id ? +id : 0),
        undefined,
        [id]
    );
    // данные события
    const event = getEventApiCall.data;

    const [eventFiles, setEventFiles] = useState<FileResponseItemSchema[]>([]);

    useEffect(() => {
        if (!id) {
            return;
        }

        API.files.getEventFiles(+id).then((files: FileResponseItemSchema[]) => {
            setEventFiles(files);
        });
    }, [id]);

    const onChangeEventStatus = (open: boolean) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (!id) return;
        setIsChangingStatus(true);

        const newStatus: EventStatusStrings = open ? EventStatusEnum.IN_PROGRESS : EventStatusEnum.COMPLETED;
        const newEventData: EditEventRequestSchema = { eventId: +id, status: newStatus };

        API.events
            .editEvent(newEventData)
            .then(() => {
                if (event) {
                    // setEvent({ ...event, status: newStatus });
                    getEventApiCall.setData({ ...event, status: newStatus });
                }
            })
            .catch(() => {
                setIsChangingStatusError(true);
            })
            .finally(() => {
                setIsChangingStatus(false);
            });
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

    if (id === undefined) {
        navigate("/");
        return null;
    }

    return (
        <>
            <Card>
                <CardContent>
                    {event && (
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <DeadlineAndStatus endDate={event.endDate} status={event.status} />
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

                    {eventFiles.length > 0 && (
                        <>
                            <Typography variant="subtitle1" component="h2" sx={{ fontWeight: "bold", mt: 2, p: 0 }}>
                                Файлы
                            </Typography>
                            {eventFiles.map((file) => (
                                <UploadedFilePreview key={file.id} file={file} eventType={FileOwnerTypesEnum.EVENT} />
                            ))}
                        </>
                    )}

                    <TaskListCollapse tasks={getTasksApiCall.data} />

                    {event && (
                        <ToggleWorkStatusButton
                            status={event?.status}
                            toggleStatus={onChangeEventStatus}
                            loading={isChangingStatus}
                        />
                    )}

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

            <ErrorSnackbar handleClose={getEventApiCall.resetApiCallStatus} isOpen={getEventApiCall.error}>
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
