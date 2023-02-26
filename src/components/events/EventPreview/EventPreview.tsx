import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Tooltip } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { TaskStatusEnum } from "../../../enums/tasksEnums";
import { EventColorLeft, EventDeadline, EventDescription, EventName } from "../common";

interface EventPreviewProps {
    event: EventResponseItemSchema;
}

export default function EventPreview(props: EventPreviewProps) {
    const navigate = useNavigate();

    const onClick = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        navigate(makeEventLinkById(props.event.id), { state: { eventData: props.event } });
    };

    const openTasks: number = props.event.tasks.filter((task) => task.taskStatus === TaskStatusEnum.IN_PROGRESS).length;

    return (
        <>
            <Card sx={{ minWidth: 280, marginBottom: 1 }}>
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <EventDeadline endDate={new Date(props.event.endDate)} status={props.event.status} />

                        {openTasks !== 0 && (
                            <Tooltip title={`Открытых задач: ${openTasks} `}>
                                <IconButton>
                                    <AssignmentIcon />
                                    <Typography variant="subtitle2" color="text.secondary" component="span">
                                        {props.event.tasks.length}
                                    </Typography>
                                </IconButton>
                            </Tooltip>
                        )}
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "stretch" }}>
                        <EventColorLeft color={props.event.color} />
                        <EventName>{props.event.name}</EventName>
                    </Box>

                    <EventDescription>{props.event.description}</EventDescription>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={onClick}>
                        Подробнее
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
