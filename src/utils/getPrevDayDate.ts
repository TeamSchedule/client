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
