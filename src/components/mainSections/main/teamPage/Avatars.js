import Avatar from "@mui/material/Avatar";
import AvatarGroup from '@mui/material/AvatarGroup';


export default function Avatars(props) {
    return (
        <>
            <AvatarGroup total={props.users.length}>
                <Avatar alt={props.users[0].login}
                        src={props.users[0].avatar}
                        />
            </AvatarGroup>
        </>
    );
}
