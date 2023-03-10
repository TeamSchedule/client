import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getDatetimeRepresentation } from "../../../utils/dateutils";

export interface DeadlinePlateProps {
    endDate: string;
    color?: string;
}

export default function DeadlinePlate(props: DeadlinePlateProps) {
    return (
        <Box sx={{ display: "flex", alignItems: "flex-end", mb: 0, verticalAlign: "bottom" }} color="text.secondary">
            <Typography
                sx={{
                    borderRadius: 1,
                    color: props.color ? props.color : "inherit",
                }}
            >
                {getDatetimeRepresentation(new Date(props.endDate))}
            </Typography>
        </Box>
    );
}
