import React, { useEffect, useRef, useState } from "react";
import "./NotificationsTray.css";
import { sampleNotifications } from "../../../testdata/SampleNotifications";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import { NotificationsStatusEnum } from "../../../enums/notificationsEnum";

export default function NotificationTray() {
    const [notifications, setNotifications] = useState<NotificationsResponseItemSchema[]>([]);

    React.useEffect(() => {
        setNotifications(sampleNotifications);
    }, []);

    const [showNotifications, setShowNotifications] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    const handleIconClick = () => {
        setShowNotifications(!showNotifications);
    };

    const handleMarkAllAsRead = () => {
        const updatedNotifications = notifications.map((notification) => {
            notification.status = NotificationsStatusEnum.READ;
            return notification;
        });
        setNotifications(updatedNotifications);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && event.target && !notificationRef.current.contains(event.target as Node)) {
            setShowNotifications(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    const unreadCount = notifications.filter(
        (notification) => notification.status === NotificationsStatusEnum.UNREAD
    ).length;

    return (
        <div ref={notificationRef}>
            <div className="notification-tray-icon" onClick={handleIconClick}>
                <NotificationsIcon />
                <span className="notification-count">{unreadCount}</span>
            </div>
            {showNotifications && (
                <div className="notification-tray">
                    <span className="mark-all-as-read-text" onClick={handleMarkAllAsRead}>
                        Прочитать все
                    </span>
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={
                                notification.status === NotificationsStatusEnum.READ
                                    ? "read-notification-item"
                                    : "unread-notification-item"
                            }
                        >
                            {/*<h3>{notification.title}</h3>*/}
                            <p>{notification.message}</p>
                            <small>{notification.creationTime}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
