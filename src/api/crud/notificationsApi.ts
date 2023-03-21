import requestApi from "../fetchApi";
import { GetNotificationsResponseSchema, NotificationsResponseItemSchema } from "../schemas/responses/notifications";
import { NotificationsStatusStrings } from "../../enums/notificationsEnum";

/**
 * Класс с методами доступа к api оповещений.
 * */
export class NotificationsApi {
    static apiPrefix = "/schedule/notification";

    /**
     * Получить все оповещения.
     * */
    static async all(id: number | string): Promise<NotificationsResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}?recipient_id=${id}`).then((data: GetNotificationsResponseSchema) => {
            return data.notifications;
        });
    }

    /**
     * Получить непрочитанные оповещения.
     * */
    static async unread(): Promise<NotificationsResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}`);
    }

    /**
     * Получить прочитанные оповещения.
     * */
    static async read(): Promise<NotificationsResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}`);
    }

    /**
     * Отметить оповещение c указанным `id` прочитанным.
     *
     * @param id - Идентификатор оповещения
     * @param status - Новый статус оповещения
     * */
    static async makeNotificationRead(id: number | string, status: NotificationsStatusStrings): Promise<any> {
        return requestApi.PATCH(`${this.apiPrefix}/${id}?status=${status}`);
    }

    /**
     * Отметить все оповещения прочитанными.
     * */
    static async makeAllNotificationRead(): Promise<any> {
        return requestApi.GET(`${this.apiPrefix}`);
    }
}
