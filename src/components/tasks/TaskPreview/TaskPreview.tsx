import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import UnitLink from "../../links/UnitLink/UnitLink";
import EventLink from "../../links/EventLink/EventLink";
import { useNavigate } from "react-router-dom";
import { makeTaskLinkById } from "../../../routes/paths";
import TaskName from "../common/TaskName";
import React from "react";
import { TaskDescription } from "../common/common";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";

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
                    marginBottom: 1,
                }}
            >
                <CardContent sx={{ paddingBottom: 0 }}>
                    <DeadlineAndStatus endDate={props.task.expirationTime} status={props.task.taskStatus} />

                    <TaskName name={props.task.name} />
                    <TaskDescription>{props.task.description}</TaskDescription>

                    {props.task.event && <EventLink event={props.task?.event} />}
                    {props.task.department && (
                        <UnitLink id={props.task.department.id} name={props.task.department.name} />
                    )}
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
