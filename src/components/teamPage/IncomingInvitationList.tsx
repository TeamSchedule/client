import React from "react";
import IncomingInvitationItem from "../IncomingInvitationItem";
import { IncomingInvitationItemSchema } from "../../api/schemas/responses/invitations";

interface IncomingInvitationListProps {
    incomingInvitations: Array<IncomingInvitationItemSchema>;
    loadIncomingInvitations: () => void;
    loadTeams: () => void;
}

export default function IncomingInvitationList(props: IncomingInvitationListProps) {
    if (props.incomingInvitations.length === 0) return null;

    return (
        <>
            <h3 className="text-center my-3">Вступай в команду</h3>
            <div>
                {props.incomingInvitations.map((invitation) => (
                    <IncomingInvitationItem
                        key={invitation.id}
                        invitation={invitation}
                        onAcceptInvite={() => {
                            props.loadTeams();
                            props.loadIncomingInvitations();
                        }}
                        onRejectInvite={props.loadIncomingInvitations}
                    />
                ))}
            </div>
        </>
    );
}
