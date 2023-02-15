export enum UserPostsEnum {
    MEMBER = "Сотрудник",
    UNIT_HEAD = "Руководитель отдела",
    DEPARTMENT_HEAD = "Глава департамента",
}

export type UserPostsStrings = typeof UserPostsEnum[keyof typeof UserPostsEnum];
