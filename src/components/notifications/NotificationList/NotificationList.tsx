import React, { useEffect, useState } from "react";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import PlainSelector from "../../selectors/PlainSelector";

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

    // список отображаемых оповещений
    const [notifications, setNotifications] = useState<Array<any>>([]);

    useEffect(() => {
        // TODO: получить все оповещения определенного типа (NotificationFilter)
    }, [filterValue]);

    return (
        <>
            <div className="d-flex justify-content-center">
                <ScreenHeader text="Уведомления" />

                <PlainSelector
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    id="notifications-filter"
                    filterObj={NotificationFilters}
                />
            </div>
        </>
    );
}
