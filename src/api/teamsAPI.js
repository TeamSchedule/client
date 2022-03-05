import $axios from "./axiosRequests";


export class teamsAPI {
    // TODO: should be: static apiPrefix = "/teams";
    static apiPrefix = "/team";

    static async all() {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async get(id) {
        return (await $axios.get(`${this.apiPrefix}/${id}`)).data;
    }

    static async leave(teamId) {
        return (await $axios.delete(`${this.apiPrefix}/${teamId}/user`)).data;
    }

    static async create(data) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }

    static async update(data) {
        return (await $axios.put(`${this.apiPrefix}/${data.id}`, data)).data;
    }
}
