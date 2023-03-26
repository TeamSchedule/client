import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import React from "react";

export interface CreateNewButtonProps {
    onClick: () => void;
    text: string;
}

export default function CreateNewButton(props: CreateNewButtonProps) {
    return (
        <>
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                size="medium"
                onClick={props.onClick}
                sx={{ px: 1, display: { xs: "none", md: "flex" } }}
            >
                {props.text}
            </Button>
            <IconButton
                color="primary"
                sx={{
                    display: { xs: "block", md: "none" },
                    borderRadius: "50%",
                    border: "1px solid",
                    borderColor: "primary",
                    width: "45px",
                    height: "45px",
                    m: 0,
                    p: 0,
                }}
                onClick={props.onClick}
            >
                <AddIcon />
            </IconButton>
        </>
    );
}
