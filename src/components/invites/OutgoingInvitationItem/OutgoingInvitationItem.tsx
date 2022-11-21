import React from "react";
import { OutgoingInvitationItemSchema } from "../../../api/schemas/responses/invitations";
import { BaseButton, buttonStyles } from "../../buttons";
import Invitation from "../Invitation";

interface OutgoingInvitationItemProps {
    invitation: OutgoingInvitationItemSchema;
    onUndoInvitation: (id: number) => void;
}

export default function OutgoingInvitationItem(props: OutgoingInvitationItemProps) {
    return (
        <>
            <div>
                <Invitation
                    // @ts-ignore TODO: fix
                    fromUser={props.invitation.invitingId}
                    date={props.invitation.date}
                    mainName={props.invitation.team.name}
                    mainAvatar={props.invitation.team.name}
                />

                <div className={buttonStyles.btnWrapper}>
                    <BaseButton
                        text="Отозвать приглашение"
                        color="danger"
                        onClick={() => {}}
                        className={buttonStyles.leftFlatButton}
                    />
                </div>
            </div>
        </>
    );
}
