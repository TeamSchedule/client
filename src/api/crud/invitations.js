import $axios from "../axiosRequests";


export class invitations {
    static prefixUrl = "/schedule/team";

    static async getOutgoingTeamInvitations(status, teamId) {
        return $axios.get(`${this.prefixUrl}/invite?criteria=inviting&status=${status}&teamId=${teamId}`).then(res => {
            return res.data["teamInvites"];
        }).catch(() => {
            return [];
        });
    }

    static async getIncomingTeamInvitations() {
        return $axios.get(`${this.prefixUrl}/invite?criteria=invited&status=OPEN`).then(res => {
            return res.data["teamInvites"];
        }).catch(() => {
            return [];
        });
    }

    static async create(data) {
        return (await $axios.post(`${this.prefixUrl}/invite`, data)).data;
    }

    static async accept(invitationId) {
        return $axios.patch(`${this.prefixUrl}/invite/${invitationId}`, {"status": "accepted"})
            .then(res => {
                return res.data;
            }).catch(() => {
                return null;
            });
    }

    static async reject(invitationId) {
        return $axios.patch(`${this.prefixUrl}/invite/${invitationId}`, {"status": "rejected"})
            .then(res => {
                return res.data;
            }).catch(() => {
                return null;
            });
    }


    static async deleteInvitation(invitationId) {
        return $axios.patch(`${this.prefixUrl}/invite/${invitationId}`, {"status": "closed"})
            .then(res => {
                return res.data;
            }).catch(() => {
                return null;
            });
    }
}
