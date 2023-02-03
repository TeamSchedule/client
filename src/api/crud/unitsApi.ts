import { CreateUnitRequestSchema, UpdateTeamRequestSchema } from "../schemas/requests/units";
import { GetAllUnitsResponseSchema, UnitResponseItemSchema } from "../schemas/responses/units";
import requestApi from "../fetchApi";

/**
 * Класс с методами доступа к api отделов.
 * */
export class UnitsApi {
    static apiPrefix = "/schedule/team";

    /**
     * Получить все отделы.
     * */
    static async all(): Promise<UnitResponseItemSchema[]> {
        return requestApi.GET(`${this.apiPrefix}`).then((data: GetAllUnitsResponseSchema) => {
            return data.units;
        });
    }

    /**
     * Получить отдел с указанным `id`.
     *
     * @param id - Идентификатор отдела
     * */
    static async getById(id: number): Promise<UnitResponseItemSchema> {
        return requestApi.GET(`${this.apiPrefix}/${id}`);
    }

    /**
     * Создать новый отдел.
     *
     * @param data - Объект с данными отдела
     * */
    static async createUnit(data: CreateUnitRequestSchema) {
        return requestApi.POST(`${this.apiPrefix}`, { body: data });
    }

    /**
     * Обновить информацию об отделе.
     *
     * @param id - Идентификатор отдела
     * @param data - Объект с новыми данными отдела
     * */
    static update(id: number, data: UpdateTeamRequestSchema) {
        return requestApi.PATCH(`${this.apiPrefix}/${id}`, { body: data });
    }

    static async setAvatar(teamId: string, avatarImage: string | Blob) {
        let formData = new FormData();
        formData.append("avatar", avatarImage);

        return await requestApi
            .POST(`/avatar/teams/${teamId}`, {
                body: formData,
            })
            .catch(() => {
                alert("Could not save image! Try later");
            });
    }

    static async deleteAvatar(teamId: string) {
        return requestApi.DELETE(`/avatar/teams/${teamId}`);
    }
}
