import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import TeamsPreviewSection from "./TeamsPreviewSection";
import UserInfoPreviewSection from "./UserInfoPreviewSection";
import SchedulePreviewSection from "./SchedulePreviewSection";
import { API } from "../../api/api";

export default function ProfilePage() {
    const userInfo = useSelector(selectUserInfo);

    const [isTeamsLoading, setIsTeamsLoading] = useState(false);
    const [teamsErr, setTeamsErr] = useState(null);
    const [teamsNumber, setTeamsNumber] = useState(0);
    const [lastUpdatedTeams, setLastUpdatedTeams] = useState([]);

    const [tasksNumber, setTasksNumber] = useState(0);
    const [todayTasks, setTodayTasks] = useState([]);

    useEffect(() => {
        setIsTeamsLoading(true);
        API.teams
            .all()
            .then((teams) => {
                setTeamsNumber(teams.length);
                const previewTeams = teams.sort().slice(0, 3);
                setLastUpdatedTeams(previewTeams);

                API.tasks
                    .getTasks({
                        teams: teams.map((t) => t.id).join(","),
                    })
                    .then((tasksData) => {
                        setTasksNumber(tasksData.length);
                        setTodayTasks(tasksData.slice(0, 3));
                    })
                    .catch(() => {})
                    .finally(() => {});
            })
            .catch(() => {
                setTeamsErr(true);
            })
            .finally(() => {
                setIsTeamsLoading(false);
            });
    }, []);

    return (
        <>
            <div className="row w-75 m-auto">
                <div className="d-flex">
                    <div style={{}} className="mb-2 mr-2 w-75">
                        <div className="mb-3">
                            <UserInfoPreviewSection
                                about={userInfo.about ? userInfo.about : ""}
                                login={userInfo.login}
                                startWorkingDt={userInfo.creationDate}
                                teamsNumber={teamsNumber}
                                tasksNumber={tasksNumber}
                            />
                        </div>
                        <TeamsPreviewSection
                            teams={lastUpdatedTeams}
                            err={teamsErr}
                            loading={isTeamsLoading}
                        />
                    </div>
                    <div className="w-50">
                        <SchedulePreviewSection todayTasks={todayTasks} />
                    </div>
                </div>
            </div>
        </>
    );
}
