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

    static async setAvatar(teamId: string, avatarImage: string | Blob) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        let formData = new FormData();
        formData.append("avatar", avatarImage);

        return await $axios.post(`/avatar/teams/${teamId}`, formData, config).catch(() => {
            alert("Could not save image! Try later");
        });
    }

    static async deleteAvatar(teamId: string) {
        return await $axios.delete(`/avatar/teams/${teamId}`);
    }
}
