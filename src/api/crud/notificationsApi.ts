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
     * Получить оповещение с указанным идентификатором.
     *
     * @param id - Идентификатор оповещения
     * */
    static async getById(id: number | string): Promise<NotificationsResponseItemSchema> {
        return requestApi.GET(`${this.apiPrefix}/${id}`).then((data: NotificationsResponseItemSchema) => {
            return data;
        });
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
    static async changeNotificationStatus(id: number | string, status: NotificationsStatusStrings): Promise<any> {
        return requestApi.PATCH(`${this.apiPrefix}/${id}?status=${status}`);
    }
}
