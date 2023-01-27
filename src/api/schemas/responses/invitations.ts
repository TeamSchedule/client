import { UserSchema } from "./users";

export interface GetIncomingInvitationsResponseSchema {
    invites: Array<IncomingInvitationItemSchema>;
}

export interface IncomingInvitationItemSchema {
    id: number;
    inviting: UserSchema;
    invited: UserSchema;
    date: string;
    status?: string;
    team: TeamOfInviteItem;
}

interface TeamOfInviteItem {
    id: number;
    name: string;
}

export interface GetOutgoingInvitationsResponseSchema {
    invites: Array<OutgoingInvitationItemSchema>;
}

export interface OutgoingInvitationItemSchema {
    id: number;
    inviting: UserSchema;
    invited: UserSchema;
    date: string;
    status: string;
    team: TeamOfInviteItem;
}
