import $axios from "../axiosRequests";
import { EventResponseItemSchema, EventsResponseSchema } from "../../schemas/responses/events";
import { CreateEventRequestSchema } from "../../schemas/requests/events";

export class EventsApi {
    static apiPrefix: string = "/events";

    static async all(): Promise<EventsResponseSchema> {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async getById(id: number): Promise<EventResponseItemSchema> {
        return (await $axios.get(`${this.apiPrefix}/${id}`)).data;
    }

    static async createEvent(data: CreateEventRequestSchema) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }
}
