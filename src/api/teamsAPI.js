import $axios from "./axiosRequests";


export class teamsAPI {
    static apiPrefix = "/schedule/team";

    static async all() {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async get(id) {
        return (await $axios.get(`${this.apiPrefix}/${id}`)).data["team"];
    }

    static async leave(teamId) {
        return (await $axios.delete(`${this.apiPrefix}/${teamId}/user`)).data;
    }

    static async create(data) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }

    static async update(teamId, data) {
        return (await $axios.patch(`${this.apiPrefix}/${teamId}`, data)).data;
    }
}
