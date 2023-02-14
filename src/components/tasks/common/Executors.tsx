import { UserSchema } from "../../../api/schemas/responses/users";
import UserPreview from "../../users/UsersPreview/UserPreview";
import WarningIcon from "@mui/icons-material/Warning";
import Typography from "@mui/material/Typography";
import { Tooltip } from "@mui/material";

interface ExecutorsProps {
    users: UserSchema[];
}

export default function Executors(props: ExecutorsProps) {
    return (
        <>
            <div>
                <Typography component="span">Исполнители</Typography>

                {!props.users.length && (
                    <Tooltip title="Исполнители не назначены">
                        <WarningIcon color="warning" />
                    </Tooltip>
                )}
                {props.users.map((user) => (
                    <UserPreview user={user} />
                ))}
            </div>
        </>
    );
}
