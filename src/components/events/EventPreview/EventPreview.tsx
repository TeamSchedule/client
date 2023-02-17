import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Tooltip } from "@mui/material";
import StatusDone from "../../statuses/StatusDone";
import InProgressStatus from "../../statuses/InProgressStatus";
import { getDateRepresentation } from "../../../utils/dateutils";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { TaskStatusEnum } from "../../../enums/tasksEnums";

interface EventPreviewProps {
    event: EventResponseItemSchema;
}

export default function EventPreview(props: EventPreviewProps) {
    const navigate = useNavigate();

    const onClick = (event: React.MouseEvent<any>) => {
        event.stopPropagation();
        navigate(makeEventLinkById(props.event.id));
    };

    const openTasks: number = props.event.tasks.filter((task) => task.taskStatus === TaskStatusEnum.IN_PROGRESS).length;

    return (
        <>
            <Card sx={{ minWidth: 280, marginBottom: 1 }}>
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            <Box component="span" sx={{ marginRight: 1 }}>
                                {props.event.status ? <StatusDone /> : <InProgressStatus />}
                            </Box>
                            {getDateRepresentation(new Date(props.event.endDate))}
                        </Typography>

                        <Tooltip title={`Открытых задач: ${openTasks} `}>
                            <IconButton>
                                <AssignmentIcon />
                                <Typography variant="subtitle2" color="text.secondary" component="span">
                                    {props.event.tasks.length}
                                </Typography>
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Typography gutterBottom variant="h6" component="div">
                        {props.event.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {props.event.description}
                    </Typography>
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
