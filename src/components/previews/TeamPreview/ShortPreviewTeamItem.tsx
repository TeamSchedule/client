import { Link } from "react-router-dom";
import { TeamAvatar } from "../../avatars";
import { PrimaryPreviewText, SecondaryPreviewText } from "../PreviewComponents";
import { TeamsResponseItemSchema } from "../../../api/schemas/responses/teams";
import TeamIcon from "../../svg/TeamIcon";
import { COLORS } from "../../../consts";
import { ToDoListIcon } from "../../svg";
import styles from "./ShortPreviewTeamItem.module.scss";

interface ShortPreviewTeamItemProps {
    team: TeamsResponseItemSchema;
    linkTo?: string;
}

export default function ShortPreviewTeamItem({ linkTo, team }: ShortPreviewTeamItemProps) {
    return (
        <Link to={linkTo || "../teams/" + team.id}>
            <div className={styles.shortPreviewTeamItem}>
                <TeamHeader membersNumber={8} openTaskNumber={3} />
                <div className="m-auto d-flex justify-content-center">
                    <TeamAvatar imgSrc={""} size={80} teamColor={team.color} teamId={team.id.toString()} />
                </div>
                <PrimaryPreviewText text={team.name} className="mt-4 mb-0 text-center" />
                <SecondaryPreviewText text={""} className="text-center" />
            </div>
        </Link>
    );
}

interface TeamHeaderProps {
    openTaskNumber: number;
    membersNumber: number;
}

function TeamHeader(props: TeamHeaderProps) {
    return (
        <>
            <div className={styles.teamHeader}>
                <TeamHeaderItem value={props.membersNumber} Icon={TeamIcon} />
                <TeamHeaderItem value={props.openTaskNumber} Icon={ToDoListIcon} />
            </div>
        </>
    );
}

interface TeamHeaderItemProps {
    value: number;
    Icon: any;
}

function TeamHeaderItem(props: TeamHeaderItemProps) {
    const Icon = props.Icon;
    return (
        <div className="d-flex align-items-center">
            <div className="fs-4 fw-bold">{props.value}</div>
            {props.Icon && <Icon size={"1.75em"} color={COLORS.PRIMARY} />}
        </div>
    );
}
