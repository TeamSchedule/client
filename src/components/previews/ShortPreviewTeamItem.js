import { Link } from "react-router-dom";
import TeamAvatar from "../avatars/TeamAvatar";
import { PrimaryPreviewText, SecondaryPreviewText } from "./PreviewComponents";

function ShortPreviewTeamItem({ className, description, imgSrc, style, teamName, linkTo }) {
    return (
        <Link to={linkTo} className="text-decoration-none" style={{ minWidth: "200px" }}>
            <div
                className={className + " " + "p-4 "}
                style={{
                    background:
                        "linear-gradient(45deg, rgba(255,0,0,0.1) 20%, rgba(0,59,255, 0.2) 65%)",
                    borderRadius: "20px",
                    ...style,
                }}
            >
                <TeamAvatar imgSrc={imgSrc} size={80} className="m-auto" />
                <PrimaryPreviewText text={teamName} className="mt-4 mb-0 text-center" />
                <SecondaryPreviewText text={description} className="text-center" />
            </div>
        </Link>
    );
}

export default ShortPreviewTeamItem;
