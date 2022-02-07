import {authAPI} from "./authAPI";
import {usersAPI} from "./usersAPI";
import {teamsAPI} from "./teamsAPI";
import {tasksAPI} from "./tasksAPI";
import {invitationsAPI} from "./invitationsAPI";


export class API {
    static auth = authAPI;
    static tasks = tasksAPI;
    static teams = teamsAPI;
    static users = usersAPI;
    static invitations = invitationsAPI;
}
