import { autorun, makeAutoObservable, runInAction } from "mobx";
import { FetchStatusEnum, FetchStatusStrings } from "../enums/fetchStatusEnum";
import { API } from "../api/api";
import { UserSchema } from "../api/schemas/responses/users";

class AuthUserStore {
    user: UserSchema | undefined = undefined;
    fetching: FetchStatusStrings = FetchStatusEnum.FETCHING;

    constructor() {
        makeAutoObservable(this);
        autorun(() => {
            this.initStore();
        });
        runInAction(this.prefetchMe);
    }

    initStore(): void {
        console.log("Auth user store initialized");
    }

    delete() {
        this.user = undefined;
    }

    update(newUserData: UserSchema) {
        this.user = newUserData;
    }

    get getFetchStatus(): FetchStatusStrings {
        return this.fetching;
    }

    setFetchStatus(newStatus: FetchStatusStrings): void {
        this.fetching = newStatus;
    }

    prefetchMe = () => {
        this.setFetchStatus(FetchStatusEnum.FETCHING);

        API.users
            .getMe()
            .then((user: UserSchema) => {
                this.setFetchStatus(FetchStatusEnum.SUCCESS);
                this.user = user;
            })
            .catch(() => {
                this.setFetchStatus(FetchStatusEnum.ERROR);
            })
            .finally();
    };
}

const authUserStore = new AuthUserStore();
export default authUserStore;
