export interface Notification {
    id: number;
    title: string;
    description: string;
    dt_created: string;
    read: boolean;
    recipientId: number;
    taskId: number | null;
    eventId: number | null;
}
