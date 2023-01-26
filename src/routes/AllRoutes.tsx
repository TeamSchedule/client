import React from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, useOutlet } from "react-router-dom";
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
    baseNotificationPath,
    baseUnitPath,
    forgotPasswordPath,
    loginPath,
    newPasswordPath,
    notFound,
    registrationPath,
    resetPasswordCodePath,
    startPagePath,
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

const ProtectedLayout = () => {
    // @ts-ignore
    const { user } = useAuth();

    if (!user) {
        return <Navigate to={loginPath} />;
    }

    return <Outlet />;
};

const PublicLayout = () => {
    // @ts-ignore
    const { user } = useAuth();

    if (user) {
        return <Navigate to={baseUnitPath} />;
    }

    return <Outlet />;
};

const AuthLayout = () => {
    const outlet = useOutlet();

    return <AuthProvider>{outlet}</AuthProvider>;
};

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route element={<AuthLayout />}>
                <Route element={<PublicLayout />}>
                    <Route path={startPagePath} element={<Navigate to={loginPath} replace={true} />} />

                    <Route path={loginPath} element={<LoginForm />} />
                    <Route path={forgotPasswordPath} element={<ForgotPasswordForm />} />
                    <Route path={resetPasswordCodePath} element={<ResetPasswordCodeForm />} />
                    <Route path={newPasswordPath} element={<NewPasswordForm />} />

                    <Route path={registrationPath} element={<RegisterForm />} />
                    <Route path={successRegistrationPath} element={<SuccessRegisteredMsg />} />

                    <Route path={notFound} element={<NotFound />} />
                </Route>

                <Route element={<ProtectedLayout />}>
                    <Route path="/" /*loader={API.users.getUser}*/ element={<App />}>
                        <Route index element={<Navigate to={"calendar/"} replace={true} />} />

                        <Route path="profile/avatar" element={<AvatarEditorModal avatarType="personal" />} />

                        <Route path="events/" element={<Outlet />}>
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

                        <Route path="units/" element={<Outlet />}>
                            <Route index element={<UnitList />} />
                            <Route path="new" element={<CreateUnitForm />} />

                            <Route path=":id/" element={<Outlet />}>
                                <Route index element={<FullUnitView />} />
                                <Route path="edit" element={<EditUnitForm />} />
                            </Route>
                        </Route>

                        <Route path="tasks/" element={<TaskPage />}>
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
