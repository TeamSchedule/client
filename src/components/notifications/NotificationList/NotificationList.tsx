import React, { useEffect, useState } from "react";
import PlainSelector from "../../selectors/PlainSelector";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import NotificationItem from "../NotificationItem/NotificationItem";
import { API } from "../../../api/api";
import useApiCall from "../../../hooks/useApiCall";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { AuthUserKey } from "../../../consts/common";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import ListViewContainer from "../../common/ListViewContainer/ListViewContainer";
import Progress from "../../common/Progress";

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

export default function NotificationList() {
    const theme = useTheme();

    const [user] = useLocalStorage(AuthUserKey);

    // Идентификатор оповещения, если пользователь на него нажал
    const { id } = useParams();

    // параметр отображения оповещений
    const [filterValue, setFilterValue] = useState<number>(NotificationFilterEnum.Unread);

    const getAllNotificationsCallApi = useApiCall(() => API.notifications.all(user.id), [], [user.id]);
    const notifications = getAllNotificationsCallApi.data;

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
    }, [filterValue, notifications]);

    const Notifications = (
        <>
            {displayedNotifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    setNotifications={getAllNotificationsCallApi.setData}
                    selected={id === notification.id.toString()}
                />
            ))}
        </>
    );

    const TopBar = (
        <>
            <Box sx={{ display: "flex", alignItems: "center", my: 0, py: 0 }}>
                <Typography
                    component="h1"
                    variant="h1"
                    sx={{ fontSize: { xs: "1rem", md: "1.5rem" }, color: theme.palette.grey.A700, mb: 2, py: 1, my: 0 }}
                >
                    Уведомления
                </Typography>
                <PlainSelector
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    id="notifications-filter"
                    filterObj={NotificationFilters}
                />
            </Box>
        </>
    );

    const LeftBar = (
        <Box>
            {getAllNotificationsCallApi.loading && <Progress />}
            {getAllNotificationsCallApi.success && Notifications}
        </Box>
    );

    const RightBar = (
        <Typography sx={{ textAlign: "center", mt: 3 }}>
            Выберите уведомление, чтобы увидеть подробную информацию
        </Typography>
    );

    return (
        <>
            <ListViewContainer TopBar={TopBar} LeftBar={LeftBar} RightBar={RightBar} id={id} />
        </>
    );
}
