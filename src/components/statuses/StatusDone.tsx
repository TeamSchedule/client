import { Tooltip } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

export default function StatusDone() {
    return (
        <>
            <Tooltip title="Завершено">
                <DoneIcon color="success" fontSize="medium" />
            </Tooltip>
        </>
    );
}
