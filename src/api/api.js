import {auth} from "./crud/auth";
import {users} from "./crud/users";
import {teams} from "./crud/teams";
import {tasks} from "./crud/tasks";
import {invitations} from "./crud/invitations";
import {Avatars} from "./crud/avatars";


export class API {
    static auth = auth;
    static avatars = Avatars;
    static tasks = tasks;
    static teams = teams;
    static users = users;
    static invitations = invitations;
}
