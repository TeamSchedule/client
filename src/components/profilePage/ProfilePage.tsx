import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../../features/userInfoSlice";
import TeamsPreviewSection from "./TeamsPreviewSection";
import UserInfoPreviewSection from "./UserInfoPreviewSection";
import SchedulePreviewSection from "./SchedulePreviewSection";
import { API } from "../../api/api";
import { StatisticsDiagram } from "../statistics";
import { FilterTasksParamsSchema } from "../../api/schemas/requests/tasks";
import { GetTaskResponseSchema } from "../../api/schemas/responses/tasks";
import { TeamsResponseItemSchema } from "../../api/schemas/responses/teams";

let today = new Date();
today.setHours(0);
today.setMinutes(0);
today.setSeconds(0);

let tomorrow = new Date();
tomorrow.setHours(23);
tomorrow.setMinutes(59);
tomorrow.setSeconds(59);

export default function ProfilePage() {
    const userInfo = useSelector(selectUserInfo);

    const [isTeamsLoading, setIsTeamsLoading] = useState(false);
    const [teamsErr, setTeamsErr] = useState(false);
    const [teamsNumber, setTeamsNumber] = useState(0);
    const [lastUpdatedTeams, setLastUpdatedTeams] = useState<Array<TeamsResponseItemSchema>>([]);

    const [tasksNumber, setTasksNumber] = useState(0);
    const [todayTasks, setTodayTasks] = useState<Array<GetTaskResponseSchema>>([]);

    useEffect(() => {
        setIsTeamsLoading(true);
        API.teams
            .all()
            .then((teams: Array<TeamsResponseItemSchema>) => {
                setTeamsNumber(teams.length);
                const previewTeams = teams.sort().slice(0, 3);
                setLastUpdatedTeams(previewTeams);

                const filterTasksParams: FilterTasksParamsSchema = {
                    teams: teams.map((t) => t.id),
                    from: today,
                    to: tomorrow,
                };
                API.tasks
                    .getTasks(filterTasksParams)
                    .then((tasksData: Array<GetTaskResponseSchema>) => {
                        setTasksNumber(tasksData.length);
                        let todayTasks: Array<GetTaskResponseSchema> = [];
                        for (let task of tasksData) {
                            if (!task.closed) {
                                if (todayTasks.length >= 3) {
                                    break;
                                }
                                todayTasks.push(task);
                            }
                        }
                        setTodayTasks(todayTasks);
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
                    <div className="mb-2 mr-2 w-75">
                        <div className="mb-3">
                            <UserInfoPreviewSection
                                login={userInfo.login}
                                startWorkingDt={new Date(userInfo.creationDate)}
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
                        <StatisticsDiagram />
                    </div>
                </div>
            </div>
        </>
    );
}
