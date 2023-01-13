import $axios from "../axiosRequests";

export class NotificationsApi {
    static apiPrefix = "/notifications";

    static async all(): Promise<any> {
        /*
         * Получение всех оповещений.
         * */
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async unread(): Promise<any> {
        /*
         * Получение непрочитанных оповещений.
         * */
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async read(): Promise<any> {
        /*
         * Получение прочитанных оповещений.
         * */
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async makeNotificationRead(id: number): Promise<any> {
        /*
         * Отметить оповещение c id прочитанным.
         * */
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async makeAllNotificationRead(): Promise<any> {
        /*
         * Отметить все оповещения прочитанными.
         * */
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }
}
