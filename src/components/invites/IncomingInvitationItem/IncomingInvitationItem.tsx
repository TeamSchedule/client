import React from "react";
import { API } from "../../../api/api";
import { IncomingInvitationItemSchema } from "../../../api/schemas/responses/invitations";
import { BaseButton, buttonStyles } from "../../buttons";
import Invitation from "../Invitation";

interface IncomingInvitationItemProps {
    invitation: IncomingInvitationItemSchema;
    onAcceptInvite: () => void;
    onRejectInvite: () => void;
}

export default function IncomingInvitationItem(props: IncomingInvitationItemProps) {
    function onAcceptClick() {
        API.invitations.accept(props.invitation.id).then(props.onAcceptInvite);
    }

    function onRejectClick() {
        API.invitations.reject(props.invitation.id).then(props.onRejectInvite);
    }

    return (
        <>
            <Invitation
                fromUser={props.invitation.inviting}
                date={props.invitation.date}
                mainName={props.invitation.team.name}
                mainAvatar={props.invitation.team.name}
            >
                <div className={buttonStyles.btnWrapper}>
                    <BaseButton
                        text="Вступить"
                        color="success"
                        onClick={onAcceptClick}
                        className={buttonStyles.rightFlatButton}
                    />
                    <BaseButton
                        text="Отклонить"
                        color="danger"
                        onClick={onRejectClick}
                        className={buttonStyles.leftFlatButton}
                    />
                </div>
            </Invitation>
        </>
    );
}
