import { Outlet, useLoaderData } from "react-router-dom";

import React, { useEffect, useState } from "react";
import AuthorizedHeader from "./header/AuthorizedHeader";

const NotificationRequestPeriod: number = 10;

export const NotificationsContext = React.createContext<Array<object>>([]);

export default function App() {
    const user: any = useLoaderData();
    const [newNotifications, setNewNotifications] = useState<Array<object>>([]);

    useEffect(() => {
        // запрос количества новых оповещений каждые NotificationRequestPeriod секунд
        const notificationIntervalId = setInterval(() => {
            // TODO: make request
        }, NotificationRequestPeriod);

        return () => {
            clearInterval(notificationIntervalId);
        };
    }, []);

    return (
        <div className="h-100 container-fluid m-0 p-0">
            <NotificationsContext.Provider value={newNotifications}>
                <AuthorizedHeader user={user} />
            </NotificationsContext.Provider>
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
