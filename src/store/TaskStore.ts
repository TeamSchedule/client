import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";
import { compareTasks } from "../utils/taskUtils";
import { autorun, makeAutoObservable, runInAction } from "mobx";
import { API } from "../api/api";
import { FetchStatusEnum, FetchStatusStrings } from "../enums/fetchStatusEnum";
import calendarStore from "./CalendarStore";
import { isEqualYearMonthDate } from "../utils/dateutils";
import { CalendarPath } from "../routes/paths";

class TaskStore {
    tasks: TaskResponseItemSchema[] = [];
    fetching: FetchStatusStrings = FetchStatusEnum.FETCHING;

    constructor() {
        makeAutoObservable(this);
        autorun(() => {
            this.initStore();
        });
        runInAction(this.prefetchTasks);
    }

    getById(id: number): TaskResponseItemSchema | undefined {
        return this.tasks.find((task) => task.id === id);
    }

    create(task: TaskResponseItemSchema): void {
        this.tasks.push(task);
    }

    update(taskId: number, taskData: TaskResponseItemSchema) {
        this.tasks = [...this.tasks.filter((task) => task.id !== taskId), taskData];
    }

    updateMany(tasks: TaskResponseItemSchema[]) {
        if (tasks.length === 0) return;

        const updatedIds: number[] = tasks.map((task) => task.id);
        this.tasks = [...this.tasks.filter((task) => !updatedIds.includes(task.id)), ...tasks];
    }

    delete(taskId: number) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    getDayTasks(day: Date): TaskResponseItemSchema[] {
        return this.tasks.filter((task) => isEqualYearMonthDate(new Date(task.expirationTime), day));
    }

    getUnitTasks(id: number): TaskResponseItemSchema[] {
        return this.tasks.filter((task) => task.department?.id === id);
    }

    getEventTasks(id: number): TaskResponseItemSchema[] {
        return this.tasks.filter((task) => task.event?.id === id);
    }

    initStore(): void {
        console.log("Task store initialized");
    }

    prefetchTasks = () => {
        if (!window.location.pathname.startsWith(CalendarPath)) return;

        this.setFetchStatus(FetchStatusEnum.FETCHING);

        API.tasks
            .getTasks(calendarStore.getFilters)
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
