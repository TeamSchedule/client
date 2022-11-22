import React from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../features/userInfoSlice";
import { Navigate, Route, Routes } from "react-router-dom";
import App from "../components/App";
import { Main } from "../components/Main";
import ProfilePage from "../components/profilePage/ProfilePage";
import SettingsTab from "../components/profilePage/SettingsTab";
import AvatarEditorModal from "../components/AvatarEditorModal/AvatarEditorModal";
import TeamPage from "../components/teamPage/TeamPage";
import InvitationsTeams from "../components/teamPage/InvitationsTeams";
import TeamCreationForm from "../components/teamForms/TeamCreationForm";
import FullTeam from "../components/teamForms/FullTeam";
import { TaskPage } from "../components/taskPage/TaskPage";
import { TaskViewer } from "../components/taskPage/TaskViewer";
import CreateTaskForm from "../components/taskForms/CreateTaskForm";
import EditTaskForm from "../components/taskForms/EditTaskForm";
import NotFound from "../components/generic/NotFound";
import TeamMembersModal from "../components/teamForms/TeamMembersModal";
import TeamEditModal from "../components/teamForms/TeamEditModal";

export default function AuthorizedRoutes() {
    const userInfo = useSelector(selectUserInfo);

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Navigate to={`/${userInfo.login}/profile`} replace={true} />} />

                <Route path=":username/" element={<Main />}>
                    <Route index element={<Navigate to={`profile`} replace={true} />} />
                    <Route path="profile/" element={<ProfilePage />}>
                        <Route path="avatar" element={<AvatarEditorModal avatarType="personal" />} />
                    </Route>

                    <Route path="settings/" element={<SettingsTab />} />

                    <Route path="teams/" element={<TeamPage />}>
                        <Route index element={<InvitationsTeams />} />
                        <Route path="new" element={<TeamCreationForm />} />
                        <Route path=":teamId/" element={<FullTeam />}>
                            <Route path="members" element={<TeamMembersModal />} />
                            <Route path="edit" element={<TeamEditModal />} />
                            <Route path="edit/avatar" element={<AvatarEditorModal avatarType="team" />} />
                        </Route>
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
