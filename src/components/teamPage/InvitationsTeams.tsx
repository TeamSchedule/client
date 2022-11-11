import React from "react";
import TeamList from "./TeamList";
import IncomingInvitationList from "./IncomingInvitationList";
import CenterLayoutWrapper from "../generic/CenterLayoutWrapper";

export default function InvitationsTeams() {
    return (
        <CenterLayoutWrapper>
            <>
                <div className="my-4">
                    <IncomingInvitationList />
                </div>
                <div className="my-4">
                    <TeamList />
                </div>
            </>
        </CenterLayoutWrapper>
    );
}
