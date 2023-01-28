import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route } from "react-router-dom";
import App from "../components/App";
import AvatarEditorModal from "../components/AvatarEditorModal/AvatarEditorModal";
import { TaskPage } from "../components/taskPage/TaskPage";
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
    baseEventPath,
    baseNotificationPath,
    baseUnitPath,
    forgotPasswordPath,
    loginPath,
    newPasswordPath,
    notFound,
    registrationPath,
    resetPasswordCodePath,
    successRegistrationPath,
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
        return <Navigate to={baseUnitPath} />;
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
                        <Route index element={<Navigate to={"calendar/"} replace={true} />} />

                        <Route path="profile/avatar" element={<AvatarEditorModal avatarType="personal" />} />

                        <Route path={baseEventPath} element={<Outlet />}>
                            <Route index element={<EventList />} />
                            <Route path="new" element={<CreateEventForm />} />

                            <Route path=":id/" element={<Outlet />}>
                                {/*<Route index element={< />} />*/}
                                {/*<Route path="edit" element={< />} />*/}
                            </Route>
                        </Route>

                        <Route path={baseNotificationPath} element={<Outlet />}>
                            <Route index element={<NotificationList />} />
                        </Route>

                        <Route path={baseUnitPath} element={<Outlet />}>
                            <Route index element={<UnitList />} />
                            <Route path="new" element={<CreateUnitForm />} />

                            <Route path=":id/" element={<Outlet />}>
                                <Route index element={<FullUnitView />} />
                                <Route path="edit" element={<EditUnitForm />} />
                            </Route>
                        </Route>

                        <Route path={baseCalendarPath} element={<TaskPage />}>
                            <Route index element={<TaskViewer />} />
                            <Route path="new/:date" element={<CreateTaskForm />} />
                            <Route path="new" element={<CreateTaskForm />} />
                            <Route path=":taskId" element={<EditTaskForm />} />
                        </Route>
                    </Route>

                    <Route path={notFound} element={<NotFound />} />
                </Route>
            </Route>
        </>
    )
);
