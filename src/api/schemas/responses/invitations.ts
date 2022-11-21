import { TeamMembersItemSchema } from "./teams";

export interface GetIncomingInvitationsResponseSchema {
    invites: Array<IncomingInvitationItemSchema>;
}

export interface IncomingInvitationItemSchema {
    id: number;
    inviting: TeamMembersItemSchema;
    invited: TeamMembersItemSchema;
    date: string;
    status?: string;
    team: TeamOfInviteItem;
}

interface TeamOfInviteItem {
    id: number;
    name: string;
}

export interface GetOutgoingInvitationsResponseSchema {
    teamInvites: Array<OutgoingInvitationItemSchema>;
}

export interface OutgoingInvitationItemSchema {
    id: number;
    invitingId: number;
    invitedId: number;
    date: string;
    inviteStatus: string;
    team: TeamOfInviteItem;
}
