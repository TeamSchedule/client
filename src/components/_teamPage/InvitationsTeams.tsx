import React, { useEffect, useState } from "react";
import TeamList from "./TeamList";
import IncomingInvitationList from "./IncomingInvitationList";
import CenterLayoutWrapper from "../generic/CenterLayoutWrapper";
import { API } from "../../api/api";
import { UnitsResponseItemSchema } from "../../schemas/responses/units";
import { IncomingInvitationItemSchema } from "../../schemas/responses/invitations";

export default function InvitationsTeams() {
    const [teams, setTeams] = useState<Array<UnitsResponseItemSchema>>([]);
    const [incomingInvitations, setIncomingInvitations] = useState<Array<IncomingInvitationItemSchema>>([]);

    function loadIncomingInvitations() {
        API.invitations.getIncomingTeamInvitations().then((invites: Array<IncomingInvitationItemSchema>) => {
            setIncomingInvitations(invites);
            console.log(invites);
        });
    }

    function loadTeams() {
        API.units
            .all()
            .then((teamList: Array<UnitsResponseItemSchema>) => {
                setTeams(teamList);
            })
            .catch(() => {});
    }

    useEffect(() => {
        loadTeams();
        loadIncomingInvitations();
    }, []);

    return (
        <CenterLayoutWrapper>
            <>
                <div className="my-4">
                    <IncomingInvitationList
                        incomingInvitations={incomingInvitations}
                        loadTeams={loadTeams}
                        loadIncomingInvitations={loadIncomingInvitations}
                    />
                </div>
                <div className="my-4">
                    <TeamList teams={teams} />
                </div>
            </>
        </CenterLayoutWrapper>
    );
}
