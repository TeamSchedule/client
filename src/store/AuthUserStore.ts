import { autorun, makeAutoObservable, runInAction } from "mobx";
import { FetchStatusEnum, FetchStatusStrings } from "../enums/fetchStatusEnum";
import { API } from "../api/api";
import { UserSchema } from "../api/schemas/responses/users";
import { AuthUserKey } from "../consts/common";

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
        window.localStorage.clear();
        this.user = undefined;
    }

    update(newUserData: UserSchema) {
        try {
            window.localStorage.setItem(AuthUserKey, JSON.stringify(newUserData));
        } catch (err) {}
        this.user = newUserData;
    }

    get getFetchStatus(): FetchStatusStrings {
        return this.fetching;
    }

    get getMe(): UserSchema | undefined {
        if (this.user) return this.user;
        const storageUserData: string = window.localStorage.getItem(AuthUserKey) || "";
        return storageUserData ? JSON.parse(storageUserData) : undefined;
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
                this.update(user);
            })
            .catch(() => {
                if (!window.localStorage.getItem(AuthUserKey)) {
                    this.delete();
                }
                this.setFetchStatus(FetchStatusEnum.ERROR);
            })
            .finally();
    };
}

const authUserStore = new AuthUserStore();
export default authUserStore;
