import { Link } from "react-router-dom";
import { TeamAvatar } from "../avatars";
import { PrimaryPreviewText, SecondaryPreviewText } from "./PreviewComponents";

function ShortPreviewTeamItem({ className, description, imgSrc, teamName, linkTo }) {
    return (
        <Link to={linkTo} className={`shortPreviewTeamItem ${className}`}>
            <div className="p-4">
                <TeamAvatar imgSrc={imgSrc} size={80} className="m-auto" />
                <PrimaryPreviewText text={teamName} className="mt-4 mb-0 text-center" />
                <SecondaryPreviewText text={description} className="text-center" />
            </div>
        </Link>
    );
}

export default ShortPreviewTeamItem;
