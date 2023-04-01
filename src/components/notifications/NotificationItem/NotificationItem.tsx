import React from "react";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import { NotificationsStatusEnum } from "../../../enums/notificationsEnum";
import { useNavigate } from "react-router-dom";
import { makeEventLinkById, makeNotificationLinkById, makeTaskLinkById } from "../../../routes/paths";
import SuccessSnackbar from "../../snackbars/SuccessSnackbar";
import { API } from "../../../api/api";
import { getPastPeriod } from "../../../utils/dateutils";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Tooltip, useTheme } from "@mui/material";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import TaskIcon from "@mui/icons-material/Task";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

interface NotificationItemProps {
    notification: NotificationsResponseItemSchema;
    setNotifications: (value: NotificationsResponseItemSchema[]) => void;
    selected?: boolean;
}

function NotificationItem(props: NotificationItemProps) {
    const navigate = useNavigate();
    const theme = useTheme();

    const notification = props.notification;
    const read: boolean = props.notification.status === NotificationsStatusEnum.READ;

    function handleChangeStatus() {
        if (notification.status === NotificationsStatusEnum.READ) {
            navigate(makeNotificationLinkById(notification.id));
            return;
        }

        API.notifications
            .changeNotificationStatus(notification.id, NotificationsStatusEnum.READ)
            .then(() => {
                // @ts-ignore
                props.setNotifications((prev) => [
                    ...prev.filter((n: NotificationsResponseItemSchema) => n.id !== notification.id),
                    {
                        ...notification,
                        status: NotificationsStatusEnum.READ,
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
                    borderRadius: 0,
                    borderBottom: "1px solid grey",
                    "&:hover": { cursor: "pointer", backgroundColor: "#f1f7ff" },
                    backgroundColor: props.selected ? theme.palette.divider : "none",
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
                                    href={makeTaskLinkById(notification.eventId || 0)}
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
                                    <TaskIcon />
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
