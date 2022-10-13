import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import React from "react";

function TeamAvatar({ imgSrc, width = 48, height = 48 }) {
    return (
        <>
            <ListItemAvatar>
                <Avatar src="/" sx={{ width: width, height: height }} />
            </ListItemAvatar>
        </>
    );
}

export default TeamAvatar;
