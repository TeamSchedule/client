import { UserSchema } from "../../../schemas/responses/users";

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
