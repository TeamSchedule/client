import $axios from "../axiosRequests";


export class tasks {
    static prefixUrl = "/schedule/task";

    static async createTask(data) {
        return await $axios.post(`${this.prefixUrl}`, data);
    }

    static async getTasks(params) {
        return (await $axios.get(`${this.prefixUrl}?from=${params.from}&to=${params.to}&teams=${params.teams}`))
            .data["tasks"];
    }

    static async getTask(id) {
        return (await $axios.get(`${this.prefixUrl}/${id}`)).data;
    }

    static async updateTask(id, data) {
        return await $axios.patch(`${this.prefixUrl}/${id}`, data);
    }

    static async deleteTask(taskId) {
        return await $axios.delete(`${this.prefixUrl}/${taskId}`);
    }
}
