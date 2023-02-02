import { CreateTaskRequestSchema, FilterTasksParamsSchema, UpdateTaskRequestSchema } from "../schemas/requests/tasks";
import requestApi from "../fetchApi";

export class tasks {
    static prefixUrl = "/schedule/task";

    static createTask(data: CreateTaskRequestSchema) {
        return requestApi.POST(`${this.prefixUrl}`, data);
    }

    static async getTasks(params: FilterTasksParamsSchema) {
        if (!params.from) params.from = new Date("1970-01-01");
        if (!params.to) params.to = new Date("2070-01-01");
        if (!params.all) params.all = false;

        return (
            await requestApi.GET(
                `${this.prefixUrl}?from=${params.from.toJSON()}&to=${params.to.toJSON()}&teams=${params.teams.join(
                    ","
                )}&private=true&all=${params.all}`
            )
        ).data["tasks"];
    }

    static async getTaskById(id: number) {
        return (await requestApi.GET(`${this.prefixUrl}/${id}`)).data;
    }

    static async updateTaskById(id: number, data: UpdateTaskRequestSchema) {
        return await requestApi.PATCH(`${this.prefixUrl}/${id}`, data);
    }

    static async deleteTaskById(taskId: number) {
        return await requestApi.DELETE(`${this.prefixUrl}/${taskId}`);
    }
}
