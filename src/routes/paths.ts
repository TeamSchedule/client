export const notFound = "*";
export const startPagePath = "/";
export const loginPath: string = "/login";
export const registrationPath: string = "/signup";
export const forgotPasswordPath: string = "/forgot";
export const resetPasswordCodePath: string = "/reset";
export const newPasswordPath: string = "/reset-psw";
export const successRegistrationPath: string = "/ready";

/* ---------------------------------------------------- */

export const baseNotificationPath: string = "notifications/";

/* ---------------------------------------------------- */

export const UnitListPath: string = "/units";
export const CreateNewUnitPath: string = "/units/new";
export const FullViewUnitPath: string = "/units/:id";
export const EditUnitPath: string = "/units/:id/edit";

export function makeUnitLinkById(id: number): string {
    return UnitListPath + "/" + id.toString();
}

/* ---------------------------------------------------- */
export const baseTaskPath: string = "/tasks";

export function makeTaskLinkById(id: number): string {
    return baseTaskPath + "/" + id.toString();
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

export const baseCalendarPath: string = "/calendar";

export function makeDateLink(date: Date): string {
    const dateStr = date.toLocaleDateString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" });
    const urlDateStr = dateStr.split(".").join("-");

    return baseCalendarPath + "/" + urlDateStr;
}

/* ---------------------------------------------------- */

export const baseSettingsPath: string = "/settings";

/* ---------------------------------------------------- */
