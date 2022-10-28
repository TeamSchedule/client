export interface GetMeResponseSchema {
    user: GetMeResponseSchemaItem;
}

export interface GetMeResponseSchemaItem {
    id: number;
    login: string;
    email: string;
    description: string;
    confirmed: boolean;
    creationDate: Date;
}
