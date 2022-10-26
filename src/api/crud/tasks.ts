import $axios from "../axiosRequests";
import {
    CreateTaskRequestSchema,
    FilterTasksParamsSchema,
    UpdateTaskRequestSchema,
} from "../schemas/requests/tasks";

export class tasks {
    static prefixUrl = "/schedule/task";

    static createTask(data: CreateTaskRequestSchema) {
        return $axios.post(`${this.prefixUrl}`, data);
    }

    static async getTasks(params: FilterTasksParamsSchema) {
        if (!params.from) params.from = new Date("1970-01-01");
        if (!params.to) params.to = new Date("2070-01-01");
        if (!params.all) params.all = false;

        return (
            await $axios.get(
                `${
                    this.prefixUrl
                }?from=${params.from.toJSON()}&to=${params.to.toJSON()}&teams=${params.teams.join(
                    ","
                )}&private=true&all=${params.all}`
            )
        ).data["tasks"];
    }

    static async getTaskById(id: number) {
        return (await $axios.get(`${this.prefixUrl}/${id}`)).data;
    }

    static async updateTaskById(id: number, data: UpdateTaskRequestSchema) {
        return await $axios.patch(`${this.prefixUrl}/${id}`, data);
    }

    static async deleteTaskById(taskId: number) {
        return await $axios.delete(`${this.prefixUrl}/${taskId}`);
    }
}
