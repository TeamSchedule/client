import React from "react";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import { NotificationsStatusEnum, NotificationsStatusStrings } from "../../../enums/notificationsEnum";
import { useNavigate } from "react-router-dom";
import { makeEventLinkById, makeNotificationLinkById, makeTaskLinkById } from "../../../routes/paths";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { API } from "../../../api/api";
import { getPastPeriod } from "../../../utils/dateutils";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Tooltip } from "@mui/material";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

interface NotificationItemProps {
    notification: NotificationsResponseItemSchema;
    setNotifications: (value: NotificationsResponseItemSchema[]) => void;
}

function NotificationItem(props: NotificationItemProps) {
    const navigate = useNavigate();

    const notification = props.notification;
    const read: boolean = props.notification.status === NotificationsStatusEnum.READ;

    function handleChangeStatus() {
        const newStatus: NotificationsStatusStrings = read
            ? NotificationsStatusEnum.UNREAD
            : NotificationsStatusEnum.READ;
        API.notifications
            .changeNotificationStatus(notification.id, newStatus)
            .then(() => {
                // @ts-ignore
                props.setNotifications((prev) => [
                    ...prev.filter((n: NotificationsResponseItemSchema) => n.id !== notification.id),
                    {
                        ...notification,
                        status: newStatus,
                    },
                ]);
                navigate(makeNotificationLinkById(notification.id));
            })
            .catch(() => {})
            .finally(() => {
                navigate(makeNotificationLinkById(notification.id));
            });
    }

    return (
        <>
            <Card
                key={notification.id}
                sx={{
                    cursor: "pointer",
                    backgroundColor: read ? "#f5f5f5" : "#e5efff",
                    borderRadius: 0,
                    borderBottom: "1px solid grey",
                }}
                onClick={handleChangeStatus}
                elevation={0}
            >
                <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: read ? "normal" : "bold" }}>
                        {notification.message}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body2">
                            {/*{getDatetimeRepresentation(new Date(notification.creationTime))}*/}
                            {getPastPeriod(new Date(notification.creationTime))}
                        </Typography>

                        {notification.taskId !== undefined && (
                            <Tooltip title="Перейти к задаче">
                                <Link
                                    href={makeEventLinkById(notification.eventId || 0)}
                                    component="a"
                                    variant="body2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        if (notification.taskId) {
                                            navigate(makeTaskLinkById(notification.taskId));
                                        }
                                    }}
                                    sx={{ mx: 1 }}
                                >
                                    <LocalActivityIcon />
                                </Link>
                            </Tooltip>
                        )}
                        {notification.eventId && (
                            <Tooltip title="Перейти к событию">
                                <Link
                                    href={makeEventLinkById(notification.eventId || 0)}
                                    component="a"
                                    variant="body2"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        if (notification.eventId) {
                                            navigate(makeEventLinkById(notification.eventId));
                                        }
                                    }}
                                    sx={{ mx: 1 }}
                                >
                                    <LocalActivityIcon color="primary" />
                                </Link>
                            </Tooltip>
                        )}
                    </Box>
                </CardContent>
            </Card>

            <SuccessSnackbar isOpen={false} handleClose={() => {}}>
                Прочитано!
            </SuccessSnackbar>
        </>
    );
}

export default NotificationItem;
