import { auth } from "./crud/auth";
import { BffApi } from "./crud/bffApi";
import { users } from "./crud/users";
import { teams } from "./crud/teams";
import { tasks } from "./crud/tasks";
import { invitations } from "./crud/invitations";
import { AvatarsApi } from "./crud/avatarsApi";

export class API {
    static auth = auth;
    static avatars = AvatarsApi;
    static tasks = tasks;
    static teams = teams;
    static users = users;
    static invitations = invitations;
    static bff = BffApi;
}
