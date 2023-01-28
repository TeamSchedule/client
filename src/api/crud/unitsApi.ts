import $axios from "../axiosRequests";
import { CreateUnitRequestSchema, UpdateTeamRequestSchema } from "../schemas/requests/units";
import { GetAllUnitsResponseSchema, UnitResponseItemSchema } from "../schemas/responses/units";

/**
 * Класс с методами доступа к api отделов.
 * */
export class UnitsApi {
    static apiPrefix = "/schedule/team";

    /**
     * Получить все отделы.
     * */
    static async all(): Promise<UnitResponseItemSchema[]> {
        return $axios
            .get(`${this.apiPrefix}`)
            .then((r) => {
                return r.data;
            })
            .then((data: GetAllUnitsResponseSchema) => {
                return data.units;
            });
    }

    /**
     * Получить отдел с указанным `id`.
     *
     * @param id - Идентификатор отдела
     * */
    static async getById(id: number): Promise<UnitResponseItemSchema> {
        return $axios.get(`${this.apiPrefix}/${id}`).then((r) => r.data);
    }

    /**
     * Создать новый отдел.
     *
     * @param data - Объект с данными отдела
     * */
    static async createUnit(data: CreateUnitRequestSchema) {
        return (await $axios.post(`${this.apiPrefix}`, data)).data;
    }

    /**
     * Обновить информацию об отделе.
     *
     * @param id - Идентификатор отдела
     * @param data - Объект с новыми данными отдела
     * */
    static update(id: number, data: UpdateTeamRequestSchema) {
        return $axios.patch(`${this.apiPrefix}/${id}`, data);
    }

    static async setAvatar(teamId: string, avatarImage: string | Blob) {
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };

        let formData = new FormData();
        formData.append("avatar", avatarImage);

        return await $axios.post(`/avatar/teams/${teamId}`, formData, config).catch(() => {
            alert("Could not save image! Try later");
        });
    }

    static async deleteAvatar(teamId: string) {
        return await $axios.delete(`/avatar/teams/${teamId}`);
    }
}
