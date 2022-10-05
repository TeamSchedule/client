import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Badge from "@mui/material/Badge";
import {API} from "../../../api/api";
import TeamList from "./TeamList";
import IncomingInvitationList from "./invitation-components/IncomingInvitationList";


export default function TeamInvitationTabs() {
    const [value, setValue] = React.useState(0);

    const [incomingInvitations, setIncomingInvitations] = useState([]);

    function fetchIncomingTeamInvitations() {
        API.invitations.getIncomingTeamInvitations()
            .then(setIncomingInvitations);
    }

    useEffect(() => {
        fetchIncomingTeamInvitations();
    }, [value]);


    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={(event, newValue) => setValue(newValue)}>
                    <Tab label="Мои команды" onClick={() => {setValue(0)}} />
                    <Tab label={
                        <Badge badgeContent={incomingInvitations.length} color="success">
                            Приглашения
                        </Badge>
                    } onClick={() => {setValue(1)}} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>
                <TeamList />
            </TabPanel>

            <TabPanel value={value} index={1}>
                <IncomingInvitationList incomingInvitations={incomingInvitations}
                                        setIncomingInvitations={setIncomingInvitations} />
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
