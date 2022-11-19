import $axios from "../axiosRequests";

export class AvatarsApi {
    static apiPrefix: string = "/avatar";

    static async get(id: number) {
        return (await $axios.get(`${this.apiPrefix}?user=${id}`)).data["avatarSrc"];
    }

    static async set(avatarImage: string | Blob) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        let formData = new FormData();
        formData.append("avatar", avatarImage);

        return await $axios.post(`${this.apiPrefix}`, formData, config);
    }

    static async delete() {
        return await $axios.delete(`${this.apiPrefix}`);
    }
}
