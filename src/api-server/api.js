import {authAPI} from "./authAPI";
import {usersAPI} from "./usersAPI";
import {teamsAPI} from "./teamsAPI";
import {tasksAPI} from "./tasksAPI";


export class API {
    static auth = authAPI;
    static tasks = tasksAPI;
    static teams = teamsAPI;
    static users = usersAPI;
}
