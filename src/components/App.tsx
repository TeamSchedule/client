/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useLoaderData } from "react-router-dom";

import React, { useEffect, useState } from "react";
import PrimaryAppBar from "./header/PrimaryAppBar";
import { Box } from "@mui/material";
import { NotificationsResponseItemSchema } from "../api/schemas/responses/notifications";
import { API } from "../api/api";
import Toolbar from "@mui/material/Toolbar";
import { UserSchema } from "../api/schemas/responses/users";
import useLocalStorage from "../hooks/useLocalStorage";
import { AuthUserKey } from "../consts/common";
import { getOnlyUnreadNotifications } from "../utils/notificationUtils";

const NotificationRequestPeriodMS: number = 30000;

export const NotificationsContext = React.createContext<NotificationsResponseItemSchema[]>([]);

export default function App() {
    const meData: UserSchema | unknown = useLoaderData();
    const [user, setUser] = useLocalStorage(AuthUserKey);

    const [newNotifications, setNewNotifications] = useState<NotificationsResponseItemSchema[]>([]);

    useEffect(() => {
        if (meData) {
            setUser(meData);
        }
    }, [meData]);

    useEffect(() => {
        API.notifications.all(user.id).then((notifications: NotificationsResponseItemSchema[]) => {
            setNewNotifications(getOnlyUnreadNotifications(notifications));
        });

        // запрос количества новых оповещений каждые NotificationRequestPeriodMS секунд
        const notificationIntervalId = setInterval(() => {
            API.notifications.all(user.id).then((notifications: NotificationsResponseItemSchema[]) => {
                setNewNotifications(getOnlyUnreadNotifications(notifications));
            });
        }, NotificationRequestPeriodMS);

        return () => {
            clearInterval(notificationIntervalId);
        };
    }, []);

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
