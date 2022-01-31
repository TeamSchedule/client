import $axios from "./axiosRequests";


export class teamsAPI {
    static apiPrefix = "/team";

    static async getUserTeams() {
        return (await $axios.get(`${this.apiPrefix}`)).data;
    }

    static async createTeam(data) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }

    static async editTeam(data) {
        return (await $axios.put(`${this.apiPrefix}/${data.id}`, data)).data;
    }
}
