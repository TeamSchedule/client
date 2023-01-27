import { UserSchema } from "../../../api/schemas/responses/users";

interface NotificationPreviewProps {
    createdAt: Date;
    user: UserSchema;
}

export default function NotificationPreview(props: NotificationPreviewProps) {
    return (
        <>
            <div></div>
        </>
    );
}
