import $axios from "../axiosRequests";
import { CreateUnitRequestSchema, UpdateTeamRequestSchema } from "../../schemas/requests/units";
import { UnitsResponseItemSchema } from "../../schemas/responses/units";

export class UnitsApi {
    static apiPrefix = "/schedule/team";

    static async all(): Promise<Array<UnitsResponseItemSchema>> {
        return (await $axios.get(`${this.apiPrefix}`)).data["teams"];
    }

    static async getById(id: number) {
        return (await $axios.get(`${this.apiPrefix}/${id}`)).data["team"];
    }

    static async leave(teamId: number) {
        return (await $axios.delete(`${this.apiPrefix}/${teamId}/user`)).data;
    }

    static async createUnit(data: CreateUnitRequestSchema) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }

    static update(unitId: number, data: UpdateTeamRequestSchema) {
        return $axios.patch(`${this.apiPrefix}/${unitId}`, data);
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
