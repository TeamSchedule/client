import React from "react";
import TeamList from "./TeamList";
import IncomingInvitationList from "./IncomingInvitationList";

export default function InvitationsTeams() {
    return (
        <>
            <IncomingInvitationList />
            <TeamList />
        </>
    );
}
