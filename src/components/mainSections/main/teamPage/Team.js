import {useNavigate} from "react-router";
import React from "react";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Avatars from "./Avatars";


export default function Team(props) {
    const navigate = useNavigate();

    function onTeamClick() {
        navigate(props.data.id.toString());
    }

    return (
        <div onClick={() => onTeamClick()} className="teamEditLink h-100">
            <ListItem alignItems="center">
                <ListItemAvatar>
                    <Avatar alt="T" src="/" sx={{width: 64, height: 64, marginRight: 2,}} />
                </ListItemAvatar>
                <div className="mr-3"
                     style={{width: 20, height: "5em", backgroundColor: "#2948c7", borderRadius: 5,}}></div>
                <ListItemText
                    primary={
                        <div className="d-flex align-items-center">
                            <strong className="mr-2">{props.data.name}</strong>
                            <Avatars users={props.data.users} />
                        </div>
                    }
                    secondary={
                        <span>{props.description || "Team description"}</span>
                    }
                />
            </ListItem>
            <Divider variant="inset" />
        </div>
    );
}
