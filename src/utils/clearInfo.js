import $axios from "../api/axiosRequests";
import { onDeleteUserInfo } from "../features/userInfoSlice";
import { LocalStorageApi } from "../api/storage";

export default function clearInfo(dispatch) {
    dispatch(onDeleteUserInfo());
    deleteAccessTokenFromAxios();
    LocalStorageApi.CLEAR();
}

function deleteAccessTokenFromAxios() {
    delete $axios.defaults.headers["Authorization"];
}
