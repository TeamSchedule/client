export function formDateFromArray(expirationDateTimeArr) {
    let date = new Date();
    date.setFullYear(expirationDateTimeArr[0]);
    date.setMonth(expirationDateTimeArr[1] - 1);
    date.setDate(expirationDateTimeArr[2]);
    date.setHours(expirationDateTimeArr[3]);
    date.setMinutes(expirationDateTimeArr[4]);
    return date;
}


export function getDateAsHeader(date) {
    /*
    * Return format-date. Example: `13, January`
    * */
    return date.getDate() + ", " + date.toLocaleString("default", {month: "long"});
}
