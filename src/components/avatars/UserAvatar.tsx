import Avatar from "@mui/material/Avatar";

interface UserAvatarProps {
    avatarSrc: string;
    size?: number;
    className?: string;
}

export default function UserAvatar({ avatarSrc, size, className }: UserAvatarProps) {
    /*
     * Компонент аватара ползователя.
     * */
    return (
        <>
            <Avatar
                src={avatarSrc.length > 0 ? avatarSrc : ""}
                sx={{ width: size, height: size }}
                className={className}
            />
        </>
    );
}
