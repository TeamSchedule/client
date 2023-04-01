import styles from "./UserPreview.module.scss";
import { UserSchema } from "../../../api/schemas/responses/users";
import MainAvatar from "../../MainAvatar";
import { makeFullName } from "../../../utils/userUtils";
import Box from "@mui/material/Box";
import { makeAvatarPath } from "../../../utils/fileUtils";

interface UserPreviewProps {
    user: UserSchema;
    clickable?: boolean;
    userPost?: string;
}

export default function UserPreview(props: UserPreviewProps) {
    return (
        <>
            <div className={[styles.userPreview, props.clickable ? styles.userPreview_clickable : ""].join(" ")}>
                <MainAvatar
                    placeholder={makeFullName(props.user)}
                    /*@ts-ignore*/
                    src={makeAvatarPath(props.user.id, props.user.avatar?.filename)}
                    fullPath
                />
                <Box sx={{ ml: 1 }}>
                    <p className={styles.userPreview__name}>{makeFullName(props.user)}</p>
                    <p className={styles.userPreview__post}>{props.userPost ? props.userPost : props.user.post}</p>
                </Box>
            </div>
        </>
    );
}
