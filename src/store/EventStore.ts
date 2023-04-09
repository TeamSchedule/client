import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { FetchStatusEnum, FetchStatusStrings } from "../enums/fetchStatusEnum";
import { API } from "../api/api";
import { compareEvent } from "../utils/eventUtils";
import { autorun, makeAutoObservable, runInAction } from "mobx";
import { EventStatusEnum } from "../enums/eventsEnums";
import { isEqualYearMonthDate } from "../utils/dateutils";

class EventStore {
    events: EventResponseItemSchema[] = [];
    fetching: FetchStatusStrings = FetchStatusEnum.FETCHING;

    constructor() {
        makeAutoObservable(this);
        autorun(() => {
            this.initStore();
        });
        runInAction(this.prefetchData);
    }

    initStore(): void {
        console.log("Event global store initialized");
    }

    get getAllEvents(): EventResponseItemSchema[] {
        return this.events.slice().sort(compareEvent);
    }

    get getOpenEvents(): EventResponseItemSchema[] {
        return this.events.filter((event) => event.status === EventStatusEnum.IN_PROGRESS).sort(compareEvent);
    }

    get getClosedEvents(): EventResponseItemSchema[] {
        return this.events.filter((event) => event.status === EventStatusEnum.COMPLETED).sort(compareEvent);
    }

    get eventsTotal(): number {
        return this.events.length;
    }

    get openEventsTotal(): number {
        return this.events.filter((event) => event.status === EventStatusEnum.IN_PROGRESS).length;
    }

    get closedEventsTotal(): number {
        return this.events.filter((event) => event.status === EventStatusEnum.COMPLETED).length;
    }

    getById(id: number): EventResponseItemSchema | undefined {
        if (!id) {
            console.log("Wrong event id.");
            return undefined;
        }
        return this.events.find((event) => event.id === id);
    }

    create(event: EventResponseItemSchema): void {
        this.events.push(event);
    }

    update(eventId: number, eventData: EventResponseItemSchema): void {
        if (!eventId) {
            console.log("Wrong event id. Store update error!");
            return;
        }
        this.events = [...this.events.filter((event) => event.id !== eventId), eventData];
        console.log("E");
        console.log(this.events);
    }

    delete(id: number) {
        this.events = this.events.filter((event) => event.id !== id);
    }

    getDayEvents(day: Date): EventResponseItemSchema[] {
        return this.events.filter((event) => isEqualYearMonthDate(new Date(event.endDate), day)).sort(compareEvent);
    }

    prefetchData = () => {
        this.setFetchStatus(FetchStatusEnum.FETCHING);

        API.events
            .all()
            .then((data: EventResponseItemSchema[]) => {
                this.setFetchStatus(FetchStatusEnum.SUCCESS);
                this.events = data.sort(compareEvent);
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

let eventStore = new EventStore();
export default eventStore;
