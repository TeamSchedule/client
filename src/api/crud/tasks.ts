import { CreateTaskRequestSchema, FilterTasksParamsSchema, UpdateTaskRequestSchema } from "../schemas/requests/tasks";
import requestApi from "../fetchApi";
import { GetTasksResponseSchema, TaskResponseItemSchema } from "../schemas/responses/tasks";

export class tasks {
    static prefixUrl = "/schedule/task";

    static createTask(data: CreateTaskRequestSchema) {
        return requestApi.POST(`${this.prefixUrl}`, { body: data });
    }

    static async getTasks(params: FilterTasksParamsSchema): Promise<TaskResponseItemSchema[]> {
        const filteredParams: object = Object.fromEntries(
            Object.entries(params).filter((pair) => pair[1] !== undefined)
        );
        return (
            requestApi
                // @ts-ignore
                .GET(`${this.prefixUrl}?` + new URLSearchParams(filteredParams).toString())
                .then((data: GetTasksResponseSchema) => {
                    return data.tasks;
                })
        );
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
