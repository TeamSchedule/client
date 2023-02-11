import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";
import App from "../components/App";
import { TaskViewer } from "../components/taskPage/TaskViewer";
import CreateTaskForm from "../components/taskForms/CreateTaskForm";
import EditTaskForm from "../components/taskForms/EditTaskForm";
import NotFound from "../components/generic/NotFound";
import UnitList from "../components/units/UnitList/UnitList";
import CreateUnitForm from "../components/units/CreateUnitForm/CreateUnitForm";
import FullUnitView from "../components/units/FullUnitView/FullUnitView";
import EditUnitForm from "../components/units/EditUnitForm/EditUnitForm";
import EventList from "../components/events/EventList/EventList";
import CreateEventForm from "../components/events/CreateEventForm/CreateEventForm";
import {
    baseCalendarPath,
    baseNotificationPath,
    CreateNewEventPath,
    CreateNewTaskPath,
    CreateNewUnitPath,
    EditEventPath,
    EditTaskPath,
    EditUnitPath,
    EventListPath,
    forgotPasswordPath,
    FullViewEventPath,
    FullViewTaskPath,
    FullViewUnitPath,
    loginPath,
    newPasswordPath,
    notFound,
    registrationPath,
    resetPasswordCodePath,
    successRegistrationPath,
    TaskListPath,
    UnitListPath,
} from "./paths";
import NotificationList from "../components/notifications/NotificationList/NotificationList";
import useAuth from "../hooks/useAuth";
import LoginForm from "../components/auth/LoginForm";
import ForgotPasswordForm from "../components/auth/reset_password/ForgotPasswordForm";
import ResetPasswordCodeForm from "../components/auth/reset_password/ResetPasswordCodeForm";
import NewPasswordForm from "../components/auth/reset_password/NewPasswordForm";
import RegisterForm from "../components/auth/RegisterForm";
import SuccessRegisteredMsg from "../components/auth/SuccessRegisteredMsg";
import AuthProvider from "./AuthProvider";
import FullEventView from "../components/events/FullEventView/FullEventView";
import EditEventForm from "../components/events/EditEventForm/EditEventForm";
import AvatarEditorModal from "../components/AvatarEditorModal";
import FullCalendarMobileView from "../components/calendars/FullCalendarMobileView";
import FullTaskView from "../components/tasks/FullTaskView";

/**
 * Обертка для приватных роутов, доступ к которым должен быть только о авторизованных пользователей.
 *
 * Проверяет наличие объекта user в `localStorage`, если объект есть, то пользователь считается авторизованным.
 * Если объекта нет, то происходит редирект на страницу логина.
 * */
const ProtectedLayout = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={loginPath} />;
    }

    return <Outlet />;
};

/**
 * Обертка для публичных роутов, доступ к которым должен быть только у неавторизованных пользователей.
 *
 * Проверяет наличие объекта user в `localStorage`, если объект есть, то пользователь считается авторизованным.
 * Авторизованные пользователи редиректятся к данным (приватным роутам).
 * */
const PublicLayout = () => {
    const { user } = useAuth();

    if (user) {
        return <Navigate to={UnitListPath} />;
    }

    return <Outlet />;
};

/**
 * Обертка предоставляющая доступ к текущему авторизованному пользователю `user` и методам `login`/`logout`.
 * */
const AuthLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

// Для использования нового api react-router-dom нужно определние с помощью `createRoutesFromElements`
export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthLayout />}>
                <Route element={<PublicLayout />}>
                    <Route index element={<Navigate to={loginPath} replace={true} />} />

                    <Route path={loginPath} element={<LoginForm />} />
                    <Route path={forgotPasswordPath} element={<ForgotPasswordForm />} />
                    <Route path={resetPasswordCodePath} element={<ResetPasswordCodeForm />} />
                    <Route path={newPasswordPath} element={<NewPasswordForm />} />

                    <Route path={registrationPath} element={<RegisterForm />} />
                    <Route path={successRegistrationPath} element={<SuccessRegisteredMsg />} />

                    <Route path={notFound} element={<Navigate to={loginPath} replace={true} />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route element={<App />} /*loader={API.users.getUser}*/>
                        <Route index element={<Navigate to={EventListPath} replace={true} />} />

                        <Route path="/profile/avatar" element={<AvatarEditorModal avatarType="personal" />} />

                        {/* ==================== events routes ==================== */}
                        <Route path={EventListPath} element={<EventList />} />
                        <Route path={CreateNewEventPath} element={<CreateEventForm />} />
                        <Route path={FullViewEventPath} element={<FullEventView />} />
                        <Route path={EditEventPath} element={<EditEventForm />} />

                        {/* ==================== notifications routes ==================== */}
                        <Route path={baseNotificationPath} element={<Outlet />}>
                            <Route index element={<NotificationList />} />
                        </Route>

                        {/* ==================== units routes ==================== */}
                        <Route path={UnitListPath} element={<UnitList />} />
                        <Route path={CreateNewUnitPath} element={<CreateUnitForm />} />
                        <Route path={FullViewUnitPath} element={<FullUnitView />} />
                        <Route path={EditUnitPath} element={<EditUnitForm />} />

                        {/* ==================== calendar routes ==================== */}
                        <Route path="/mcalendar" element={<FullCalendarMobileView />} />

                        <Route path={baseCalendarPath} element={<Outlet />}>
                            <Route index element={<TaskViewer />} />
                            <Route path="new/:date" element={<CreateTaskForm />} />
                        </Route>

                        {/* ==================== task routes ==================== */}

                        <Route path={CreateNewTaskPath} element={<CreateTaskForm />} />
                        <Route path={EditTaskPath} element={<EditTaskForm />} />
                        <Route path={TaskListPath} element={<FullCalendarMobileView />} />
                        <Route path={FullViewTaskPath} element={<FullTaskView />} />
                    </Route>

                    <Route path={notFound} element={<NotFound />} />
                </Route>
            </Route>
        </>
    )
);
