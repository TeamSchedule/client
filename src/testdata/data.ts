import { UserSchema } from "../api/schemas/responses/users";
import { UnitResponseItemSchema } from "../api/schemas/responses/units";
import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";
import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { UserPostsEnum } from "../enums/usersEnums";
import { TaskStatusEnum } from "../enums/tasksEnums";
import { EventStatusEnum } from "../enums/eventsEnums";

const user1: UserSchema = {
    avatar: "",
    id: 1,
    email: "",
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.UNIT_HEAD,
};
const user2: UserSchema = {
    avatar: "",
    id: 2,
    email: "",
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.MEMBER,
};
const user3: UserSchema = {
    avatar: "",
    id: 3,
    email: "",
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.MEMBER,
};

const user4: UserSchema = {
    avatar: "",
    id: 4,
    email: "",
    creationDate: new Date(),
    login: "",
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.MEMBER,
};

export const usersData: UserSchema[] = [user1, user2, user3, user4];

export const unitsData: UnitResponseItemSchema[] = [
    {
        id: 1,
        name: "Отдел социальных медиа",
        members: usersData.slice(0, 2),
        openTasks: [],
        admin: user1,
        color: "",
        creationDate: new Date().toJSON(),
    },
    {
        id: 2,
        name: "Отдел социальных медиа",
        members: usersData.slice(0, 2),
        openTasks: [],
        admin: user1,
        color: "",
        creationDate: new Date().toJSON(),
    },
    {
        id: 3,
        name: "Отдел социальных медиа",
        members: usersData.slice(0, 2),
        openTasks: [],
        admin: user1,
        color: "",
        creationDate: new Date().toJSON(),
    },
];

export const taskData: TaskResponseItemSchema = {
    id: 1,
    name: "Задача 3",
    description: "расширенное описание",
    taskStatus: TaskStatusEnum.IN_PROGRESS,
    expirationTime: new Date().toJSON(),
    assignee: [user1],
    author: user2,
    event: {
        id: 1,
        name: "Событие 1",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toJSON(),
        tasks: [],
        status: EventStatusEnum.IN_PROGRESS,
    },
    department: unitsData[0],
};

export const eventsData: EventResponseItemSchema[] = [
    {
        id: 1,
        name: "Событие 1",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toJSON(),
        tasks: [taskData],
        status: EventStatusEnum.IN_PROGRESS,
    },
    {
        id: 2,
        name: "Событие 2",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toJSON(),
        tasks: [],
        status: EventStatusEnum.IN_PROGRESS,
    },
    {
        id: 3,
        name: "Событие 3",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toJSON(),
        tasks: [],
        status: EventStatusEnum.IN_PROGRESS,
    },
];
