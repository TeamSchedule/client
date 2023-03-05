import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { EventDeadline, EventDescription, EventName } from "../common";
import EditIcon from "@mui/icons-material/Edit";
import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import { FilterTasksParamsSchema } from "../../../api/schemas/requests/tasks";
import LoadingButton from "@mui/lab/LoadingButton";
import { EventStatusEnum, EventStatusStrings } from "../../../enums/eventsEnums";
import ErrorSnackbar from "../../snackbars/ErrorSnackbar";
import Typography from "@mui/material/Typography";
import { EditEventRequestSchema } from "../../../api/schemas/requests/events";
import { FileResponseItemSchema } from "../../../api/schemas/responses/files";
import UploadedFilePreview from "../../files/UploadedFilePreview";
import { FileOwnerTypesEnum } from "../../../enums/filesEnums";
import GoBackButton from "../../buttons/GoBackButton";
import { EventListPath } from "../../../routes/paths";
import TaskListCollapse from "../../common/TaskListCollapse";

export default function FullEventView() {
    const navigate = useNavigate();

    const { id } = useParams();
    const { state } = useLocation();
    const { created = 0, eventData = null } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // статус загрузки данных события
    const [isLoadingError, setIsLoadingError] = useState<boolean>(false);

    // статус запроса на изменения статуса события
    const [isChangingStatus, setIsChangingStatus] = useState<boolean>(false);
    const [isChangingStatusError, setIsChangingStatusError] = useState<boolean>(false);
    const [isChangingStatusSuccess, setIsChangingStatusSuccess] = useState<boolean>(false);

    // данные события
    const [event, setEvent] = useState<EventResponseItemSchema | undefined>(Boolean(eventData) ? eventData : undefined);
    const [eventTasks, setEventTasks] = useState<TaskResponseItemSchema[]>([]);
    const [eventFiles, setEventFiles] = useState<FileResponseItemSchema[]>([]);

    useEffect(() => {
        /* Получение  данных события */
        if (!id) {
            setIsLoadingError(true);
            return;
        }

        if (!eventData) {
            API.events
                .getById(+id)
                .then((event: EventResponseItemSchema) => {
                    setEvent(event);
                })
                .catch(() => {
                    setIsLoadingError(true);
                });
        }

        const params: FilterTasksParamsSchema = {
            events: [+id],
        };
        API.tasks.getTasks(params).then((tasks: TaskResponseItemSchema[]) => {
            setEventTasks(tasks);
        });
    }, [eventData, id]);

    useEffect(() => {
        if (!id) {
            return;
        }

        API.files.getEventFiles(+id).then((files: FileResponseItemSchema[]) => {
            setEventFiles(files);
        });
    }, [eventData, id]);

    const onChangeEventStatus = (complete: boolean) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (!id) return;
        setIsChangingStatus(true);

        const newStatus: EventStatusStrings = complete ? EventStatusEnum.COMPLETED : EventStatusEnum.IN_PROGRESS;
        const newEventData: EditEventRequestSchema = { eventId: +id, status: newStatus };

        API.events
            .editEvent(newEventData)
            .then(() => {
                if (event) {
                    setEvent({ ...event, status: newStatus });
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

    const handleCloseErrorLoadedSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsLoadingError(false);
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

    return (
        <>
            <Card>
                <CardContent>
                    <EventDeadline endDate={event?.endDate} status={event?.status} />
                    <EventName>{event?.name}</EventName>
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

                    <TaskListCollapse tasks={eventTasks} />

                    {event?.status === EventStatusEnum.IN_PROGRESS && (
                        <LoadingButton
                            fullWidth
                            onClick={onChangeEventStatus(true)}
                            loading={isChangingStatus}
                            variant="contained"
                            sx={{ my: 2 }}
                        >
                            Завершить событие
                        </LoadingButton>
                    )}

                    {event?.status === EventStatusEnum.COMPLETED && (
                        <LoadingButton
                            fullWidth
                            onClick={onChangeEventStatus(false)}
                            loading={isChangingStatus}
                            variant="outlined"
                            sx={{ my: 2 }}
                        >
                            Запустить событие
                        </LoadingButton>
                    )}

                    <GoBackButton to={EventListPath} buttonText="Вернуться к списку событий" />
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

            <ErrorSnackbar handleClose={handleCloseErrorLoadedSnackbar} isOpen={isLoadingError}>
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
