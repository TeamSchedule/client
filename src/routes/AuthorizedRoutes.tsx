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
import { notFound } from "./paths";

export const authorizedRouter = createBrowserRouter(
    createRoutesFromElements(
        <>
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
        </>
    )
);
