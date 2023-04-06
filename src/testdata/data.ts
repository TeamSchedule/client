import { UserSchema } from "../api/schemas/responses/users";
import { UnitResponseItemSchema } from "../api/schemas/responses/units";
import { TaskResponseItemSchema } from "../api/schemas/responses/tasks";
import { EventResponseItemSchema } from "../api/schemas/responses/events";
import { UserPostsEnum } from "../enums/usersEnums";
import { TaskStatusEnum } from "../enums/tasksEnums";
import { EventStatusEnum } from "../enums/eventsEnums";

const user1: UserSchema = {
    avatar: {
        filename: "1",
        id: 1,
        size: 1,
        content_type: " ",
        owner_id: 1,
        dt_created: "",
    },
    id: 1,
    firstName: "Name",
    lastName: "Secondname",
    patronymic: "Lastname",
    email: "",
    creationDate: new Date(),
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.UNIT_HEAD,
};
const user2: UserSchema = {
    avatar: {
        filename: "2",
        id: 2,
        size: 1,
        content_type: " ",
        owner_id: 2,
        dt_created: "",
    },
    id: 2,
    firstName: "Name",
    lastName: "Secondname",
    patronymic: "Lastname",
    email: "",
    creationDate: new Date(),
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.MEMBER,
};
const user3: UserSchema = {
    avatar: {
        filename: "3",
        id: 3,
        size: 1,
        content_type: " ",
        owner_id: 3,
        dt_created: "",
    },
    id: 3,
    firstName: "Name",
    lastName: "Secondname",
    patronymic: "Lastname",
    email: "",
    creationDate: new Date(),
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.MEMBER,
};

const user4: UserSchema = {
    avatar: {
        filename: "4",
        id: 4,
        size: 1,
        content_type: " ",
        owner_id: 4,
        dt_created: "",
    },
    id: 4,
    firstName: "Name",
    lastName: "Secondname",
    patronymic: "Lastname",
    email: "",
    creationDate: new Date(),
    fullName: "Сяглова Анна Михайловна",
    post: UserPostsEnum.MEMBER,
};

export const usersData: UserSchema[] = [user1, user2, user3, user4];

export const unitsData: UnitResponseItemSchema[] = [
    {
        id: 1,
        name: "Отдел социальных медиа",
        description: "Описание",
        admin: user1,
        color: "",
        creationDate: new Date().toJSON(),
    },
    {
        id: 2,
        name: "Отдел социальных медиа",
        description: "Описание",
        admin: user1,
        color: "",
        creationDate: new Date().toJSON(),
    },
    {
        id: 3,
        name: "Отдел социальных медиа",
        description: "Описание",
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
        files: [],
    },
    department: unitsData[0],
    files: [],
};

export const tasksData: TaskResponseItemSchema[] = [
    {
        id: 1,
        name: "Задача 1",
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
            files: [],
        },
        department: unitsData[1],
        files: [],
    },
    {
        id: 2,
        name: "Задача 2",
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
            files: [],
        },
        department: unitsData[0],
        files: [],
    },
    {
        id: 3,
        name: "Задача 3",
        description: "расширенное описание",
        taskStatus: TaskStatusEnum.COMPLETED,
        expirationTime: new Date().toJSON(),
        assignee: [user1],
        author: user2,
        event: {
            id: 1,
            name: "Событие 1",
            color: "#ff0864",
            description: "desc",
            endDate: new Date().toJSON(),
            status: EventStatusEnum.IN_PROGRESS,
            files: [],
        },
        department: unitsData[0],
        files: [],
    },
];

export const eventsData: EventResponseItemSchema[] = [
    {
        id: 1,
        name: "Событие 1",
        color: "#ff0864",
        description: "desc",
        endDate: new Date().toJSON(),
        tasks: [taskData],
        status: EventStatusEnum.IN_PROGRESS,
        files: [],
    },
    {
        id: 2,
        name: "Событие 2",
        color: "#2aad6b",
        description: "desc",
        endDate: new Date().toJSON(),
        tasks: [],
        status: EventStatusEnum.IN_PROGRESS,
        files: [],
    },
    {
        id: 3,
        name: "Событие 3",
        color: "#bd8c11",
        description: "desc",
        endDate: new Date().toJSON(),
        tasks: [],
        status: EventStatusEnum.COMPLETED,
        files: [],
    },
];
