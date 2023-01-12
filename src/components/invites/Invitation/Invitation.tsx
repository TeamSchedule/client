import React from "react";
import { Link } from "react-router-dom";
import { TeamMembersItemSchema } from "../../../schemas/responses/units";
import { UserAvatar } from "../../avatars";
import styles from "./Invitation.module.scss";

interface InvitationProps {
    children: React.ReactElement;
    mainAvatar: string;
    mainName: string;
    date: string;
    fromUser: TeamMembersItemSchema;
}

export default function Invitation(props: InvitationProps) {
    return (
        <div className={styles.invitation}>
            <div className={styles.infoSection}>
                <UserAvatar imgSrc={props.mainAvatar || ""} size={24} />
                <div className="mx-2">
                    <p className="my-0 fw-bold">{props.mainName}</p>
                    <InviterItem user={props.fromUser} />
                </div>

                <span className={styles.dateLabel}>{new Date(props.date).toLocaleDateString("ru-Ru")}</span>
            </div>
            {props.children}
        </div>
    );
}

interface InviterItemProps {
    user: TeamMembersItemSchema;
}

function InviterItem(props: InviterItemProps) {
    return (
        <Link to=".">
            <div className="d-flex align-items-center">
                <span className="pr-2">От: </span>
                <UserAvatar imgSrc={props.user.avatar || ""} size={24} />
                <span className="px-2">{props.user.login}</span>
            </div>
        </Link>
    );
}
