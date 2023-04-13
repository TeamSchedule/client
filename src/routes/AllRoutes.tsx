import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";
import App from "../components/App";
import CreateTaskForm from "../components/tasks/CreateTaskForm";
import EditTaskForm from "../components/tasks/EditTaskForm";
import NotFound from "../components/generic/NotFound";
import UnitList from "../components/units/UnitList/UnitList";
import CreateUnitForm from "../components/units/CreateUnitForm/CreateUnitForm";
import FullUnitView from "../components/units/FullUnitView/FullUnitView";
import EditUnitForm from "../components/units/EditUnitForm/EditUnitForm";
import EventList from "../components/events/EventList/EventList";
import CreateEventForm from "../components/events/CreateEventForm/CreateEventForm";
import {
    CalendarPath,
    CreateNewEventCalendarPath,
    CreateNewEventPath,
    CreateNewTaskPath,
    CreateNewUnitPath,
    EditEventCalendarPath,
    EditEventPath,
    EditTaskPath,
    EditUnitPath,
    EventListPath,
    forgotPasswordPath,
    FullViewEventCalendarPath,
    FullViewEventPath,
    FullViewNotificationPath,
    FullViewTaskPath,
    FullViewUnitPath,
    loginPath,
    newPasswordPath,
    notFound,
    NotificationListPath,
    registrationPath,
    resetPasswordCodePath,
    SettingsPath,
    successRegistrationPath,
    UnitListPath,
} from "./paths";
import NotificationList from "../components/notifications/NotificationList/NotificationList";
import ForgotPasswordForm from "../components/auth/reset_password/ForgotPasswordForm";
import ResetPasswordCodeForm from "../components/auth/reset_password/ResetPasswordCodeForm";
import NewPasswordForm from "../components/auth/reset_password/NewPasswordForm";
import SuccessRegisteredMsg from "../components/auth/SuccessRegisteredMsg";
import BaseEvent from "../components/events/BaseEvent";
import FullCalendar from "../components/calendars/FullCalendar";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import UserProfileSettings from "../components/UserProfileSettings";
import { API } from "../api/api";
import FullNotificationView from "../components/notifications/FullNotificationView";
import BaseTask from "../components/tasks/BaseTask";
import { EventViewModeEnum } from "../enums/eventsEnums";
import { TaskViewModeEnum } from "../enums/tasksEnums";
import { observer } from "mobx-react-lite";
import { UserSchema } from "../api/schemas/responses/users";
import authUserStore from "../store/AuthUserStore";

/**
 * Обертка для приватных роутов, доступ к которым должен быть только о авторизованных пользователей.
 *
 * Проверяет наличие объекта user в `localStorage`, если объект есть, то пользователь считается авторизованным.
 * Если объекта нет, то происходит редирект на страницу логина.
 * */
const ProtectedLayout = observer(() => {
    const user: UserSchema | undefined = authUserStore.getMe;

    if (!user) {
        return <Navigate to={loginPath} />;
    }

    return <Outlet />;
});

/**
 * Обертка для публичных роутов, доступ к которым должен быть только у неавторизованных пользователей.
 *
 * Проверяет наличие объекта user в `localStorage`, если объект есть, то пользователь считается авторизованным.
 * Авторизованные пользователи редиректятся к данным (приватным роутам).
 * */
const PublicLayout = observer(() => {
    const user: UserSchema | undefined = authUserStore.getMe;

    if (user) {
        return <Navigate to={CalendarPath} />;
    }

    return <Outlet />;
});

/**
 * Обертка предоставляющая доступ к текущему авторизованному пользователю `user` и методам `login`/`logout`.
 * */
const AuthLayout = () => {
    return <Outlet />;
};

// Для использования нового api react-router-dom нужно определние с помощью `createRoutesFromElements`
export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthLayout />}>
                <Route element={<PublicLayout />}>
                    <Route index element={<Navigate to={loginPath} replace={true} />} />

                    <Route path={loginPath} element={<SignIn />} />
                    <Route path={forgotPasswordPath} element={<ForgotPasswordForm />} />
                    <Route path={resetPasswordCodePath} element={<ResetPasswordCodeForm />} />
                    <Route path={newPasswordPath} element={<NewPasswordForm />} />

                    <Route path={registrationPath} element={<SignUp />} />
                    <Route path={successRegistrationPath} element={<SuccessRegisteredMsg />} />

                    <Route path={notFound} element={<Navigate to={loginPath} replace={true} />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route element={<App />} loader={API.users.getMe} /*errorElement={<ErrorPage />}*/>
                        <Route index element={<Navigate to={EventListPath} replace={true} />} />

                        {/* ==================== notifications routes ==================== */}
                        <Route path={NotificationListPath} element={<NotificationList />}>
                            <Route path={FullViewNotificationPath} element={<FullNotificationView />} />
                        </Route>

                        {/* ==================== units routes ==================== */}
                        <Route path={UnitListPath} element={<UnitList />}>
                            <Route path={FullViewUnitPath} element={<FullUnitView />} />
                            <Route path={EditUnitPath} element={<EditUnitForm />} />
                        </Route>
                        <Route path={CreateNewUnitPath} element={<CreateUnitForm />} />

                        {/* ==================== events routes ==================== */}
                        <Route path={EventListPath} element={<EventList />}>
                            <Route path={FullViewEventPath} element={<BaseEvent viewMode={EventViewModeEnum.FULL} />} />
                            <Route path={EditEventPath} element={<BaseEvent viewMode={EventViewModeEnum.EDIT} />} />
                        </Route>

                        <Route path={CreateNewEventPath} element={<CreateEventForm />} />

                        {/* ==================== task routes ==================== */}

                        {/* ==================== settings routes ==================== */}
                        <Route path={SettingsPath} element={<UserProfileSettings />} />

                        {/* ==================== calendar routes ==================== */}
                        <Route path={CalendarPath} element={<FullCalendar />}>
                            <Route path={CreateNewTaskPath} element={<CreateTaskForm />} />
                            <Route path={EditTaskPath} element={<EditTaskForm />} />
                            <Route path={FullViewTaskPath} element={<BaseTask viewMode={TaskViewModeEnum.FULL} />} />

                            <Route
                                path={FullViewEventCalendarPath}
                                element={<BaseEvent viewMode={EventViewModeEnum.FULL} />}
                            />
                            <Route
                                path={EditEventCalendarPath}
                                element={<BaseEvent viewMode={EventViewModeEnum.EDIT} />}
                            />
                            <Route path={CreateNewEventCalendarPath} element={<CreateEventForm />} />
                        </Route>
                    </Route>

                    <Route path={notFound} element={<NotFound />} />
                </Route>
            </Route>
        </>
    )
);
