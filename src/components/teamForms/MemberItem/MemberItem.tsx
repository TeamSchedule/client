import React from "react";
import { TeamMembersItemSchema } from "../../../api/schemas/responses/teams";
import { UserAvatar } from "../../avatars";
import styles from "./MemberItem.module.scss";
import { AVATARS_STATIC_SERVER } from "../../../config/config";


interface TeamMemberItemProps {
    member: TeamMembersItemSchema;
    isAdmin: boolean;
}

export default function MemberItem(props: TeamMemberItemProps) {
    return (
        <>
            <div className={styles.memberItemWrapper}>
                <div className="mr-3">
                    <UserAvatar imgSrc={`${AVATARS_STATIC_SERVER}/${props.member.avatar}`} size={24} />
                </div>
                <div>
                    <span>{props.member.login}</span>
                    {props.isAdmin && <span className={styles.adminLabel}>Админ</span>}
                </div>
            </div>
        </>
    );
}
