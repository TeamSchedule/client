import React from "react";
import { Link, Outlet } from "react-router-dom";
import Button from "@mui/material/Button";
import { TeamIcon } from "../svg";

function CreateNewTeamButton() {
    return (
        <>
            <Link to="new">
                <Button
                    className="p-2 px-3 w-100"
                    variant="outlined"
                    startIcon={<TeamIcon size={28} />}
                >
                    Создать новую команду
                </Button>
            </Link>
        </>
    );
}

export default function TeamPage() {
    return (
        <>
            <div className="mb-2">
                <CreateNewTeamButton />
            </div>

            <Outlet />
        </>
    );
}
