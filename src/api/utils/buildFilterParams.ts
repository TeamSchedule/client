import { FilterTasksParamsSchema } from "../schemas/requests/tasks";
import { UserSchema } from "../schemas/responses/users";
import { UnitResponseItemSchema } from "../schemas/responses/units";
import { EventResponseItemSchema } from "../schemas/responses/events";

export const FetchingMonthRange: number = 2;

export function getDateRange(d: Date): object {
    return {
        from: new Date(d.getFullYear(), d.getMonth() - FetchingMonthRange, 1).toJSON(),
        to: new Date(d.getFullYear(), d.getMonth() + FetchingMonthRange).toJSON(),
    };
}

export default function buildFilterParams(
    viewedDate: Date,
    selectedUnits: UnitResponseItemSchema[] = [],
    selectedEvents: EventResponseItemSchema[] = [],
    selectedUsers: UserSchema[] = []
): FilterTasksParamsSchema {
    const params: FilterTasksParamsSchema = getDateRange(viewedDate);

    if (selectedUnits.length > 0) {
        params.departments = selectedUnits.map((unit) => unit.id);
    }
    if (selectedEvents.length > 0) {
        params.events = selectedEvents.map((unit) => unit.id);
    }
    if (selectedUsers.length > 0) {
        params.assignee = selectedUsers.map((unit) => unit.id);
    }

    return params;
}
