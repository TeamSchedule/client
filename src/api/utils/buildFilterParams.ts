import { FilterTasksParamsSchema } from "../schemas/requests/tasks";
import { UserSchema } from "../schemas/responses/users";
import { UnitResponseItemSchema } from "../schemas/responses/units";
import { EventResponseItemSchema } from "../schemas/responses/events";

export const FetchingMonthRange: number = 2;

export default function buildFilterParams(
    chosenDate: Date,
    selectedUnits: UnitResponseItemSchema[] = [],
    selectedEvents: EventResponseItemSchema[] = [],
    selectedUsers: UserSchema[] = []
): FilterTasksParamsSchema {
    const params: FilterTasksParamsSchema = {
        from: new Date(chosenDate.getFullYear(), chosenDate.getMonth() - FetchingMonthRange, 1).toJSON(),
        to: new Date(chosenDate.getFullYear(), chosenDate.getMonth() + FetchingMonthRange).toJSON(),
    };

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
