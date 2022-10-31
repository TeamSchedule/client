import $axios from "../axiosRequests";
import { CreateTeamRequestSchema, UpdateTeamRequestSchema } from "../schemas/requests/teams";
import { TeamsResponseItemSchema } from "../schemas/responses/teams";

export class teams {
    static apiPrefix = "/schedule/team";

    static async all(): Promise<Array<TeamsResponseItemSchema>> {
        return (await $axios.get(`${this.apiPrefix}`)).data["teams"];
    }

    static async get(id: number) {
        return (await $axios.get(`${this.apiPrefix}/${id}`)).data["team"];
    }

    static async leave(teamId: number) {
        return (await $axios.delete(`${this.apiPrefix}/${teamId}/user`)).data;
    }

    static async createTeam(data: CreateTeamRequestSchema) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }

    static update(teamId: number, data: UpdateTeamRequestSchema) {
        return $axios.patch(`${this.apiPrefix}/${teamId}`, data);
    }
}
