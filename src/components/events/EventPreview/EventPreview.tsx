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
import { EventColorLeft, EventDescription, EventName } from "../common";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";

interface EventPreviewProps {
    event: EventResponseItemSchema;
}

export default function EventPreview(props: EventPreviewProps) {
    const navigate = useNavigate();

    const onClick = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        navigate(makeEventLinkById(props.event.id), { state: { eventData: props.event } });
    };

    const openTasks: number = 0;

    return (
        <>
            <Card sx={{ minWidth: 280, marginBottom: 1 }}>
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <DeadlineAndStatus endDate={props.event.endDate} status={props.event.status} />

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
