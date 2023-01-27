import { Link } from "react-router-dom";
import RightAngleIcon from "../../svg/RightAngleIcon";
import { PrimaryPreviewText, SecondaryPreviewText } from "../PreviewComponents";
import { PersonalAvatar, TeamAvatar } from "../../avatars";
import styles from "./ShortPreviewTaskItem.module.scss";
import { TaskResponseSchema } from "../../../schemas/responses/tasks";

interface ShortPreviewTaskItemProps {
    task: TaskResponseSchema;
    imgSrc?: string;
    isPrivate?: boolean;
    taskName: string;
    description: string;
    taskId: number;
}

function ShortPreviewTaskItem(props: ShortPreviewTaskItemProps) {
    return (
        <Link to={`../tasks/${props.taskId}`} className={styles.shortPreviewTaskItem}>
            <div className="d-flex p-3 align-items-center">
                <div className="mr-3">
                    {props.isPrivate ? (
                        <PersonalAvatar size={60} />
                    ) : (
                        <TeamAvatar
                            imgSrc={props.imgSrc || ""}
                            size={60}
                            teamId={props.task.team.id.toString()}
                            teamColor={"white"}
                        />
                    )}
                </div>

                <div>
                    <PrimaryPreviewText text={props.taskName} className="my-0 p-0" />
                    <SecondaryPreviewText text={props.description} />
                </div>
            </div>
            <RightAngleIcon size={64} className={styles.icon} />
        </Link>
    );
}

export default ShortPreviewTaskItem;
