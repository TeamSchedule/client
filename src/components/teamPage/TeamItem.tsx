import { useNavigate } from "react-router-dom";
import React from "react";
import { TeamAvatar } from "../avatars";
import { TeamsResponseItemSchema } from "../../api/schemas/responses/teams";
import { Divider, ListItem, ListItemText } from "@mui/material";

interface TeamItemProps {
    team: TeamsResponseItemSchema;
    className?: string;
}

export default function TeamItem(props: TeamItemProps) {
    const navigate = useNavigate();

    function onTeamClick() {
        navigate(props.team.id.toString());
    }

    return (
        <div onClick={onTeamClick} className="h-100 px-0 cursor-pointer text-decoration-none">
            <ListItem alignItems="center" disableGutters>
                <TeamAvatar imgSrc="" />
                <div
                    className="mr-3"
                    style={{
                        width: 20,
                        height: "3em",
                        backgroundColor: props.team.color,
                        borderRadius: 5,
                    }}
                ></div>
                <ListItemText
                    primary={
                        <div className="d-flex align-items-center">
                            <strong className="mr-2">{props.team.name}</strong>
                            {/*<TeamMembersAvatarsGroup users={props.data.users}/>*/}
                        </div>
                    }
                />
            </ListItem>
            <Divider variant="inset" />
        </div>

        // <Link to={`${props.team.id}`} className={`shortPreviewTeamItem ${props.className}`}>
        //     <div className="p-4">
        //         <TeamAvatar imgSrc={""} size={80} className="m-auto" teamColor={props.team.color} />
        //         <PrimaryPreviewText text={props.team.name} className="mt-4 mb-0 text-center" />
        //         <SecondaryPreviewText text={""} className="text-center" />
        //     </div>
        // </Link>
    );
}
