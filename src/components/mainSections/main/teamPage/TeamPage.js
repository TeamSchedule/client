import React, {useEffect, useState} from "react";
import "./teamPage.css";
import {Outlet} from "react-router-dom";
import {API} from "../../../../api-server/api";
import {useDispatch, useSelector} from "react-redux";
import {selectUserInfo} from "../../../../features/userInfoSlice";
import {useNavigate} from "react-router";
import {onTeamClicked} from "../../../../features/editedTeamSlice";

import Badge from '@mui/material/Badge';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TeamInvitation from "./TeamInvitation";
import List from "@mui/material/List";
import {Link} from "react-router-dom";
import InvitationList from "./InvitationList";


function Team(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function onTeamClick() {
        dispatch(onTeamClicked(props.data));
        navigate(props.data.id.toString());
    }

    return (
        <div onClick={() => onTeamClick()} className="teamEditLink">
            <div className="teamItem p-2 mt-2" data={JSON.stringify(props.data)} team_id={props.data.id}>
                <div className="d-flex align-items-center">
                    <div className="teamItemName fs-4">{props.data.name}</div>
                    <div>&nbsp;</div>
                    <div>
                    <span>
                        ({props.data.users.length}) members
                    </span>
                    </div>
                </div>
                <div>
                <span
                    className="creationDate">Created at {props.data.creationDate.toString().split(',').join("-")}</span>
                </div>
            </div>
        </div>
    );
}


function TeamsList(props) {
    const userInfo = useSelector(selectUserInfo);

    let teams = props.teams;
    let teamsList = teams.filter(team => !(team.users.length === 1 && team.name === userInfo.username)).map((team) =>
        <Team data={team} key={team.id} />);

    if (teamsList.length === 0) {
        teamsList = <p>You are not a member of any team</p>;
    }
    return (
        <div className="mt-4">
            {teamsList}
        </div>
    );
}


function TeamPage() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        API.teams.getUserTeams().then(data => {
            setTeams(data || []);
        });
    }, []);

    return (
        <div className="p-3 teamPage">

            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <Link to="new">
                        <div className="d-flex align-items-center px-2 py-1 createTeamBtn">
                            <svg className="createTeamIcon m-2" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M19 17V19H7V17S7 13 13 13 19 17 19 17M16 8A3 3 0 1 0 13 11A3 3 0 0 0 16 8M19.2 13.06A5.6 5.6 0 0 1 21 17V19H24V17S24 13.55 19.2 13.06M18 5A2.91 2.91 0 0 0 17.11 5.14A5 5 0 0 1 17.11 10.86A2.91 2.91 0 0 0 18 11A3 3 0 0 0 18 5M8 10H5V7H3V10H0V12H3V15H5V12H8Z" />
                            </svg>
                            <span>Create new team</span>
                        </div>
                    </Link>
                </div>
                <BasicTabs teams={teams} />
                <Outlet />
            </div>
        </div>
    );
}


export default TeamPage;


function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography component='div'>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function BasicTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="My teams" />
                    <Tab label={
                        <Badge badgeContent={0} color="success">
                            Invites
                        </Badge>
                    } />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <TeamsList teams={props.teams} />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <InvitationList data={[1, 2, 3]}/>
            </TabPanel>
        </Box>
    );
}
