export interface EventResponseItemSchema {
    id: number;
    name: string;
}

export interface EventsResponseSchema {
    events: Array<EventResponseItemSchema>;
}
