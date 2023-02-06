import { UserSchema } from "../api/schemas/responses/users";
import { UnitResponseItemSchema } from "../api/schemas/responses/units";
import { TaskResponseSchema } from "../api/schemas/responses/tasks";
import { EventResponseItemSchema } from "../api/schemas/responses/events";

const user1: UserSchema = {
    avatar: "",
    id: 1,
    email: "",
    confirmed: true,
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: "Специалист",
};
const user2: UserSchema = {
    avatar: "",
    id: 2,
    email: "",
    confirmed: true,
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: "Специалист",
};
const user3: UserSchema = {
    avatar: "",
    id: 3,
    email: "",
    confirmed: true,
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: "Специалист",
};

export const users: UserSchema[] = [user1, user2, user3];

export const units: UnitResponseItemSchema[] = [
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

export const eventsData: EventResponseItemSchema[] = [
    {
        id: 1,
        name: "Событие 1",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toLocaleDateString(),
        tasks: [],
    },
    {
        id: 2,
        name: "Событие 2",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toLocaleDateString(),
        tasks: [],
    },
    {
        id: 3,
        name: "Событие 3",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toLocaleDateString(),
        tasks: [],
    },
];
