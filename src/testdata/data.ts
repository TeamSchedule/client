import { UserSchema } from "../schemas/responses/users";
import { UnitsResponseItemSchema } from "../schemas/responses/units";
import { TaskResponseSchema } from "../schemas/responses/tasks";

const user1: UserSchema = {
    id: 1,
    email: "",
    confirmed: true,
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: "Специалист",
};
const user2: UserSchema = {
    id: 1,
    email: "",
    confirmed: true,
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: "Специалист",
};
const user3: UserSchema = {
    id: 1,
    email: "",
    confirmed: true,
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: "Специалист",
};

export const users: UserSchema[] = [user1, user2, user3];

export const units: UnitsResponseItemSchema[] = [
    {
        id: 1,
        name: "Отдел социальных медиа",
        members: users,
        openTasks: [],
        adminId: 1,
        avatar: "",
        color: "",
        creationDate: new Date().toLocaleDateString(),
    },
    {
        id: 2,
        name: "Отдел социальных медиа",
        members: users,
        openTasks: [],
        adminId: 1,
        avatar: "",
        color: "",
        creationDate: new Date().toLocaleDateString(),
    },
    {
        id: 3,
        name: "Отдел социальных медиа",
        members: users,
        openTasks: [],
        adminId: 1,
        avatar: "",
        color: "",
        creationDate: new Date().toLocaleDateString(),
    },
];

export const task: TaskResponseSchema = {
    id: 1,
    name: "Задача 3",
    description: "расширенное описание",
    closed: false,
    creationTime: new Date().toLocaleDateString(),
    expirationTime: new Date().toLocaleDateString(),
    assigneeId: 1,
    authorId: 2,
    unit: units[0],
};
