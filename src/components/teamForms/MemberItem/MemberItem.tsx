import React from "react";
import { TeamMembersItemSchema } from "../../../schemas/responses/units";
import { UserAvatar } from "../../avatars";
import styles from "./MemberItem.module.scss";

interface TeamMemberItemProps {
    member: TeamMembersItemSchema;
    isAdmin: boolean;
}

export default function MemberItem(props: TeamMemberItemProps) {
    return (
        <>
            <div className={styles.memberItemWrapper}>
                <div className="mr-3">
                    <UserAvatar imgSrc={props.member.avatar || ""} size={24} />
                </div>
                <div>
                    <span>{props.member.login}</span>
                    {props.isAdmin && <span className={styles.adminLabel}>Админ</span>}
                </div>
            </div>
        </>
    );
}
