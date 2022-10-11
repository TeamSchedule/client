import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

export default function TeamMembersAvatarsGroup({ users }) {
    return (
        <>
            <AvatarGroup total={users.length}>
                <Avatar alt={users[0].login} src={users[0].avatar} />
            </AvatarGroup>
        </>
    );
}
