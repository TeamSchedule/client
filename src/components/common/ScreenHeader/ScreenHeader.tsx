import React from "react";
import Typography from "@mui/material/Typography";

interface ScreenHeaderProps {
    text: string;
}

export default function ScreenHeader(props: ScreenHeaderProps) {
    return (
        <>
            <Typography variant="h6" component="h1" align="center">
                {props.text}
            </Typography>
        </>
    );
}
