import React from "react";
import { UserAvatar } from "../avatars";
import { API } from "../../api/api";
import { IncomingInvitationItemSchema } from "../../api/schemas/responses/invitations";
import { BaseButton } from "../buttons";
import { buttonStyles } from "../buttons";
import styles from "./IncomingInvitationItem.module.scss";
import { Link } from "react-router-dom";

interface IncomingInvitationItemProps {
    invitation: IncomingInvitationItemSchema;
    loadIncomingInvitations: () => void;
}
export default function IncomingInvitationItem({ invitation, loadIncomingInvitations }: IncomingInvitationItemProps) {
    function onAcceptClick() {
        API.invitations.accept(invitation.id).then(loadIncomingInvitations);
    }

    function onRejectClick() {
        API.invitations.reject(invitation.id).then(loadIncomingInvitations);
    }

    return (
        <>
            <div className={styles.incomingInvitationItem}>
                <div className={styles.incomingInvitationItem_teamSection}>
                    <UserAvatar avatarSrc="/" className="mr-2" />
                    <div className="mx-2">
                        <p className="my-0 fw-bold">{invitation.team.name}</p>
                        <InviterItem user={{ login: invitation.team.name }} />
                    </div>
                </div>

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
            </div>
        </>
    );
}

interface InviterItemProps {
    user: any;
}
function InviterItem(props: InviterItemProps) {
    return (
        <Link to=".">
            <div className="d-flex align-items-center">
                <span className="pr-2">От: </span>
                <UserAvatar avatarSrc={"props.user.avatar"} size={24} />
                <span className="px-2">{props.user.login}</span>
            </div>
        </Link>
    );
}
