import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";
import { FilterTasksParamsSchema } from "../api/schemas/requests/tasks";
import { compareTasks } from "../utils/taskUtils";
import { action, autorun, computed, makeObservable, observable, runInAction } from "mobx";
import { API } from "../api/api";
import { FetchStatusEnum, FetchStatusStrings } from "../enums/fetchStatusEnum";

class TaskStore {
    tasks: TaskResponseItemSchema[] = [];
    taskFilters: FilterTasksParamsSchema = {};
    fetching: FetchStatusStrings = FetchStatusEnum.FETCHING;

    constructor() {
        makeObservable(this, {
            tasks: observable,
            taskFilters: observable,
            fetching: observable,
            getTaskById: action,
            createTask: action,
            updateTask: action,
            deleteTask: action,
            getEventTasks: action,
            eventTasksTotal: action,
            getUnitTasks: action,
            unitTasksTotal: action,
            prefetchTasks: action,
            getFetchStatus: computed,
            setFetchStatus: action,
        });
        autorun(this.initStore);
        runInAction(this.prefetchTasks);
    }

    getTaskById(id: number): TaskResponseItemSchema | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    createTask(task: TaskResponseItemSchema): void {
        this.tasks.push(task);
    }

    updateTask(taskId: number, taskData: TaskResponseItemSchema) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === taskId) {
                this.tasks[i] = taskData;
                break;
            }
        }
    }

    deleteTask(taskId: number) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    getEventTasks(eventId: number): TaskResponseItemSchema[] {
        // return this.tasks.filter((task: TaskResponseItemSchema) => task.event?.id === eventId).sort(compareTasks);
        return this.tasks;
    }

    eventTasksTotal(eventId: number): number {
        return this.tasks.filter((task: TaskResponseItemSchema) => task.event?.id === eventId).length;
    }

    getUnitTasks(unitId: number): TaskResponseItemSchema[] {
        return this.tasks.filter((task: TaskResponseItemSchema) => task.department.id === unitId).sort(compareTasks);
    }

    unitTasksTotal(unitId: number): number {
        return this.tasks.filter((task: TaskResponseItemSchema) => task.department.id === unitId).length;
    }

    initStore(): void {
        console.log("Task store initialized");
    }

    prefetchTasks = () => {
        this.setFetchStatus(FetchStatusEnum.FETCHING);

        API.tasks
            .getTasks(this.taskFilters)
            .then((tasks: TaskResponseItemSchema[]) => {
                this.setFetchStatus(FetchStatusEnum.SUCCESS);
                this.tasks = tasks.sort(compareTasks);
            })
            .catch(() => {
                this.setFetchStatus(FetchStatusEnum.ERROR);
            })
            .finally();
    };

    get getFetchStatus(): FetchStatusStrings {
        return this.fetching;
    }

    setFetchStatus(newStatus: FetchStatusStrings): void {
        this.fetching = newStatus;
    }
}

let taskStore = new TaskStore();
export default taskStore;
