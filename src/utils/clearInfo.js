import $axios from "../api/axiosRequests";
import { onDeleteUserInfo } from "../features/userInfoSlice";
import { onLogout } from "../features/isAuthSlice";
import { LocalStorageApi } from "../api/storage";

export default function clearInfo(dispatch) {
    dispatch(onDeleteUserInfo());
    dispatch(onLogout());
    deleteAccessTokenFromAxios();
    LocalStorageApi.CLEAR();
}

function deleteAccessTokenFromAxios() {
    delete $axios.defaults.headers["Authorization"];
}
