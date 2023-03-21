import React, { useState, useRef, useEffect } from 'react';
import './NotificationsTray.css'
import { Notification } from '../Models/Notification';
import { sampleNotifications } from '../SampleNotifications/SampleNotifications';
import NotificationsIcon from '@mui/icons-material/Notifications';

function NotificationTray() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

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
            notification.read = true;
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
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const unreadCount = notifications.filter(notification => !notification.read).length;

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
                                notification.read ? 'read-notification-item' : 'unread-notification-item'
                            }>
                            <h3>{notification.title}</h3>
                            <p>{notification.description}</p>
                            <small>{notification.dt_created}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationTray;
