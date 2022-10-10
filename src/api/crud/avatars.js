import $axios from "../axiosRequests";


export class Avatars {
    static apiPrefix = "/avatar";

    static async get() {
        return (await $axios.get(`${this.apiPrefix}`)).data['avatarSrc'];
    }

    static async set(avatarImage) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        let formData = new FormData();
        formData.append("avatar", avatarImage);

        return (await $axios.post(
            `${this.apiPrefix}`,
            formData,
            config
        ).catch(() => {
            alert("Could not save image! Try later");
        }));
    }
}
