import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { compareDatetime } from "./dateutils";
import { EventStatusEnum } from "../enums/eventsEnums";

export function compareEvent(a: EventResponseItemSchema, b: EventResponseItemSchema): number {
    const byDatetime: number = compareDatetime(new Date(a.endDate), new Date(b.endDate));
    if (byDatetime) return byDatetime;
    return a.id - b.id;
}

export function getOnlyCompletedEvents(events: EventResponseItemSchema[]): EventResponseItemSchema[] {
    return events.filter((event) => event.status === EventStatusEnum.COMPLETED);
}

export function getOnlyOpenEvents(events: EventResponseItemSchema[]): EventResponseItemSchema[] {
    return events.filter((event) => event.status === EventStatusEnum.IN_PROGRESS);
}
