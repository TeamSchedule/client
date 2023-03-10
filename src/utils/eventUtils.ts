import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { compareDatetime } from "./dateutils";

export function compareEvent(a: EventResponseItemSchema, b: EventResponseItemSchema): number {
    const byDatetime: number = compareDatetime(new Date(a.endDate), new Date(b.endDate));
    if (byDatetime) return byDatetime;
    return a.id - b.id;
}
