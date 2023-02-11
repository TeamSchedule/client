export default function getDateRepresentation(date: Date): string {
    return date.toLocaleDateString("ru-RU", { year: "numeric", month: "2-digit", day: "2-digit" });
}
