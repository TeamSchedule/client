import $axios from "../api/axiosRequests";
import { onDeleteUserInfo } from "../features/userInfoSlice";
import { onLogout } from "../features/isAuthSlice";

export default function clearInfo(dispatch) {
    dispatch(onDeleteUserInfo());
    dispatch(onLogout());
    deleteAccessTokenFromAxios();
    window.localStorage.clear();
}

function deleteAccessTokenFromAxios() {
    delete $axios.defaults.headers["Authorization"];
}
