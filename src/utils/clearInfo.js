import { onDeleteUserInfo } from "../features/userInfoSlice";
import { onLogout } from "../features/isAuthSlice";
import { deleteAccessToken } from "../api/axiosRequests";

function clearInfo(dispatch) {
    dispatch(onDeleteUserInfo());
    dispatch(onLogout());
    deleteAccessToken();
    window.localStorage.clear();
}

export default clearInfo;
