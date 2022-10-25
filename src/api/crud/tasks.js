import $axios from "../axiosRequests";

export class tasks {
    static prefixUrl = "/schedule/task";

    static create(data) {
        return $axios.post(`${this.prefixUrl}`, data);
    }

    static async getTasks(params) {
        if (!params.from) params.from = new Date("1970-01-01").toJSON();
        if (!params.to) params.to = new Date("2070-01-01").toJSON();
        if (!params.all) params.all = false;
        return (
            await $axios.get(
                `${this.prefixUrl}?from=${params.from}&to=${params.to}&teams=${params.teams}&private=true&all=${params.all}`
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
