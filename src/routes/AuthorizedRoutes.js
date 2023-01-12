import React from "react";
import {useSelector} from "react-redux";
import {selectUserInfo} from "../features/userInfoSlice";
import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import App from "../components/App";
import {Main} from "../components/Main";
import ProfilePage from "../components/profilePage/ProfilePage";
import AvatarEditorModal from "../components/AvatarEditorModal/AvatarEditorModal";
import {TaskPage} from "../components/taskPage/TaskPage";
import {TaskViewer} from "../components/taskPage/TaskViewer";
import CreateTaskForm from "../components/taskForms/CreateTaskForm";
import EditTaskForm from "../components/taskForms/EditTaskForm";
import NotFound from "../components/generic/NotFound";
import UnitList from "../components/units/UnitList/UnitList";
import CreateUnitForm from "../components/units/CreateUnitForm/CreateUnitForm";
import FullUnitView from "../components/units/FullUnitView/FullUnitView";
import EditUnitForm from "../components/units/EditUnitForm/EditUnitForm";
import EventList from "../components/events/EventList/EventList";
import CreateEventForm from "../components/events/CreateEventForm/CreateEventForm";

export default function AuthorizedRoutes() {
    const userInfo = useSelector(selectUserInfo);

    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<Navigate to={`/${userInfo.login}/profile`} replace={true}/>}/>

                <Route path=":username/" element={<Main/>}>
                    <Route index element={<Navigate to={`profile`} replace={true}/>}/>
                    <Route path="profile/" element={<ProfilePage/>}>
                        <Route path="avatar" element={<AvatarEditorModal avatarType="personal"/>}/>
                    </Route>


                    <Route path="events/" element={<Outlet/>}>
                        <Route index element={<EventList/>}/>
                        <Route path="new" element={<CreateEventForm/>}/>

                        <Route path=":id/" element={<Outlet/>}>
                            {/*<Route index element={< />} />*/}
                            {/*<Route path="edit" element={< />} />*/}
                        </Route>
                    </Route>

                    <Route path="units/" element={<Outlet/>}>
                        <Route index element={<UnitList/>}/>
                        <Route path="new" element={<CreateUnitForm/>}/>

                        <Route path=":id/" element={<Outlet/>}>
                            <Route index element={<FullUnitView/>}/>
                            <Route path="edit" element={<EditUnitForm/>}/>
                        </Route>
                    </Route>


                    <Route path="tasks/" element={<TaskPage/>}>
                        <Route index element={<TaskViewer/>}/>
                        <Route path="new/:date" element={<CreateTaskForm/>}/>
                        <Route path="new" element={<CreateTaskForm/>}/>
                        <Route path=":taskId" element={<EditTaskForm/>}/>
                    </Route>
                </Route>
            </Route>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}
