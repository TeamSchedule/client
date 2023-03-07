import { TaskResponseItemSchema } from "../../../api/schemas/responses/tasks";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

interface DesktopCalendarTaskPreviewProps {
    task: TaskResponseItemSchema;
}

export default function DesktopCalendarTaskPreview(props: DesktopCalendarTaskPreviewProps) {
    const theme = useTheme();
    const deadline: Date = new Date(props.task.expirationTime);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    backgroundColor: props.task.event?.color || "none",
                    color: theme.palette.getContrastText(props.task.event?.color || "#ffffff"),
                    borderRadius: 1,
                    marginBottom: "3px",
                    flexGrow: 1,
                    padding: "1px",
                    px: 1,
                }}
            >
                <Typography sx={{ fontSize: "0.9rem", fontWeight: "bold" }}>{props.task.name}</Typography>
                <Typography sx={{ fontSize: "0.9rem" }}>{deadline.getHours() + ":" + deadline.getMinutes()}</Typography>
            </Box>
        </>
    );
}
