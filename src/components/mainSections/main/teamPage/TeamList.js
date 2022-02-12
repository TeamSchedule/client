import {useSelector} from "react-redux";
import {selectUserInfo} from "../../../../features/userInfoSlice";
import React, {useEffect, useState} from "react";
import Team from "./Team";
import {API} from "../../../../api-server/api";


export default function TeamList() {
    const userInfo = useSelector(selectUserInfo);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        API.teams.getUserTeams().then(data => {
            setTeams(data || []);
        });
    }, []);

    let teamsList = teams.filter(team => !(team.users.length === 1 && team.name === userInfo.username)).map((team) => <Team data={team} key={team.id} />);

    if (teamsList.length === 0) {
        return <p>You are not a member of any team</p>;
    }

    return (
        <>
            {teamsList}
        </>
    );
}
