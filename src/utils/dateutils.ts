/**
 * Get count of days in month
 *
 * It works only for weeks starting on Monday.
 *
 * @param year - number of year
 * @param monthIndex - zero-based index [0-11]
 * */
export const daysInMonth = (year: number, monthIndex: number): number => {
    return new Date(year, monthIndex + 1, 0).getDate();
};

/**
 * Get count of weeks in month
 *
 * It works only for weeks starting on Monday.
 *
 * @param year - number of year
 * @param monthIndex - zero-based index [0-11]
 * */
export function weekCount(year: number, monthIndex: number): number {
    const firstWeekDayOfMonth: number = new Date(year, monthIndex, 1).getDay() || 7;
    const lastWeekDayOfMonth: number = new Date(year, monthIndex, daysInMonth(year, monthIndex)).getDay() || 7;
    const sum = 8 - firstWeekDayOfMonth + lastWeekDayOfMonth;

    if (sum <= 3) return 6;
    if (sum <= 10) return 5;
    return 4;
}

export function getDateRepresentation(date: Date): string {
    return date.toLocaleDateString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export function getPrevDayDate(d: string | Date): Date {
    let prevDate = new Date(d);
    prevDate.setDate(prevDate.getDate() - 1);
    return prevDate;
}

export function getNextDayDate(d: string | Date): Date {
    let prevDate = new Date(d);
    prevDate.setDate(prevDate.getDate() + 1);
    return prevDate;
}

export function isEqualYearMonthDate(d1: Date, d2: Date): boolean {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
