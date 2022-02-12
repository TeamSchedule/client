import React from "react";
import {Route, Routes} from "react-router-dom";
import NoMatch from "../components/generic/no-match";
import App from "../components/App";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ProfilePage from "../components/mainSections/main/profilePage/ProfilePage";
import {Main} from "../components/mainSections/main/Main";
import TeamPage from "../components/mainSections/main/teamPage/TeamPage";
import {TaskPage} from "../components/mainSections/main/taskPage/TaskPage";
import TeamCreationForm from "../components/mainSections/main/teamPage/team-forms/TeamCreationForm";
import TeamEditingForm from "../components/mainSections/main/teamPage/team-forms/TeamEditingForm";
import {TaskViewer} from "../components/mainSections/main/taskPage/TaskViewer";
import EditionTaskForm from "../components/taskForms/EditionTaskForm";
import TaskForm from "../components/taskForms/taskForm";
import Welcome from "../components/Welcome";
import IncomingInvitationList
    from "../components/mainSections/main/teamPage/invitation-components/IncomingInvitationList";
import TeamInvitationTabs from "../components/mainSections/main/teamPage/TeamInvitationTabs";
import TeamList from "../components/mainSections/main/teamPage/TeamList";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Welcome />} />

                <Route path="login" element={<LoginForm />} />
                <Route path="signup" element={<RegisterForm />} />

                <Route path=":username/" element={<Main />}>
                    <Route path="profile" element={<ProfilePage />} />

                    <Route path="teams/" element={<TeamPage />}>
                        <Route path="" element={<TeamInvitationTabs />}>
                            <Route index element={<TeamList />} />
                            <Route path="new" element={<TeamCreationForm />} />
                            <Route path=":teamId" element={<TeamEditingForm />} />
                            <Route path="invitations" element={<IncomingInvitationList />} />
                        </Route>

                    </Route>

                    <Route path="tasks/" element={<TaskPage />}>
                        <Route index element={<TaskViewer />} />
                        <Route path="new/:date" element={<TaskForm />} />
                        <Route path="new" element={<TaskForm />} />
                        <Route path=":taskId" element={<EditionTaskForm />} />
                    </Route>

                </Route>
            </Route>

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
}
