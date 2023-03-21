import React from 'react';
import './NotificationItem.css'
import { Notification } from '../Models/Notification';
import TextHelp from '../TextHelp/TextHelp';
import { TaskAlt, EventNote } from '@mui/icons-material';

interface NotificationItemProps {
    notification: Notification;
    onClick: (notificationId: number) => void;
}

function NotificationItem(props: NotificationItemProps) {
    const { notification, onClick } = props;

    const handleClick = () => {
        onClick(notification.id);
    };

    return (
        <li
            key={notification.id}
            className={
                notification.read ? 'read-notification' : 'unread-notification'
            }
            onClick={handleClick}
        >
            <h3>
                {notification.title}
                {notification.taskId && (
                    <span onClick={() => (window.location.href = '/tasks')}>
                        <TextHelp title="Перейти к задаче" icon={<TaskAlt />} />
                    </span>
                )}
                {notification.eventId && (
                    <span onClick={() => (window.location.href = '/events')}>
                        <TextHelp title="Перейти к событию" icon={<EventNote />} />
                    </span>
                )}
            </h3>
            <p>{notification.description}</p>
            <small>{notification.dt_created}</small>
        </li>
    );
}

export default NotificationItem;
