import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { CreateNewTaskPath } from "../../../routes/paths";
import FiltersDrawer from "../filters/FiltersDrawer";
import React from "react";
import { useNavigate } from "react-router-dom";
import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";

interface UtilSectionProps {
    setDisplayedTasks: (tasks: TaskResponseItemSchema[]) => void;
    tasks: TaskResponseItemSchema[];
}

export function UtilSection(props: UtilSectionProps) {
    const navigate = useNavigate();

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", mx: 2, mb: 2 }}>
                <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    onClick={() => {
                        navigate(CreateNewTaskPath);
                    }}
                    color="secondary"
                    sx={{ mr: 2 }}
                >
                    Задача
                </Button>
                <FiltersDrawer tasks={props.tasks} setDisplayedTasks={props.setDisplayedTasks} />
            </Box>
        </>
    );
}
