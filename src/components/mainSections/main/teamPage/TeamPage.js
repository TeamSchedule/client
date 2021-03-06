import React from "react";
import {Link, Outlet} from "react-router-dom";
import GroupsIcon from '@mui/icons-material/Groups';
import Button from "@mui/material/Button";
import "./teamPage.css";


export default function TeamPage() {
    return (
        <div className="px-3">
            <div className="mb-2">
                <Link to="new">
                    <Button className="p-2 px-3" variant="outlined"
                            startIcon={<GroupsIcon fontSize="large" sx={{width: 28, height: 28}} />}>
                        Создать новую команду
                    </Button>
                </Link>
            </div>

            <Outlet />
        </div>
    );
}
