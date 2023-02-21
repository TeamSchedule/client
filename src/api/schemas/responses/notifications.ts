export interface GetNotificationsResponseSchema {
    notifications: Array<NotificationsResponseItemSchema>;
}

export interface NotificationsResponseItemSchema {
    id: number;
    date: string;
    text: string;
    isRead: boolean;
}
