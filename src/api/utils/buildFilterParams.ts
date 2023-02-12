import { FilterTasksParamsSchema } from "../schemas/requests/tasks";
import { UserSchema } from "../schemas/responses/users";
import { UnitResponseItemSchema } from "../schemas/responses/units";
import { EventResponseItemSchema } from "../schemas/responses/events";

const FetchingMonthRange: number = 2;

export default function buildFilterParams(
    chosenDate: Date,
    selectedUnits: UnitResponseItemSchema[] = [],
    selectedEvents: EventResponseItemSchema[] = [],
    selectedUsers: UserSchema[] = []
): FilterTasksParamsSchema {
    return {
        from: new Date(chosenDate.getFullYear(), chosenDate.getMonth() - FetchingMonthRange, 1),
        to: new Date(chosenDate.getFullYear(), chosenDate.getMonth() + FetchingMonthRange),
        teams: selectedUnits.map((unit) => unit.id),
        events: selectedEvents.map((event) => event.id),
        users: selectedUsers.map((user) => user.id),
    } as FilterTasksParamsSchema;
}
