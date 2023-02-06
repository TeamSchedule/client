import {
    EventResponseItemSchema,
    GetEventsResponseSchema,
    GetEventByIdResponseSchema,
} from "../schemas/responses/events";
import { CreateEventRequestSchema } from "../schemas/requests/events";
import requestApi from "../fetchApi";

export class EventsApi {
    static apiPrefix: string = "/events";

    /**
     * Получить все события.
     * */
    static async all(): Promise<EventResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}`).then((data: GetEventsResponseSchema) => {
            return data.events;
        });
    }

    /**
     * Получить событие с указанным `id`.
     *
     * @param id - Идентификатор события
     * */
    static async getById(id: number): Promise<EventResponseItemSchema> {
        return requestApi.GET(`${this.apiPrefix}/${id}`).then((data: GetEventByIdResponseSchema) => {
            return data.event;
        });
    }

    /**
     * Создать новое событие.
     *
     * @param data - Объект с данными события
     * */
    static async createEvent(data: CreateEventRequestSchema) {
        return requestApi.POST(`${this.apiPrefix}`, { body: data });
    }
}
