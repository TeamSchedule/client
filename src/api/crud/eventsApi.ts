import {
    CreateEventResponseSchema,
    EditEventResponseSchema,
    EventResponseItemSchema,
    GetEventsResponseSchema,
} from "../schemas/responses/events";
import { CreateEventRequestSchema, EditEventRequestSchema } from "../schemas/requests/events";
import requestApi from "../fetchApi";
import { EventStatusStrings } from "../../enums/eventsEnums";

export class EventsApi {
    static apiPrefix: string = "/schedule/event";

    /**
     * Получить все события.
     * */
    static async all(): Promise<EventResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}`).then((data: GetEventsResponseSchema) => {
            for (let i = 0; i < data.events.length; i++) {
                data.events[i].files = [];
                data.events[i].tasks = [];
            }
            return data.events;
        });
    }

    /**
     * Получить событие с указанным `id`.
     *
     * @param id - Идентификатор события
     * */
    static async getById(id: number): Promise<EventResponseItemSchema> {
        return requestApi.GET(`${this.apiPrefix}/${id}`);
    }

    /**
     * Создать новое событие.
     *
     * @param data - Объект с данными события
     * */
    static async createEvent(data: CreateEventRequestSchema): Promise<CreateEventResponseSchema> {
        return requestApi.POST(`${this.apiPrefix}`, { body: data });
    }

    /**
     * Изменить событие.
     *
     * @param data - Объект с данными события
     * */
    static async editEvent(data: EditEventRequestSchema): Promise<EditEventResponseSchema> {
        return requestApi.POST(`${this.apiPrefix}`, { body: data });
    }

    /**
     * Изменить статус события.
     *
     * @param id - Идентификатор события
     * @param status - Новый статус события
     * */
    static async changeEventStatus(id: number, status: EventStatusStrings): Promise<EditEventResponseSchema> {
        return requestApi.PATCH(`${this.apiPrefix}/${id}`, { body: { status: status } });
    }
}
