import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { API } from "../../../api/api";
import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import TaskPreview from "../../tasks/TaskPreview";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { EventDeadline, EventDescription, EventName } from "../common";
import CardActions from "@mui/material/CardActions";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import SpeedDial from "@mui/material/SpeedDial";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function FullEventView() {
    const navigate = useNavigate();

    const { id } = useParams();
    const { state } = useLocation();
    const { created = 0, eventData = null } = state || {}; // считываем значения из state
    window.history.replaceState({}, document.title); // очищаем state

    // если произошел редирект после создания, то true
    const [isCreatingFinished, setIsCreatingFinished] = useState<boolean>(Boolean(created));

    // данные события
    const [event, setEvent] = useState<EventResponseItemSchema | undefined>(Boolean(eventData) ? eventData : undefined);

    // раскрыть раздел с задачами
    const [expanded, setExpanded] = useState<boolean>(false);

    useEffect(() => {
        /* Получение  данных события */
        if (!id) {
            return;
        }
        if (eventData) return;

        API.events
            .getById(+id)
            .then((event: EventResponseItemSchema) => {
                event.tasks = [];
                setEvent(event);
            })
            .catch(() => {
                // TODO: ЧТо-то пошло не так
            })
            .finally();
    }, [eventData, id]);

    const handleCloseSuccessSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setIsCreatingFinished(false);
    };

    return (
        <>
            <Card>
                <CardContent>
                    <EventDeadline endDate={event ? new Date(event.endDate) : undefined} status={event?.status} />
                    <EventName>{event?.name}</EventName>
                    <EventDescription>{event?.description}</EventDescription>
                </CardContent>

                <CardActions
                    disableSpacing
                    sx={{
                        "&:hover": {
                            cursor: "pointer",
                        },
                    }}
                    onClick={() => setExpanded(!expanded)}
                >
                    <ScreenSectionHeader text="Открытые задачи" />
                    <ExpandMore expand={expanded} aria-expanded={expanded} aria-label="show more">
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {event?.tasks.map((task) => (
                        <TaskPreview key={task.id} task={task} />
                    ))}
                </Collapse>
            </Card>
            <SpeedDial
                ariaLabel="edit event"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
                icon={<EditIcon />}
                onClick={() => {
                    navigate("edit");
                }}
            ></SpeedDial>

            <SuccessSnackbar handleClose={handleCloseSuccessSnackbar} isOpen={isCreatingFinished}>
                Событие создано!
            </SuccessSnackbar>
        </>
    );
}
