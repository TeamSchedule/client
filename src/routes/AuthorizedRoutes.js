import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/userInfoSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "../components/App";
import { Main } from "../components/Main";
import ProfilePage from "../components/profilePage/ProfilePage";
import OverviewTab from "../components/profilePage/tabs/OverviewTab";
import SettingsTab from "../components/profilePage/tabs/SettingsTab";
import AvatarEditorTab from "../components/profilePage/AvatarEditorTab";
import TeamPage from "../components/teamPage/TeamPage";
import IncomingInvitationsTab from "../components/teamPage/IncomingInvitationsTab";
import TeamCreationForm from "../components/teamForms/TeamCreationForm";
import TeamEditingForm from "../components/teamForms/TeamEditingForm";
import { TaskPage } from "../components/taskPage/TaskPage";
import { TaskViewer } from "../components/taskPage/TaskViewer";
import CreateTaskForm from "../components/taskForms/CreateTaskForm";
import EditTaskForm from "../components/taskForms/EditTaskForm";
import NotFound from "../components/generic/NotFound";

export default function AuthorizedRoutes() {
    const userInfo = useSelector(selectUserInfo);

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route
                    index
                    element={<Navigate to={`/${userInfo.username}/profile`} replace={true} />}
                />

                <Route path=":username/" element={<Main />}>
                    <Route path="profile/" element={<ProfilePage />}>
                        <Route index element={<OverviewTab />} />
                        <Route path="settings" element={<SettingsTab />} />
                        <Route path="avatar" element={<AvatarEditorTab />} />
                    </Route>

                    <Route path="teams/" element={<TeamPage />}>
                        <Route index element={<IncomingInvitationsTab />} />
                        <Route path="new" element={<TeamCreationForm />} />
                        <Route path=":teamId" element={<TeamEditingForm />} />
                    </Route>

                    <Route path="tasks/" element={<TaskPage />}>
                        <Route index element={<TaskViewer />} />
                        <Route path="new/:date" element={<CreateTaskForm />} />
                        <Route path="new" element={<CreateTaskForm />} />
                        <Route path=":taskId" element={<EditTaskForm />} />
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
