import { NotificationsResponseItemSchema } from "../api/schemas/responses/notifications";
import { NotificationsStatusEnum } from "../enums/notificationsEnum";

export function getOnlyUnreadNotifications(
    notifications: NotificationsResponseItemSchema[]
): NotificationsResponseItemSchema[] {
    return notifications.filter((notification) => notification.status === NotificationsStatusEnum.UNREAD);
}
