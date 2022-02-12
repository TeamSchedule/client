import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import {Outlet} from "react-router-dom";
import {useNavigate} from "react-router";
import {API} from "../../../../api-server/api";


export default function TeamInvitationTabs(props) {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();

    const [incomingInvitations, setIncomingInvitations] = useState([]);

    useEffect(() => {
        API.invitations.getIncomingTeamInvitations().then(data => {
            setIncomingInvitations(data.filter(invitation => invitation.inviteStatus === "OPEN"));
        });
    }, []);


    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
                    <Tab label="My teams" onClick={() => navigate("", {replace: true})} />
                    <Tab label={
                        <Badge badgeContent={1} color="success">
                            Invites
                        </Badge>
                    } onClick={() => navigate("invitations")} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <Outlet />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <Outlet context={[incomingInvitations, setIncomingInvitations]} />
            </TabPanel>
        </Box>
    );
}


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
