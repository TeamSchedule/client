import { useNavigate } from "react-router";
import React from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import TeamAvatar from "../avatars/TeamAvatar";

export default function Team(props) {
    const navigate = useNavigate();

    function onTeamClick() {
        navigate(props.data.id.toString());
    }

    return (
        <div onClick={() => onTeamClick()} className="teamEditLink h-100">
            <ListItem alignItems="center">
                <TeamAvatar imgSrc="" />
                <div
                    className="mr-3"
                    style={{
                        width: 20,
                        height: "3em",
                        backgroundColor: props.data.color,
                        borderRadius: 5,
                    }}
                ></div>
                <ListItemText
                    primary={
                        <div className="d-flex align-items-center">
                            <strong className="mr-2">{props.data.name}</strong>
                            {/*<TeamMembersAvatarsGroup users={props.data.users}/>*/}
                        </div>
                    }
                />
            </ListItem>
            <Divider variant="inset" />
        </div>
    );
}