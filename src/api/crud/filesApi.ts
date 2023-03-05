import requestApi from "../fetchApi";
import { EventTypesEnum } from "../../enums/filesEnums";
import { FileResponseItemSchema, GetFileResponseSchema, GetFilesResponseSchema } from "../schemas/responses/files";
import { ACCESS_TOKEN_STORAGE_NAME, SERVER_ORIGIN } from "../config";

export class FilesApi {
    static apiPrefix: string = "/files";

    /**
     * Получить все файлы события.
     *
     * @param id - Идентификатор события
     * */
    static async getEventFiles(id: number): Promise<FileResponseItemSchema[]> {
        return requestApi
            .GET(`${this.apiPrefix}/${EventTypesEnum.EVENT}/${id}`)
            .then((data: GetFilesResponseSchema) => {
                return data.files;
            });
    }

    /**
     * Получить все файлы задачи.
     *
     * @param id - Идентификатор задачи
     * */
    static async getTaskFiles(id: number): Promise<FileResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}/${EventTypesEnum.TASK}/${id}`).then((data: GetFilesResponseSchema) => {
            return data.files;
        });
    }

    /**
     * Получить файл по `id`.
     *
     * @param id - Идентификатор файла
     * */
    static async getFileById(id: number): Promise<FileResponseItemSchema> {
        return requestApi.GET(`${this.apiPrefix}/${id}`).then((data: GetFileResponseSchema) => {
            return data.file;
        });
    }

    /**
     * Прикрепить файл.
     *
     * @param id - Идентификатор события
     * @param eventType - Тип события
     * @param file - Прикрепляемый файл
     * */
    static async addFile(id: number, eventType: EventTypesEnum, file: File): Promise<FileResponseItemSchema[]> {
        const formData: FormData = new FormData();
        formData.append("file", file);

        return await fetch(`${SERVER_ORIGIN}${this.apiPrefix}/add/${eventType}/${id}`, {
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
     * Удалить файл.
     *
     * @param id - Идентификатор удаляемого фалйа
     * */
    static async dropFileById(id: number): Promise<any> {
        return requestApi.DELETE(`${this.apiPrefix}/${id}`);
    }
}
