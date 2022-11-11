import React, { useEffect, useState } from "react";
import IncomingInvitationItem from "../IncomingInvitationItem";
import { API } from "../../api/api";
import { IncomingInvitationItemSchema } from "../../api/schemas/responses/invitations";

export default function IncomingInvitationList() {
    const [incomingInvitations, setIncomingInvitations] = useState<Array<IncomingInvitationItemSchema>>([]);

    function loadIncomingInvitations() {
        API.invitations.getIncomingTeamInvitations().then(setIncomingInvitations);
    }

    useEffect(() => {
        loadIncomingInvitations();
    }, []);

    if (incomingInvitations.length === 0) return null;

    return (
        <>
            <h3 className="text-center my-3">Вступай в команду</h3>
            <div>
                {incomingInvitations.map((invitation) => (
                    <IncomingInvitationItem
                        key={invitation.id}
                        invitation={invitation}
                        loadIncomingInvitations={loadIncomingInvitations}
                    />
                ))}
            </div>
        </>
    );
}
