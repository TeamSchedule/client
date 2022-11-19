import $axios from "../axiosRequests";

export class BffApi {
    static apiPrefix: string = "/bff";

    static getTeamData(teamId: number) {
        return $axios.get(`${this.apiPrefix}/team/${teamId}`).then((res) => res.data);
    }
}
