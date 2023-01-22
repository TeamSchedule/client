import React, { useEffect, useState } from "react";

import { Link, Outlet, useParams } from "react-router-dom";
import { API } from "../../../api/api";
import BaseForm from "../../generic/BaseForm";
import { UnitsResponseItemSchema } from "../../../schemas/responses/units";
import TeamAvatar from "../../avatars/TeamAvatar";
import styles from "./FullTeam.module.scss";

export default function FullTeam() {
    const { teamId } = useParams();

    const [teamData, setTeamData] = useState<UnitsResponseItemSchema>();

    useEffect(() => {
        if (!teamId) {
            return;
        }

        API.bff
            .getTeamData(+teamId)
            .then((team: UnitsResponseItemSchema) => {
                setTeamData(team);
            })
            .catch(() => {});
    }, [teamId]);

    return (
        <>
            <BaseForm autoComplete="false" onSubmit={null}>
                <TeamFormHeader team={teamData} />

                <Outlet context={{ adminId: teamData?.adminId, team: teamData }} />
            </BaseForm>
        </>
    );
}

interface TeamFOrmHeaderProps {
    team?: UnitsResponseItemSchema;
}

function TeamFormHeader(props: TeamFOrmHeaderProps) {
    return (
        <>
            <div className={styles.teamHeader}>
                <Link to={"edit"}>
                    <TeamAvatar
                        imgSrc={props.team?.avatar || ""}
                        size={50}
                        teamColor={props.team?.color}
                        teamId={props.team?.id.toString()}
                    />
                </Link>
                <div className={styles.teamNameMembersTextWrapper}>
                    <Link to={"edit"}>
                        <p className={styles.teamName}>{props.team?.name}</p>
                    </Link>
                    <Link to={"members"}>{props.team?.members.length} участника</Link>
                </div>
            </div>
        </>
    );
}
