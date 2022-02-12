import $axios from "./axiosRequests";


export class invitationsAPI {
    static apiPrefix = "/invitations";

    static async getOutgoingTeamInvitations() {
        return $axios.get(`/team/invite?criteria=inviting`).then(res => {
            return res.data;
        }).catch(() => {
            return [];
        });
    }

    static async getIncomingTeamInvitations() {
        return $axios.get(`/team/invite?criteria=invited`).then(res => {
            return res.data;
        }).catch(() => {
            return [];
        });
    }

    static async createInvitation(data) {
        return (await $axios.post(`/team/invite`, data)).data;
    }

    static deleteInvitation(invitationId) {
        return $axios.delete(`${this.apiPrefix}/${invitationId}`).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }

    static async acceptInvitation(invitationId) {
        return $axios.post(`/team/inviteput`, {"status": "ACCEPTED", id: invitationId}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }

    static async rejectInvitation(invitationId) {
        return $axios.post(`/team/inviteput`, {"status": "REJECTED", id: invitationId}).then(res => {
            return res.data;
        }).catch(() => {
            return null;
        });
    }
}
