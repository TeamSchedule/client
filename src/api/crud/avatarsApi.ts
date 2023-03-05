import requestApi from "../fetchApi";
import { FileOwnerTypesEnum } from "../../enums/filesEnums";
import { ACCESS_TOKEN_STORAGE_NAME, SERVER_ORIGIN } from "../config";
import { GetFilesResponseSchema } from "../schemas/responses/files";

export class AvatarsApi {
    static apiPrefix: string = "/files";

    static async get(id: number) {
        return (await requestApi.GET(`${this.apiPrefix}?user=${id}`)).data["avatarSrc"];
    }

    /**
     * Установить аватар пользователя.
     *
     * @param id - Идентификатор пользователя
     * @param avatarImage - Идентификатор пользователя
     * */
    static async set(id: number, avatarImage: string | Blob | File) {
        let formData = new FormData();
        formData.append("file", avatarImage);

        return await fetch(`${SERVER_ORIGIN}${this.apiPrefix}/add/${FileOwnerTypesEnum.USER}/${id}`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_STORAGE_NAME)}`,
            },
        })
            .then((r: Response) => {
                return r.json();
            })
            .then((data: GetFilesResponseSchema) => {
                return data.files;
            });
    }

    /**
     * Удалить аватар пользователя.
     *
     * @param id - Идентификатор пользователя
     * */
    static async delete(id: number) {
        return await requestApi.DELETE(`${this.apiPrefix}/${FileOwnerTypesEnum.USER}/${id}`);
    }
}
