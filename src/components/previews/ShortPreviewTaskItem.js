import TeamAvatar from "../avatars/TeamAvatar";
import { PrimaryPreviewText, SecondaryPreviewText } from "./PreviewComponents";
import RightAngleIcon from "../svg/RightAngleIcon";
import { Link } from "react-router-dom";
import { useState } from "react";
import PersonalAvatar from "../avatars/PersonalAvatar";

function ShortPreviewTaskItem({ className, imgSrc, isPrivate, taskName, description, taskId }) {
    const [isHovering, setIsHovering] = useState(false);
    const editIconColor = isHovering ? "#9b9b9b" : "#d0d0d0";

    return (
        <Link
            to={`tasks/${taskId}`}
            className="d-flex justify-content-between align-items-center mb-2"
            onMouseLeave={() => setIsHovering(false)}
            onMouseEnter={() => setIsHovering(true)}
            style={{
                border: "1px solid #E1E7FC",
                borderRadius: "15px",
                background: isHovering ? "#eaedff" : "#fff",
            }}
        >
            <div className={className + " " + "d-flex p-3 align-items-center"}>
                <div className="mr-3">
                    {isPrivate ? (
                        <PersonalAvatar size={60} />
                    ) : (
                        <TeamAvatar imgSrc={imgSrc} size={60} />
                    )}
                </div>

                <div>
                    <PrimaryPreviewText text={taskName} className="my-0 p-0" />
                    <SecondaryPreviewText text={description} />
                </div>
            </div>
            <RightAngleIcon color={editIconColor} size={64} />
        </Link>
    );
}

export default ShortPreviewTaskItem;
