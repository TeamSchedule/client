import React, { useContext, useEffect, useState } from "react";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import PlainSelector from "../../selectors/PlainSelector";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import { NotificationsContext } from "../../App";

enum NotificationFilterEnum {
    All = 1, // показать все
    Unread = 2, // показать только непрочитанные
    Read = 3, // показать только прочитанные
}

const NotificationFilters: Array<[string, string]> = [
    [NotificationFilterEnum.All.toString(), "Все"],
    [NotificationFilterEnum.Read.toString(), "Прочитанные"],
    [NotificationFilterEnum.Unread.toString(), "Непрочитанные"],
];

interface NotificationListProps {}

export default function NotificationList(props: NotificationListProps) {
    // параметр отображения оповещений
    const [filterValue, setFilterValue] = useState<number>(NotificationFilterEnum.All);

    const notifications = useContext<NotificationsResponseItemSchema[]>(NotificationsContext);
    // список отображаемых оповещений
    const [displayedNotifications, setDisplayedNotifications] = useState<NotificationsResponseItemSchema[]>([]);

    useEffect(() => {
        if (filterValue === NotificationFilterEnum.All) {
            setDisplayedNotifications(() => [...notifications]);
        } else if (filterValue === NotificationFilterEnum.Read) {
            // TODO: filter on read status
            setDisplayedNotifications(() => [...notifications]);
        } else if (filterValue === NotificationFilterEnum.Unread) {
            setDisplayedNotifications(() => [...notifications]);
        }
    }, [filterValue]);

    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <ScreenHeader text="Уведомления" />

                <PlainSelector
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    id="notifications-filter"
                    filterObj={NotificationFilters}
                />

                {displayedNotifications.map((notification) => (
                    <div key={notification.id}>{notification.text}</div>
                ))}
            </div>
        </>
    );
}
