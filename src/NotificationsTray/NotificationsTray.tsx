import React, { useState } from 'react';
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

    const handleIconClick = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div>
            <NotificationsIcon onClick={handleIconClick} />
            {showNotifications && (
                <div className="notification-tray">
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
