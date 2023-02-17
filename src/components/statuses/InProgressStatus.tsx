import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { Tooltip } from "@mui/material";

export default function InProgressStatus() {
    return (
        <>
            <Tooltip title="Выполняется">
                <BuildCircleIcon color="warning" />
            </Tooltip>
        </>
    );
}
