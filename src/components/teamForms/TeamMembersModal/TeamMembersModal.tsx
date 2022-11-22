import React, { useState } from "react";
import { TeamsResponseItemSchema } from "../../../api/schemas/responses/teams";
import MemberItem from "../MemberItem";
import styles from "./TeamMembersModal.module.scss";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import CloseFormIcon from "../../generic/CloseFormIcon";
import OutgoingInvitationList from "../../teamPage/OutgoingInvitationList";
import SearchUsersField from "../../SearchUsersField";
import { CreateInvitationsRequestSchema } from "../../../api/schemas/requests/invitations";
import { API } from "../../../api/api";

export interface TeamModalProps {
    team?: TeamsResponseItemSchema;
    adminId?: number;
}

export function useTeamData() {
    return useOutletContext<TeamModalProps>();
}

export default function TeamMembersModal() {
    const navigate = useNavigate();

    const { teamId } = useParams();
    const { adminId, team } = useTeamData();

    const [isInviteInputOpen, setIsInviteInputOpen] = useState(false);

    const [usersToInvite, setUsersToInvite] = useState<Array<number>>([]);
    const [isInviteActionInProgress, setIsInviteActionInProgress] = useState(false);

    function onSendInvites(event: React.FormEvent) {
        event.preventDefault();
        setIsInviteActionInProgress(true);
        if (!teamId) return;

        const createInvitationData: CreateInvitationsRequestSchema = {
            teamId: +teamId,
            // @ts-ignore
            invitedIds: usersToInvite.map((user) => user.id),
        };
        API.invitations
            .createInvite(createInvitationData)
            .then(() => {
                navigate("..");
            })
            .finally(() => {
                setIsInviteActionInProgress(false);
            });
    }

    return (
        <>
            <div className={styles.teamModal}>
                <div className={styles.closeIconWrapper}>
                    <CloseFormIcon />
                </div>
                <p className={styles.membersTitle}>Участники команды</p>

                {!isInviteInputOpen && (
                    <div
                        className={styles.inviteNewBtn}
                        onClick={() => {
                            setIsInviteInputOpen(true);
                        }}
                    >
                        <span className={styles.plusCircle}>+</span> Пригласить участника
                    </div>
                )}

                {isInviteInputOpen && (
                    <SearchUsersField
                        onSendInvites={onSendInvites}
                        usersToInvite={usersToInvite}
                        setUsersToInvite={setUsersToInvite}
                        isInviteActionInProgress={isInviteActionInProgress}
                    />
                )}

                <div>
                    {team &&
                        team.members.map((member) => (
                            <MemberItem key={member.id} member={member} isAdmin={member.id === adminId} />
                        ))}
                </div>

                <OutgoingInvitationList teamId={teamId ? +teamId : null} />
            </div>
        </>
    );
}
