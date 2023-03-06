import styles from "./UserPreview.module.scss";
import { useNavigate } from "react-router-dom";
import { UserSchema } from "../../../api/schemas/responses/users";
import MainAvatar from "../../MainAvatar";
import { makeFullName } from "../../../utils/userUtils";

interface UserPreviewProps {
    user: UserSchema;
    clickable?: boolean;
    userPost?: string;
}

export default function UserPreview(props: UserPreviewProps) {
    const navigate = useNavigate();

    function onClickHandler() {
        if (!props.clickable) return;
        navigate("/users/" + props.user.id);
    }

    return (
        <>
            <div
                className={[styles.userPreview, props.clickable ? styles.userPreview_clickable : ""].join(" ")}
                onClick={onClickHandler}
            >
                <MainAvatar placeholder={props.user.fullName} src={props.user.avatar} />
                <div className="ml-2">
                    <p className={styles.userPreview__name}>{makeFullName(props.user)}</p>
                    <p className={styles.userPreview__post}>{props.userPost ? props.userPost : props.user.post}</p>
                </div>
            </div>
        </>
    );
}
