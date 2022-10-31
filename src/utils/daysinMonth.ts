export default function daysInMonth(year: number, month: number): number {
    // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
}
