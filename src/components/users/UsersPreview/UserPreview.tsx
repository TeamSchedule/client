import styles from "./UserPreview.module.scss";
import UserAvatar from "../../avatars/UserAvatar";
import { User } from "../../../schemas/instances/users";
import { useNavigate } from "react-router-dom";

interface UserPreviewProps {
    user: User;
    clickable?: boolean;
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
                <UserAvatar fullImgSrc={"https://avatars.githubusercontent.com/u/65413499?v=4"} size={35} />
                <div className="ml-2">
                    <p className={styles.userPreview__name}>{props.user.fullName}</p>
                    <p className={styles.userPreview__post}>{props.user.post}</p>
                </div>
            </div>
        </>
    );
}
