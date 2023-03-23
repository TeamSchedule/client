import React, { useEffect, useState } from "react";
import ScreenHeader from "../../common/ScreenHeader/ScreenHeader";
import PlainSelector from "../../selectors/PlainSelector";
import { NotificationsResponseItemSchema } from "../../../api/schemas/responses/notifications";
import NotificationItem from "../NotificationItem/NotificationItem";
import { API } from "../../../api/api";
import useApiCall from "../../../hooks/useApiCall";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { AuthUserKey } from "../../../consts/common";
import { Outlet, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = () => (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3, width: "100%" }}>
        <CircularProgress />
    </Box>
);

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

    const NotificationsFilter = (
        <>
            <ScreenHeader text="Уведомления" />

            <PlainSelector
                filterValue={filterValue}
                setFilterValue={setFilterValue}
                id="notifications-filter"
                filterObj={NotificationFilters}
            />
        </>
    );

    const Notifications = (
        <>
            {displayedNotifications.map((notification) => (
                <>
                    <NotificationItem
                        key={notification.id}
                        notification={notification}
                        setNotifications={getAllNotificationsCallApi.setData}
                    />
                </>
            ))}
        </>
    );

    return (
        <>
            {!id && (
                <>
                    <Grid container sx={{ justifyContent: "flex-start" }} spacing={1}>
                        <Grid
                            item
                            xs={12}
                            md={5}
                            lg={4}
                            sx={{
                                minHeight: { xs: 0, md: "calc(100vh - 65px)" },
                                maxHeight: { md: "calc(100vh - 130px)" },
                                overflowY: "auto",
                            }}
                        >
                            <Box>
                                <div className="d-flex justify-content-center align-items-center">
                                    {NotificationsFilter}
                                </div>
                                {getAllNotificationsCallApi.loading && <Progress />}
                                {getAllNotificationsCallApi.success && (
                                    <>
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                    </>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={0} md={7} lg={8}></Grid>
                    </Grid>
                </>
            )}

            {id && (
                <>
                    <Grid container sx={{ justifyContent: "flex-start" }} spacing={1}>
                        <Grid
                            item
                            xs={0}
                            md={5}
                            lg={4}
                            sx={{
                                minHeight: { xs: 0, md: "calc(100vh - 65px)" },
                                maxHeight: { md: "calc(100vh - 130px)" },
                                overflowY: "auto",
                            }}
                        >
                            <Box sx={{ display: { xs: "none", md: "block" } }}>
                                <div className="d-flex justify-content-center align-items-center">
                                    {NotificationsFilter}
                                </div>
                                {getAllNotificationsCallApi.loading && <Progress />}
                                {getAllNotificationsCallApi.success && (
                                    <>
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                        {Notifications}
                                    </>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={7} lg={8}>
                            <Box sx={{ mt: { md: "56px" }, width: "100%" }}>
                                <Outlet />
                            </Box>
                        </Grid>
                    </Grid>
                </>
            )}

            {/*            <div className="d-flex justify-content-center align-items-center">{NotificationsFilter}</div>
            <div>
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
                {Notifications}
            </div>*/}
        </>
    );
}
