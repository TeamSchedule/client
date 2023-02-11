import { UserSchema } from "../../../api/schemas/responses/users";
import UserPreview from "../../users/UsersPreview/UserPreview";

interface ExecutorsProps {
    users: UserSchema[];
}

export default function Executors(props: ExecutorsProps) {
    if (props.users.length === 0) {
        return (
            <>
                <div>Исполнитель не назначен</div>
            </>
        );
    }

    return (
        <>
            <div>
                <span>Исполнитель</span>

                {props.users.map((user) => (
                    <UserPreview user={user} />
                ))}
            </div>
        </>
    );
}
