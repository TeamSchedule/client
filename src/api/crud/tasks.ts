import { CreateTaskRequestSchema, FilterTasksParamsSchema, UpdateTaskRequestSchema } from "../schemas/requests/tasks";
import requestApi from "../fetchApi";
import { GetTasksResponseSchema, TaskResponseItemSchema } from "../schemas/responses/tasks";

export class tasks {
    static prefixUrl = "/schedule/task";

    static createTask(data: CreateTaskRequestSchema) {
        return requestApi.POST(`${this.prefixUrl}`, { body: data });
    }

    static async getTasks(params: FilterTasksParamsSchema): Promise<TaskResponseItemSchema[]> {
        if (!params.from) params.from = new Date("1970-01-01");
        if (!params.to) params.to = new Date("2070-01-01");
        if (!params.all) params.all = false;

        return requestApi
            .GET(
                `${this.prefixUrl}?from=${params.from.toJSON()}&to=${params.to.toJSON()}&teams=${params.teams?.join(
                    ","
                )}&private=true&all=${params.all}`
            )
            .then((data: GetTasksResponseSchema) => {
                return data.tasks;
            });
    }

    static async getTaskById(id: number): Promise<TaskResponseItemSchema> {
        return requestApi.GET(`${this.prefixUrl}/${id}`);
    }

    static async updateTaskById(id: number, data: UpdateTaskRequestSchema) {
        return requestApi.PATCH(`${this.prefixUrl}/${id}`, { body: data });
    }

    static async deleteTaskById(taskId: number) {
        return requestApi.DELETE(`${this.prefixUrl}/${taskId}`);
    }
}
