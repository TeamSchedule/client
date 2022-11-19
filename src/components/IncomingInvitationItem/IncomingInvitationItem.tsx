import React from "react";
import { Link } from "react-router-dom";
import { UserAvatar } from "../avatars";
import { API } from "../../api/api";
import { IncomingInvitationItemSchema } from "../../api/schemas/responses/invitations";
import { BaseButton } from "../buttons";
import { buttonStyles } from "../buttons";
import styles from "./IncomingInvitationItem.module.scss";

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
            <div className={styles.incomingInvitationItem}>
                <div className={styles.incomingInvitationItem_teamSection}>
                    <UserAvatar imgSrc="/" size={24} />
                    <div className="mx-2">
                        <p className="my-0 fw-bold">{props.invitation.team.name}</p>
                        <InviterItem user={{ login: "user login" }} />
                    </div>

                    <span className={styles.dateLabel}>
                        {new Date(props.invitation.date).toLocaleDateString("ru-Ru")}
                    </span>
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
                <UserAvatar imgSrc={"props.user.avatar"} size={24} />
                <span className="px-2">{props.user.login}</span>
            </div>
        </Link>
    );
}
