import { UserSchema } from "../../../api/schemas/responses/users";
import UserPreview from "../../users/UsersPreview/UserPreview";
import WarningIcon from "@mui/icons-material/Warning";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import MainAvatar from "../../MainAvatar";
import { makeAvatarPath } from "../../../utils/fileUtils";
import { makeFullName } from "../../../utils/userUtils";
import Box from "@mui/material/Box";

const NoExecutorsWarning = () => (
    <Tooltip title="Исполнители не назначены">
        <WarningIcon color="warning" />
    </Tooltip>
);

interface ExecutorsProps {
    users: UserSchema[];
    fullView?: boolean;
}

export default function Executors(props: ExecutorsProps) {
    if (props.fullView) {
        return (
            <>
                <div>
                    <Typography component="span">Исполнители</Typography>

                    {!props.users.length && <NoExecutorsWarning />}
                    {props.users.map((user) => (
                        <UserPreview key={user.id} user={user} />
                    ))}
                </div>
            </>
        );
    }

    return (
        <Box sx={{ alignSelf: "flex-end" }}>
            {!props.users.length && <NoExecutorsWarning />}
            <Box sx={{ display: "flex", mt: 1 }}>
                {props.users.map((user) => (
                    <Tooltip title={makeFullName(user)}>
                        <Box sx={{ mr: 1 }}>
                            <MainAvatar
                                placeholder={makeFullName(user)}
                                size={32}
                                fullPath
                                src={makeAvatarPath(user.id, user.avatar?.filename || "")}
                            />
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </Box>
    );
}
