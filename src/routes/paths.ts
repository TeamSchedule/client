export const notFound = "*";
export const startPagePath = "/";
export const loginPath: string = "/login";
export const registrationPath: string = "/signup";
export const forgotPasswordPath: string = "/forgot";
export const resetPasswordCodePath: string = "/reset";
export const successRegistrationPath: string = "/ready";

/* ---------------------------------------------------- */

export const baseUnitPath: string = "/units";
export const allUnitsPath: string = baseUnitPath;
export const createNewUnitPath: string = [baseUnitPath, "new"].join("/");

export function makeUnitLinkById(id: number): string {
    return [baseUnitPath, id.toString()].join("/");
}

/* ---------------------------------------------------- */
export const baseTaskPath: string = "/tasks/";

export function makeTaskLinkById(id: number): string {
    return baseTaskPath + id.toString();
}

/* ---------------------------------------------------- */

export const baseEventPath: string = "/events/";
export const allEventsPath: string = baseEventPath;
export const createNewEventPath: string = [baseEventPath, "new"].join("/");

export function makeEventLinkById(id: number): string {
    return baseEventPath + id.toString();
}

/* ---------------------------------------------------- */

export const baseCalendarPath: string = "/calendar/";

export function makeDateLink(date: Date): string {
    const dateStr = date.toLocaleDateString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" });
    const urlDateStr = dateStr.split(".").join("-");

    return baseCalendarPath + urlDateStr;
}

/* ---------------------------------------------------- */
