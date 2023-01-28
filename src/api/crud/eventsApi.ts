import $axios from "../axiosRequests";
import {
    EventResponseItemSchema,
    GetAllEventsResponseSchema,
    GetEventByIdResponseSchema,
} from "../schemas/responses/events";
import { CreateEventRequestSchema } from "../schemas/requests/events";

export class EventsApi {
    static apiPrefix: string = "/events";

    /**
     * Получить все события.
     * */
    static async all(): Promise<EventResponseItemSchema[]> {
        return $axios
            .get(`${this.apiPrefix}`)
            .then((r) => {
                return r.data;
            })
            .then((data: GetAllEventsResponseSchema) => {
                return data.events;
            });
    }

    /**
     * Получить событие с указанным `id`.
     *
     * @param id - Идентификатор события
     * */
    static async getById(id: number): Promise<EventResponseItemSchema> {
        return $axios
            .get(`${this.apiPrefix}/${id}`)
            .then((r) => {
                return r.data;
            })
            .then((data: GetEventByIdResponseSchema) => {
                return data.event;
            });
    }

    /**
     * Создать новое событие.
     *
     * @param data - Объект с данными события
     * */
    static async createEvent(data: CreateEventRequestSchema) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }
}
