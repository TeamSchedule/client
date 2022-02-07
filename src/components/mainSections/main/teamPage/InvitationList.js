import List from "@mui/material/List";
import TeamInvitation from "./TeamInvitation";
import React from "react";


export default function InvitationList(props) {
    if (!props.data || +props.data.length === 0) {
        return <span>You have no any invites</span>;
    }

    return (
        <List>
            {props.data.map(() => <TeamInvitation />)}
        </List>
    );
}
