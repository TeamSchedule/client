import React from "react";
import { UserAvatar } from "../../avatars";
import styles from "./MemberItem.module.scss";
import { UserSchema } from "../../../api/schemas/responses/users";

interface TeamMemberItemProps {
    member: UserSchema;
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
