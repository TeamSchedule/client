import { auth } from "./crud/auth";
import { EventsApi } from "./crud/eventsApi";
import { BffApi } from "./crud/bffApi";
import { users } from "./crud/users";
import { UnitsApi } from "./crud/unitsApi";
import { tasks } from "./crud/tasks";
import { invitations } from "./crud/invitations";
import { AvatarsApi } from "./crud/avatarsApi";

export class API {
    static auth = auth;
    static avatars = AvatarsApi;
    static events = EventsApi;
    static tasks = tasks;
    static units = UnitsApi;
    static users = users;
    static invitations = invitations;
    static bff = BffApi;
}
