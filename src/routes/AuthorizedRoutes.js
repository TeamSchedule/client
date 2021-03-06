import React from "react";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../features/userInfoSlice";
import {Navigate, Route, Routes} from "react-router-dom";
import App from "../components/App";
import {Main} from "../components/mainSections/main/Main";
import ProfilePage from "../components/mainSections/main/profilePage/ProfilePage";
import OverviewTab from "../components/mainSections/main/profilePage/tabs/OverviewTab";
import SettingsTab from "../components/mainSections/main/profilePage/tabs/SettingsTab";
import AvatarEditorTab from "../components/mainSections/main/profilePage/AvatarEditorTab";
import TeamPage from "../components/mainSections/main/teamPage/TeamPage";
import TeamInvitationTabs from "../components/mainSections/main/teamPage/TeamInvitationTabs";
import TeamCreationForm from "../components/mainSections/main/teamPage/team-forms/TeamCreationForm";
import TeamEditingForm from "../components/mainSections/main/teamPage/team-forms/TeamEditingForm";
import {TaskPage} from "../components/mainSections/main/taskPage/TaskPage";
import {TaskViewer} from "../components/mainSections/main/taskPage/TaskViewer";
import TaskForm from "../components/taskForms/taskForm";
import EditionTaskForm from "../components/taskForms/EditionTaskForm";
import NotFound from "../components/generic/NotFound";


export default function AuthorizedRoutes() {
    const userInfo = useSelector(selectUserInfo);

    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Navigate to={`/${userInfo.username}/profile`} replace={true} />} />

                <Route path=":username/" element={<Main />}>

                    <Route path="profile/" element={<ProfilePage />}>
                        <Route index element={<OverviewTab />} />
                        <Route path="settings" element={<SettingsTab />} />
                        <Route path="avatar" element={<AvatarEditorTab />} />
                    </Route>

                    <Route path="teams/" element={<TeamPage />}>
                        <Route index element={<TeamInvitationTabs />} />
                        <Route path="new" element={<TeamCreationForm />} />
                        <Route path=":teamId" element={<TeamEditingForm />} />
                    </Route>

                    <Route path="tasks/" element={<TaskPage />}>
                        <Route index element={<TaskViewer />} />
                        <Route path="new/:date" element={<TaskForm />} />
                        <Route path="new" element={<TaskForm />} />
                        <Route path=":taskId" element={<EditionTaskForm />} />
                    </Route>

                </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
