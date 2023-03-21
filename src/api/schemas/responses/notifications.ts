import { NotificationsStatusStrings } from "../../../enums/notificationsEnum";

export interface GetNotificationsResponseSchema {
    notifications: Array<NotificationsResponseItemSchema>;
}

export interface NotificationsResponseItemSchema {
    id: number;
    taskId: number;
    eventId: number;
    recipientId: number;
    message: string;
    status: NotificationsStatusStrings;
    creationTime: string;
}
