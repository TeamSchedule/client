import requestApi from "../fetchApi";
import { NotificationsResponseItemSchema } from "../schemas/responses/notifications";

/**
 * Класс с методами доступа к api оповещений.
 * */
export class NotificationsApi {
    static apiPrefix = "/notifications";

    /**
     * Получить все оповещения.
     * */
    static async all(): Promise<NotificationsResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}`);
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
     * */
    static async makeNotificationRead(id: number): Promise<any> {
        return requestApi.GET(`${this.apiPrefix}`);
    }

    /**
     * Отметить все оповещения прочитанными.
     * */
    static async makeAllNotificationRead(): Promise<any> {
        return requestApi.GET(`${this.apiPrefix}`);
    }
}
