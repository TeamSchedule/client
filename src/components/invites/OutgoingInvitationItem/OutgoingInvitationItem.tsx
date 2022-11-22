import React from "react";
import { OutgoingInvitationItemSchema } from "../../../api/schemas/responses/invitations";
import { BaseButton, buttonStyles } from "../../buttons";
import Invitation from "../Invitation";

interface OutgoingInvitationItemProps {
    invitation: OutgoingInvitationItemSchema;
    onUndoInvitation: (id: number) => void;
}

export default function OutgoingInvitationItem(props: OutgoingInvitationItemProps) {
    function onUndoInvitation(event: { preventDefault: () => void }) {
        event.preventDefault();
        props.onUndoInvitation(props.invitation.id);
    }

    return (
        <>
            <div>
                <Invitation
                    fromUser={props.invitation.inviting}
                    date={props.invitation.date}
                    mainName={props.invitation.invited.login}
                    mainAvatar={props.invitation.invited.avatar || ""}
                >
                    <BaseButton
                        text="Отозвать приглашение"
                        color="danger"
                        onClick={onUndoInvitation}
                        className={buttonStyles.leftFlatButton}
                    />
                </Invitation>
            </div>
        </>
    );
}
