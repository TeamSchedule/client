import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getDatetimeRepresentation, getPastPeriod } from "../../../utils/dateutils";
import Card from "@mui/material/Card";
import React from "react";
import { useParams } from "react-router-dom";
import useApiCall from "../../../hooks/useApiCall";
import { API } from "../../../api/api";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import { NotificationsStatusEnum } from "../../../enums/notificationsEnum";
import EventLink from "../../links/EventLink/EventLink";
import TaskLink from "../../links/TaskLink";

interface FullNotificationViewProps {}

export default function FullNotificationView(props: FullNotificationViewProps) {
    const { id } = useParams();

    const getNotificationApiCall = useApiCall(() => API.notifications.getById(id || 0), undefined, [id]);
    const notification: NotificationsResponseItemSchema | undefined = getNotificationApiCall.data;
    const read: boolean = notification?.status === NotificationsStatusEnum.READ;

    const getTaskApiCall = useApiCall(
        () => API.tasks.getTaskById(notification?.taskId || 0),
        undefined,
        [notification?.taskId],
        Boolean(notification?.taskId)
    );
    const getEventApiCall = useApiCall(
        () => API.events.getById(notification?.eventId || 0),
        undefined,
        [notification?.eventId],
        Boolean(notification?.eventId)
    );

    if (!notification) {
        return null;
    }

    return (
        <>
            <Card
                sx={{
                    backgroundColor: read ? "#f5f5f5" : "#e5efff",
                    borderRadius: 0,
                    borderBottom: "1px solid grey",
                }}
                elevation={0}
            >
                <CardContent>
                    {" "}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2">
                            {getDatetimeRepresentation(new Date(notification.creationTime))}&nbsp; (
                            {getPastPeriod(new Date(notification.creationTime))})
                        </Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: read ? "normal" : "bold" }}>
                        {notification.message}
                    </Typography>
                    {notification.taskId !== undefined && (
                        <>{getTaskApiCall.success && <TaskLink task={getTaskApiCall.data} />}</>
                    )}
                    {notification.eventId && (
                        <>{getEventApiCall.success && <EventLink event={getEventApiCall.data} />}</>
                    )}
                </CardContent>
            </Card>
        </>
    );
}
