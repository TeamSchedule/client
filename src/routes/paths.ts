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

export const baseUnitPath: string = "/units";
export const createNewUnitPath: string = "/units/new";

export function makeUnitLinkById(id: number): string {
    return baseUnitPath + "/" + id.toString();
}

/* ---------------------------------------------------- */
export const baseTaskPath: string = "/tasks";

export function makeTaskLinkById(id: number): string {
    return baseTaskPath + "/" + id.toString();
}

/* ---------------------------------------------------- */

export const baseEventPath: string = "/events";
export const createNewEventPath: string = "/events/new";

export function makeEventLinkById(id: number): string {
    return baseEventPath + "/" + id.toString();
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
