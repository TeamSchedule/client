import $axios from "../axiosRequests";


export class Avatars {
    static apiPrefix = "/avatar";

    static async get(id) {
        return (await $axios.get(`${this.apiPrefix}?user=${id}`)).data['avatarSrc'];
    }

    static async set(id, avatarImage) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        let formData = new FormData();
        formData.append("avatar", avatarImage);
        formData.append("id", id);

        return (await $axios.post(
            `${this.apiPrefix}`,
            formData,
            config
        ).catch(() => {
            alert("Could not save image! Try later");
        }));
    }
}
