import { getDateRepresentation } from "../utils/dateutils";

export const notFound = "*";
export const startPagePath = "/";
export const loginPath: string = "/login";
export const registrationPath: string = "/signup";
export const forgotPasswordPath: string = "/forgot";
export const resetPasswordCodePath: string = "/reset";
export const newPasswordPath: string = "/reset-psw";
export const successRegistrationPath: string = "/ready";

/* ---------------------------------------------------- */

export const NotificationListPath: string = "/notifications";
export const FullViewNotificationPath: string = "/notifications/:id";

export function makeNotificationLinkById(id: number): string {
    return NotificationListPath + "/" + id.toString();
}

/* ---------------------------------------------------- */

export const UnitListPath: string = "/units";
export const CreateNewUnitPath: string = "/units/new";
export const FullViewUnitPath: string = "/units/:id";
export const EditUnitPath: string = "/units/:id/edit";

export function makeUnitLinkById(id: number): string {
    return UnitListPath + "/" + id.toString();
}

/* ---------------------------------------------------- */

export const EventListPath: string = "/events";
export const CreateNewEventPath: string = "/events/new";
export const FullViewEventPath: string = "/events/:id";
export const EditEventPath: string = "/events/:id/edit";

export function makeEventLinkById(id: number): string {
    return EventListPath + "/" + id.toString();
}

/* ---------------------------------------------------- */

export const TaskListPath: string = "/tasks";
export const CreateNewTaskPath: string = "/tasks/new";
export const FullViewTaskPath: string = "/tasks/:id";
export const EditTaskPath: string = "/tasks/:id/edit";

export function makeTaskLinkById(id: number): string {
    return TaskListPath + "/" + id.toString();
}

/* ---------------------------------------------------- */

export const baseCalendarPath: string = "/calendar";

export function makeDateLink(date: Date): string {
    const dateStr = getDateRepresentation(date);
    const urlDateStr = dateStr.split(".").join("-");

    return baseCalendarPath + "/" + urlDateStr;
}

/* ---------------------------------------------------- */

export const SettingsPath: string = "/settings";

/* ---------------------------------------------------- */
