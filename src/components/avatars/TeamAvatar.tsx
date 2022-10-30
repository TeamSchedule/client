import React from "react";
import Avatar from "@mui/material/Avatar";
import ListItemAvatar from "@mui/material/ListItemAvatar";

interface TeamAvatarProps {
    className?: string;
    imgSrc: string;
    size?: number;
    teamColor?: string;
}

function TeamAvatar({ className, imgSrc, size = 48, teamColor }: TeamAvatarProps) {
    return (
        <>
            <ListItemAvatar className={className}>
                <Avatar
                    src={imgSrc}
                    sx={{ width: size, height: size }}
                    className={className}
                    style={{ border: `4px solid ${teamColor}` }}
                />
            </ListItemAvatar>
        </>
    );
}

export default TeamAvatar;
