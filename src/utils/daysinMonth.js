export default function daysInMonth(year, month) {
    // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
}
