import $axios from "../api/axiosRequests";
import { LocalStorageApi } from "../api/storage";

export default function clearInfo(dispatch) {
    deleteAccessTokenFromAxios();
    LocalStorageApi.CLEAR();
}

function deleteAccessTokenFromAxios() {
    delete $axios.defaults.headers["Authorization"];
}
