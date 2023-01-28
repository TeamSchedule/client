import $axios from "../axiosRequests";

/**
 * Класс с методами доступа к api оповещений.
 * */
export class NotificationsApi {
    static apiPrefix = "/notifications";

    /**
     * Получить все оповещения.
     * */
    static async all(): Promise<any> {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    /**
     * Получить непрочитанные оповещения.
     * */
    static async unread(): Promise<any> {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    /**
     * Получить прочитанные оповещения.
     * */
    static async read(): Promise<any> {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    /**
     * Отметить оповещение c указанным `id` прочитанным.
     *
     * @param id - Идентификатор оповещения
     * */
    static async makeNotificationRead(id: number): Promise<any> {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    /**
     * Отметить все оповещения прочитанными.
     * */
    static async makeAllNotificationRead(): Promise<any> {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }
}
