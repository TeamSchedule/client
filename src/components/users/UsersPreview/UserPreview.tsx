import styles from "./UserPreview.module.scss";
import { UserSchema } from "../../../api/schemas/responses/users";
import MainAvatar from "../../MainAvatar";
import { makeFullName } from "../../../utils/userUtils";
import Box from "@mui/material/Box";

interface UserPreviewProps {
    user: UserSchema;
    clickable?: boolean;
    userPost?: string;
}

export default function UserPreview(props: UserPreviewProps) {
    return (
        <>
            <div className={[styles.userPreview, props.clickable ? styles.userPreview_clickable : ""].join(" ")}>
                <MainAvatar placeholder={props.user.fullName} src={props.user.avatar} />
                <Box sx={{ ml: 1 }}>
                    <p className={styles.userPreview__name}>{makeFullName(props.user)}</p>
                    <p className={styles.userPreview__post}>{props.userPost ? props.userPost : props.user.post}</p>
                </Box>
            </div>
        </>
    );
}
