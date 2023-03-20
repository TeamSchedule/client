import { useEffect, useState } from "react";
import { API } from "../api/api";
import { LoadingStatusEnum, LoadingStatusStrings } from "../enums/loadingStatusEnum";
import { UserSchema } from "../api/schemas/responses/users";

interface UseUsersInterface {
    users: UserSchema[];
    usersLoadingStatus: LoadingStatusStrings;
    closeSnackbar: () => void;
}

export default function useUsers(): UseUsersInterface {
    const [users, setUsers] = useState<UserSchema[]>([]);
    const [usersLoadingStatus, setUsersLoadingStatus] = useState<LoadingStatusStrings>(LoadingStatusEnum.LOADING);

    function closeSnackbar() {
        setUsersLoadingStatus(LoadingStatusEnum._DEFAULT);
    }

    useEffect(() => {
        API.users
            .all()
            .then((data: UserSchema[]) => {
                setUsers(data);
                setUsersLoadingStatus(LoadingStatusEnum.FINISH_SUCCESS);
            })
            .catch(() => {
                setUsersLoadingStatus(LoadingStatusEnum.FINISH_ERROR);
            })
            .finally(() => {
            });
    }, []);

    return { users, usersLoadingStatus, closeSnackbar };
}
