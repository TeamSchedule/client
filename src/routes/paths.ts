export const notFound = "*";
export const startPagePath = "/";
export const loginPath: string = "/login";
export const registrationPath: string = "/signup";
export const forgotPasswordPath: string = "/forgot";
export const resetPasswordCodePath: string = "/reset";
export const newPasswordPath: string = "/reset-psw";
export const successRegistrationPath: string = "/ready";

export const NonAuthedPaths: string[] = [
    loginPath,
    registrationPath,
    forgotPasswordPath,
    resetPasswordCodePath,
    newPasswordPath,
    successRegistrationPath,
];
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

export const CalendarPath: string = "/calendar";
export const CreateNewTaskPath: string = "/calendar/tasks/new";
export const FullViewTaskPath: string = "/calendar/tasks/:id";
export const EditTaskPath: string = "/calendar/tasks/:id/edit";

export function makeTaskLinkById(id: number): string {
    return CalendarPath + "/tasks/" + id.toString();
}

export const BaseCalendarEventPath: string = CalendarPath + "/events";
export const CreateNewEventCalendarPath: string = BaseCalendarEventPath + "/new";
export const FullViewEventCalendarPath: string = BaseCalendarEventPath + "/:id";
export const EditEventCalendarPath: string = BaseCalendarEventPath + "/:id/edit";

export function makeCalendarEventLinkById(id: number): string {
    return CalendarPath + "/events/" + id.toString();
}

/* ---------------------------------------------------- */

export const SettingsPath: string = "/settings";

/* ---------------------------------------------------- */
