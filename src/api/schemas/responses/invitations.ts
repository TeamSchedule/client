export interface GetIncomingInvitationsResponseSchema {
    teamInvites: Array<IncomingInvitationItemSchema>;
}

export interface IncomingInvitationItemSchema {
    id: number;
    invitingId: number;
    invitedId: number;
    date: string;
    inviteStatus: string;
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
