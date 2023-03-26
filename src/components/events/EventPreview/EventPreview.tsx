import { EventResponseItemSchema } from "../../../api/schemas/responses/events";
import { useNavigate } from "react-router-dom";
import { makeEventLinkById } from "../../../routes/paths";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Box, IconButton, Tooltip, useTheme } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { EventColorLeft, EventDescription, EventName } from "../common";
import DeadlineAndStatus from "../../common/tasks_events/DeadlineAndStatus";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";

interface EventPreviewProps {
    event: EventResponseItemSchema;
    selected?: boolean;
}

export default function EventPreview(props: EventPreviewProps) {
    const navigate = useNavigate();
    const theme = useTheme();

    const onClickEvent = (event: React.MouseEvent<any>) => {
        event.preventDefault();
        event.stopPropagation();
        navigate(makeEventLinkById(props.event.id));
    };

    const openTasks: number = 0;

    return (
        <>
            <Card
                sx={{
                    minWidth: 280,
                    my: 0,
                    "&:hover": { cursor: "pointer", backgroundColor: "#f1f7ff" },
                    backgroundColor: props.selected ? theme.palette.divider : "none",
                    borderRadius: 0,
                }}
                onClick={() => {
                    navigate(makeEventLinkById(props.event.id));
                }}
                elevation={0}
            >
                <CardContent sx={{ paddingBottom: 0 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <DeadlineAndStatus endDate={props.event.endDate} status={props.event.status} />
                        <Tooltip title="Редактировать">
                            <IconButton
                                sx={{ p: 0 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(makeEventLinkById(props.event.id) + "/edit");
                                }}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
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

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "stretch" }}>
                        <EventColorLeft color={props.event.color} />
                        <Link href={makeEventLinkById(props.event.id)} onClick={onClickEvent}>
                            <EventName>{props.event.name}</EventName>
                        </Link>
                    </Box>

                    <EventDescription>{props.event.description}</EventDescription>
                </CardContent>
            </Card>
        </>
    );
}
