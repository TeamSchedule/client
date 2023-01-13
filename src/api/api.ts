import { AuthApi } from "./crud/authApi";
import { EventsApi } from "./crud/eventsApi";
import { BffApi } from "./crud/bffApi";
import { NotificationsApi } from "./crud/notificationsApi";
import { users } from "./crud/users";
import { UnitsApi } from "./crud/unitsApi";
import { tasks } from "./crud/tasks";
import { invitations } from "./crud/invitations";
import { AvatarsApi } from "./crud/avatarsApi";

export class API {
    static auth = AuthApi;
    static avatars = AvatarsApi;
    static events = EventsApi;
    static notifications = NotificationsApi;
    static tasks = tasks;
    static units = UnitsApi;
    static users = users;
    static invitations = invitations;
    static bff = BffApi;
}
