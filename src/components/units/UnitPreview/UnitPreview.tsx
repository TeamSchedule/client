import { useNavigate } from "react-router-dom";
import styles from "./UnitPreview.module.scss";
import { UnitResponseItemSchema } from "../../../api/schemas/responses/units";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { UnitParticipants } from "../common";
import React from "react";

interface UnitPreviewProps {
    unit: UnitResponseItemSchema;
}

export default function UnitPreview(props: UnitPreviewProps) {
    const navigate = useNavigate();

    return (
        <>
            <Card sx={{ minWidth: 280, marginBottom: 1 }}>
                <CardContent>
                    <div
                        className={styles.unit}
                        onClick={() => {
                            navigate(props.unit.id.toString(), { state: { unitData: props.unit } });
                        }}
                    >
                        <Typography variant="subtitle1" component="div">
                            {props.unit.name}
                        </Typography>
                        <UnitParticipants admin={props.unit.admin} members={props.unit.members || []} />
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
