/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router-dom";

import React, { useEffect, useState } from "react";
import PrimaryAppBar from "./header/PrimaryAppBar";
import { Box } from "@mui/material";
import { NotificationsResponseItemSchema } from "../api/schemas/responses/notifications";
import { API } from "../api/api";
import Toolbar from "@mui/material/Toolbar";
import { getOnlyUnreadNotifications } from "../utils/notificationUtils";
import authUserStore from "../store/AuthUserStore";

const NotificationRequestPeriodMS: number = 30000;

export const NotificationsContext = React.createContext<NotificationsResponseItemSchema[]>([]);

export default function App() {
    authUserStore.prefetchMe();
    const userId: number = authUserStore.getMe?.id || 0;

    const [newNotifications, setNewNotifications] = useState<NotificationsResponseItemSchema[]>([]);

    useEffect(() => {
        if (!userId) return;
        API.notifications.all(userId).then((notifications: NotificationsResponseItemSchema[]) => {
            setNewNotifications(getOnlyUnreadNotifications(notifications));
        });

        // запрос количества новых оповещений каждые NotificationRequestPeriodMS секунд
        const notificationIntervalId = setInterval(() => {
            API.notifications.all(userId).then((notifications: NotificationsResponseItemSchema[]) => {
                setNewNotifications(getOnlyUnreadNotifications(notifications));
            });
        }, NotificationRequestPeriodMS);

        return () => {
            clearInterval(notificationIntervalId);
        };
    }, [userId]);

    return (
        <div className="h-100 container-fluid m-0 p-0">
            <Box sx={{ paddingBottom: 1 }}>
                <NotificationsContext.Provider value={newNotifications}>
                    <PrimaryAppBar />
                </NotificationsContext.Provider>
            </Box>
            <Toolbar />
            <div className="position-relative">
                <div className="row m-0 d-flex px-2">
                    <div className="col-sm-12 p-0 position-relative">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}
