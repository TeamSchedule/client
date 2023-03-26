import { useNavigate } from "react-router-dom";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { UnitParticipants } from "../common";
import React from "react";
import { useTheme } from "@mui/material";
import { makeUnitLinkById } from "../../../routes/paths";

interface UnitPreviewProps {
    unit: UnitResponseItemSchema;
    selected?: boolean;
}

export default function UnitPreview(props: UnitPreviewProps) {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <>
            <Card
                sx={{
                    minWidth: 280,
                    borderRadius: 0,
                    py: 0,
                    pt: 2,
                    my: 0,
                    "&:hover": { cursor: "pointer", backgroundColor: "#f1f7ff" },
                    backgroundColor: props.selected ? theme.palette.divider : "none",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(makeUnitLinkById(props.unit.id));
                }}
                elevation={0}
            >
                <CardContent sx={{ py: 0, my: 0 }}>
                    <Typography variant="subtitle1" component="div">
                        {props.unit.name}
                    </Typography>
                    <UnitParticipants admin={props.unit.admin} members={props.unit.members || []} />
                </CardContent>
            </Card>
        </>
    );
}
