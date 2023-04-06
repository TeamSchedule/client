import { FilterTasksParamsSchema } from "../api/schemas/requests/tasks";
import { autorun, makeAutoObservable } from "mobx";
import { getDateRange } from "../api/utils/buildFilterParams";

class CalendarStore {
    filters: FilterTasksParamsSchema = getDateRange(new Date());

    // начало просматриваемого месяца
    viewedDate: Date = new Date();

    // выбранный день
    chosenDate: Date = new Date();

    constructor() {
        makeAutoObservable(this);
        autorun(() => {
            this.initStore();
        });
    }

    get getFilters(): FilterTasksParamsSchema {
        return this.filters;
    }

    get getViewedDate(): Date {
        return this.viewedDate;
    }

    get getChosenDate(): Date {
        return this.chosenDate;
    }

    cleanFilters(): void {
        this.filters = {};
    }

    setFilters(newFilters: FilterTasksParamsSchema) {
        this.filters = newFilters;
    }

    setToday(): void {
        this.viewedDate = new Date();
        this.chosenDate = new Date();
    }

    setViewedDate(d: Date) {
        this.filters = { ...this.filters, ...getDateRange(d) };
        this.viewedDate = d;
    }

    setChosenDate(d: Date) {
        this.chosenDate = d;
    }

    initStore(): void {
        console.log("Calendar store initialized");
    }
}

let calendarStore = new CalendarStore();
export default calendarStore;
