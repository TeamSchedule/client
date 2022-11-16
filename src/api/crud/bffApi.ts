import $axios from "../axiosRequests";

export class BffApi {
    static apiPrefix: string = "/bff";

    static getPersonalData() {
        $axios
            .get(this.apiPrefix)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
