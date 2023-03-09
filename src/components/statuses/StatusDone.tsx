import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Tooltip } from "@mui/material";

export default function StatusDone() {
    return (
        <>
            <Tooltip title="Завершено">
                <CheckCircleIcon color="success" fontSize="small" />
            </Tooltip>
        </>
    );
}
