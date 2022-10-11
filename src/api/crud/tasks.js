import $axios from "../axiosRequests";

export class tasks {
    static prefixUrl = "/schedule/task";

    static create(data) {
        return $axios.post(`${this.prefixUrl}`, data);
    }

    static async getTasks(params) {
        return (
            await $axios.get(
                `${this.prefixUrl}?from=${params.from}&to=${params.to}&teams=${params.teams}&private=true`
            )
        ).data["tasks"];
    }

    static async get(id) {
        return (await $axios.get(`${this.prefixUrl}/${id}`)).data;
    }

    static async update(id, data) {
        return await $axios.patch(`${this.prefixUrl}/${id}`, data);
    }

    static async delete(taskId) {
        return await $axios.delete(`${this.prefixUrl}/${taskId}`);
    }
}
