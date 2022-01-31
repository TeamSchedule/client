import $axios from "./axiosRequests";


export class tasksAPI {
    // TODO: static prefixUrl = "/tasks";
    static prefixUrl = "/task";

    static async createTask(data) {
        return await $axios.post("/task", data);
    }


    static async getTasks(params) {
        return await $axios.get(`/task?from=${params.from}&to=${params.to}`);
    }


    static async updateTask(data) {
        return await $axios.patch("/task", data);
    }


    static async deleteTask(taskId) {
        return await $axios.post("/task/" + taskId);
    }

    static async markTaskAsDone(data) {
        return await $axios.post("/task/" + data.id + "/done", data);
    }


    static async markTaskAsOpen(data) {
        return await $axios.post("/task/" + data.id + "/opened", data);
    }
}
