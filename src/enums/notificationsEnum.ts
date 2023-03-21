export enum NotificationsStatusEnum {
    DELETED = "DELETED",
    READ = "READ",
    UNREAD = "UNREAD",
}

export type NotificationsStatusStrings = (typeof NotificationsStatusEnum)[keyof typeof NotificationsStatusEnum];
