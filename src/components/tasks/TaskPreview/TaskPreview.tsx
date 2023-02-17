import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getDateRepresentation } from "../../../utils/dateutils";
import UnitLink from "../../links/UnitLink/UnitLink";
import EventLink from "../../links/EventLink/EventLink";
import StatusDone from "../../StatusBadge/StatusDone";
import InProgressStatus from "../../StatusBadge/InProgressStatus";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { makeTaskLinkById } from "../../../routes/paths";
import TaskName from "../common/TaskName";

interface TaskPreviewProps {
    task: TaskResponseItemSchema;
}

export default function TaskPreview(props: TaskPreviewProps) {
    const navigate = useNavigate();

    const onClickMore = (e: React.MouseEvent<any>) => {
        e.stopPropagation();
        navigate(makeTaskLinkById(props.task.id));
    };
    return (
        <>
            <Card
                variant="outlined"
                sx={{
                    minWidth: 275,
                }}
            >
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        <Box component="span" sx={{ marginRight: 1 }}>
                            {props.task.taskStatus ? <StatusDone /> : <InProgressStatus />}
                        </Box>

                        {getDateRepresentation(new Date(props.task.expirationTime))}
                    </Typography>

                    <TaskName name={props.task.name} />
                    <Typography variant="body2">{props.task.description}</Typography>
                    <EventLink id={props.task.event.id} name={props.task.event.name} />
                    <UnitLink id={props.task.department.id} name={props.task.department.name} />
                </CardContent>

                <CardActions>
                    <Button size="small" onClick={onClickMore}>
                        Подробнее
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}
