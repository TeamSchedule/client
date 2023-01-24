import { useEffect, useState } from "react";
import ScreenSectionHeader from "../../common/ScreenSectionHeader/ScreenSectionHeader";
import { MenuItem, Select } from "@mui/material";

enum NotificationFilter {
    All = 1, // показать все
    Unread = 2, // показать только непрочитанные
    Read = 3, // показать только прочитанные
}

interface NotificationListProps {}

export default function NotificationList(props: NotificationListProps) {
    // параметр отображения оповещений
    const [filterValue, setFilterValue] = useState<number>(NotificationFilter.All);

    // список отображаемых оповещений
    const [notifications, setNotifications] = useState<Array<any>>([]);

    useEffect(() => {
        // TODO: получить все оповещения определенного типа (NotificationFilter)
    }, [filterValue]);

    return (
        <>
            <ScreenSectionHeader text="Оповещения" />
            <Select
                id="notifications-filter"
                value={filterValue}
                onChange={(e) => {
                    setFilterValue(e.target.value as number);
                }}
            >
                <MenuItem value={NotificationFilter.All}>Все</MenuItem>
                <MenuItem value={NotificationFilter.Unread}>Непрочитанные</MenuItem>
                <MenuItem value={NotificationFilter.Read}>Прочитанные</MenuItem>
            </Select>
        </>
    );
}
