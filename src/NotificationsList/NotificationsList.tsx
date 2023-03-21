import React, { useState } from 'react';
import './NotificationsList.css';
import { sampleNotifications } from '../SampleNotifications/SampleNotifications';
import { Alert, Snackbar } from '@mui/material';
import { Notification } from '../Models/Notification';
import NotificationItem from '../NotificationItem/NotificationItem';

function NotificationsList() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    React.useEffect(() => {
        setNotifications(sampleNotifications);
    }, []);

    const [open, setOpen] = useState(false);

    const handleNotificationClick = (notificationId: number) => {
        const notificationToUpdate = notifications.find(
            (notification) => notification.id === notificationId
        );

        if (notificationToUpdate && !notificationToUpdate.read) {
            const updatedNotifications = notifications.map((notification) => {
                if (notification.id === notificationId) {
                    return {
                        ...notification,
                        read: true,
                    };
                }
                return notification;
            });
            setNotifications(updatedNotifications);
            setOpen(true);
        }
    };

    return (
        <div>
            <h1>Уведомления</h1>
            <ul className="notifications">
                {notifications.map((notification) => (
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onClick={handleNotificationClick}
                    />
                ))}
            </ul>
            <div>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={() => setOpen(false)}
                    message="Note archived"
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Прочитано!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    );
}

export default NotificationsList;
