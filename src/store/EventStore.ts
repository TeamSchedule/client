import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { FetchStatusEnum, FetchStatusStrings } from "../enums/fetchStatusEnum";
import { API } from "../api/api";
import { compareEvent } from "../utils/eventUtils";
import { autorun, makeAutoObservable, runInAction } from "mobx";
import { EventStatusEnum } from "../enums/eventsEnums";

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
        return this.events;
    }

    get getOpenEvents(): EventResponseItemSchema[] {
        return this.events.filter((event) => event.status === EventStatusEnum.IN_PROGRESS);
    }

    get getClosedEvents(): EventResponseItemSchema[] {
        return this.events.filter((event) => event.status === EventStatusEnum.COMPLETED);
    }

    get eventsTotal(): number {
        return this.events.length;
    }

    getById(id: number): EventResponseItemSchema | undefined {
        return this.events.find((event) => event.id === id);
    }

    create(event: EventResponseItemSchema): void {
        this.events.push(event);
    }

    update(eventId: number, eventData: EventResponseItemSchema): void {
        this.events = [...this.events.filter((event) => event.id !== eventId), eventData];
    }

    delete(id: number) {
        this.events = this.events.filter((event) => event.id !== id);
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
