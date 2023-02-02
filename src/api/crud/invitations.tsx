import { CreateInvitationsRequestSchema } from "../schemas/requests/invitations";
import {
    GetIncomingInvitationsResponseSchema,
    GetOutgoingInvitationsResponseSchema,
} from "../schemas/responses/invitations";
import requestApi from "../fetchApi";

type InvitationStatus = "OPEN" | "CLOSE";

export class invitations {
    static prefixUrl = "/schedule/team";

    static async getOutgoingTeamInvitations(status: InvitationStatus, teamId: number) {
        return requestApi
            .GET(`/bff/team/invite?criteria=inviting&status=${status}&teamId=${teamId}`)
            .then((res) => res.data)
            .then((data: GetOutgoingInvitationsResponseSchema) => {
                return data.invites;
            })
            .catch(() => {
                return [];
            });
    }

    static async getIncomingTeamInvitations() {
        return requestApi
            .GET(`/bff/team/invite?criteria=invited&status=OPEN`)
            .then((res) => res.data)
            .then((data: GetIncomingInvitationsResponseSchema) => data.invites)
            .catch(() => {
                return [];
            });
    }

    static async createInvite(data: CreateInvitationsRequestSchema) {
        return (await requestApi.POST(`${this.prefixUrl}/invite`, data)).data;
    }

    static async accept(invitationId: number) {
        return requestApi
            .PATCH(`${this.prefixUrl}/invite/${invitationId}`, { status: "accepted" })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                return null;
            });
    }

    static async reject(invitationId: number) {
        return requestApi
            .PATCH(`${this.prefixUrl}/invite/${invitationId}`, { status: "rejected" })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                return null;
            });
    }

    static async deleteInvitation(invitationId: number) {
        return requestApi
            .PATCH(`${this.prefixUrl}/invite/${invitationId}`, { status: "closed" })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                return null;
            });
    }
}
