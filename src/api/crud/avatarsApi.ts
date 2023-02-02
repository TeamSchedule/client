import requestApi from "../fetchApi";

export class AvatarsApi {
    static apiPrefix: string = "/avatar";

    static async get(id: number) {
        return (await requestApi.GET(`${this.apiPrefix}?user=${id}`)).data["avatarSrc"];
    }

    static async set(avatarImage: string | Blob) {
        let formData = new FormData();
        formData.append("avatar", avatarImage);

        return await requestApi.POST_FILE(`${this.apiPrefix}`, {
            body: formData,
        });
    }

    static async delete() {
        return await requestApi.DELETE(`${this.apiPrefix}`);
    }
}
