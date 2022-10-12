export function getPrevDayDate(d) {
    let prevDate = new Date(d);
    prevDate.setDate(prevDate.getDate() - 1);
    return prevDate;
}

export function getNextDayDate(d) {
    let prevDate = new Date(d);
    prevDate.setDate(prevDate.getDate() + 1);
    return prevDate;
}
