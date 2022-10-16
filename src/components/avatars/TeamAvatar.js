import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

function TeamAvatar({ className, imgSrc, size = 48 }) {
    return (
        <>
            <ListItemAvatar className={className}>
                <Avatar src={imgSrc} sx={{ width: size, height: size }} className={className} />
            </ListItemAvatar>
        </>
    );
}

export default TeamAvatar;
