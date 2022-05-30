export function getDateAsHeader(date) {
    /*
    * Return format-date. Example: `13, January`
    * */
    return date.getDate() + ", " + date.toLocaleString("default", {month: "long"});
}
