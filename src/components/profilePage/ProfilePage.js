import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import TeamsPreviewSection from "./TeamsPreviewSection";
import UserInfoPreviewSection from "./UserInfoPreviewSection";
import SchedulePreviewSection from "./SchedulePreviewSection";
import { API } from "../../api/api";
import { getNextDayDate } from "../../utils/getPrevDayDate";

const today = new Date();
today.setHours(0);
today.setMinutes(0);

const tomorrow = getNextDayDate(today);

export default function ProfilePage() {
    const userInfo = useSelector(selectUserInfo);

    const [isTeamsLoading, setIsTeamsLoading] = useState(false);
    const [teamsErr, setTeamsErr] = useState(null);
    const [teamsNumber, setTeamsNumber] = useState(0);
    const [lastUpdatedTeams, setLastUpdatedTeams] = useState([]);

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
                        from: today.toJSON(),
                        to: tomorrow.toJSON(),
                        teams: teams.map((t) => t.id).join(","),
                    })
                    .then(setTodayTasks)
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
                                about="Сегодня я UI/UX дизайнер"
                                login={userInfo.login}
                                teamsNumber={teamsNumber}
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
